// Night Witch sprite generator — 24x32 RGBA PNG, transparent background.
//
// v2 changes (Claude):
//   - walk cycle is now 2 contact poses (walk / walk2) instead of 1 twitch frame,
//     so the engine can run idle -> walk -> idle -> walk2 and read as real steps.
//   - the lifted leg is raised 2px and shortened, arms swing, so the frames differ.
//   - side view is a genuine profile now: narrower dress, single arm, single eye,
//     nose bump, hair mass pushed to the back of the head.
//
// Palette, DSL and PNG writer are unchanged from Codex's v1.

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const out = path.join(__dirname, '..', 'assets', 'sprites', 'night-witch');
fs.mkdirSync(out, { recursive: true });

// 16 opaque colors plus transparent, shared by all frames.
const P = {
  '.': [0,0,0,0], K:[10,16,34,255], H:[58,38,50,255], h:[91,57,65,255],
  G:[213,167,74,255], g:[244,215,120,255], W:[237,231,227,255], w:[185,181,193,255],
  S:[255,212,194,255], s:[215,154,145,255], E:[109,226,190,255],
  R:[127,41,75,255], r:[84,28,58,255], C:[248,231,214,255],
  B:[32,32,51,255], b:[113,72,53,255], l:[160,106,67,255]
};
const W=24,H=32;
const grid=()=>Array.from({length:H},()=>Array(W).fill('.'));
function at(a,x,y,c){if(x>=0&&x<W&&y>=0&&y<H)a[y][x]=c;}
function rect(x,y,w,h){const q=[];for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)q.push([i,j]);return q;}
function row(x,y,w){return rect(x,y,w,1);}
function shape(a,cells,c){
  for(const [x,y] of cells)for(const [dx,dy] of [[-1,0],[1,0],[0,-1],[0,1]]){
    const nx=x+dx,ny=y+dy;if(nx>=0&&nx<W&&ny>=0&&ny<H&&a[ny][nx]==='.')a[ny][nx]='K';
  }
  for(const [x,y] of cells)at(a,x,y,c);
}
const many=(...parts)=>parts.flat();

function hat(a,shift=0){
  shape(a,many(row(11+shift,1,2),row(10+shift,2,4),row(9+shift,3,5),row(9+shift,4,6),row(8+shift,5,8),row(7+shift,6,10),row(4+shift,7,16),row(2+shift,8,20)),'H');
  shape(a,many(row(9+shift,3,2),row(8+shift,5,3),row(5+shift,7,3),row(3+shift,8,5)),'h');
  shape(a,row(6+shift,7,12),'G');shape(a,row(8+shift,7,4),'g');
}

// one leg + boot. `bootY` drives how high the foot sits, which is what sells the step.
function leg(a,x,bootY,top=25){
  const len=Math.max(1,bootY-top);
  shape(a,rect(x,top,2,len),'B');
  shape(a,many(rect(x-1,bootY,4,2),row(x-1,bootY+2,5)),'b');
  shape(a,row(x,bootY,2),'l');
}
// phase: 0 = idle, 1 = left foot planted / right foot lifted, 2 = the opposite
function lowerFront(a,phase){
  if(phase===0){ leg(a,9,29); leg(a,13,29); }
  else if(phase===1){ leg(a,14,27); leg(a,8,29); }
  else { leg(a,8,27); leg(a,14,29); }
}
function dress(a){
  shape(a,many(rect(9,17,6,1),rect(8,18,8,2),rect(7,20,10,3),rect(6,23,12,2),rect(7,25,10,1)),'R');
  shape(a,many(row(7,23,2),row(15,23,2),row(9,25,2),row(13,25,2)),'r');
}
function armsFront(a,phase){
  const L=phase===1?19:phase===2?17:18;
  const R=phase===1?17:phase===2?19:18;
  shape(a,rect(6,L,2,3),'S');
  shape(a,rect(16,R,2,3),'S');
}

function front(phase){
  const a=grid();
  lowerFront(a,phase); dress(a); armsFront(a,phase);
  shape(a,rect(8,10,8,7),'S');
  shape(a,many(rect(7,11,2,6),rect(15,11,2,6),row(9,10,6)),'W');
  shape(a,many(row(7,15,2),row(15,15,2),row(8,16,2),row(14,16,2)),'w');
  at(a,10,13,'K');at(a,11,13,'E');at(a,13,13,'K');at(a,14,13,'E');
  at(a,10,15,'s');at(a,14,15,'s');
  shape(a,row(10,17,4),'C');
  hat(a); return a;
}
function back(phase){
  const a=grid();
  lowerFront(a,phase); dress(a); armsFront(a,phase);
  shape(a,many(rect(7,10,10,7),row(8,17,8)),'W');
  shape(a,many(row(8,15,2),row(14,15,2),row(10,17,3)),'w');
  shape(a,many(rect(9,11,1,5),rect(12,12,1,4),rect(15,11,1,5)),'w');   // hair strands
  hat(a); return a;
}

// --- true profile, facing right -------------------------------------------
function dressSide(a){
  shape(a,many(rect(10,17,5,1),rect(9,18,7,2),rect(9,20,8,3),rect(8,23,9,2),rect(9,25,7,1)),'R');
  shape(a,many(row(8,23,2),row(9,25,2),row(14,20,2)),'r');
}
function lowerSide(a,phase){
  if(phase===0){ leg(a,10,29); leg(a,13,29); }
  else if(phase===1){ leg(a,8,29,26); leg(a,14,29); }        // stride open
  else { leg(a,11,28,25); leg(a,13,29); }                    // passing, back foot lifted
}
function right(phase){
  const a=grid();
  lowerSide(a,phase); dressSide(a);
  const A=phase===1?18:phase===2?20:19;
  shape(a,rect(15,A,2,3),'S');                               // near arm, kept below the jaw
  shape(a,rect(10,10,6,7),'S');                              // face
  at(a,16,12,'S');at(a,16,13,'S');                           // nose
  shape(a,many(rect(8,10,3,7),row(11,10,5),row(9,16,2),row(8,17,3)),'W');  // hair mass at the back
  shape(a,many(row(9,15,2),row(9,17,2)),'w');
  at(a,14,13,'K');at(a,15,13,'E');                           // one eye
  at(a,14,15,'s');
  shape(a,row(11,17,3),'C');
  hat(a,1); return a;
}
function mirror(a){return a.map(r=>r.slice().reverse());}

// --- PNG writer (unchanged) -----------------------------------------------
function crcTable(){let t=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=(c&1)?0xedb88320^(c>>>1):c>>>1;t[n]=c>>>0;}return t;}
const T=crcTable();function crc(b){let c=0xffffffff;for(const x of b)c=T[(c^x)&255]^(c>>>8);return (c^0xffffffff)>>>0;}
function chunk(type,data){const n=Buffer.alloc(12+data.length);n.writeUInt32BE(data.length,0);n.write(type,4);data.copy(n,8);n.writeUInt32BE(crc(n.subarray(4,8+data.length)),8+data.length);return n;}
function png(a){const raw=Buffer.alloc((W*4+1)*H);for(let y=0;y<H;y++){raw[y*(W*4+1)]=0;for(let x=0;x<W;x++)Buffer.from(P[a[y][x]]).copy(raw,y*(W*4+1)+1+x*4);}const head=Buffer.alloc(13);head.writeUInt32BE(W,0);head.writeUInt32BE(H,4);head[8]=8;head[9]=6;return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',head),chunk('IDAT',zlib.deflateSync(raw)),chunk('IEND',Buffer.alloc(0))]);}
function save(name,a){fs.writeFileSync(path.join(out,name),png(a));console.log('  '+name);}

console.log('night-witch 24x32:');
for(const [dir,make] of [['front',front],['back',back],['right',right]]){
  save(`night-witch-${dir}-idle-24x32.png`,  make(0));
  save(`night-witch-${dir}-walk-24x32.png`,  make(1));
  save(`night-witch-${dir}-walk2-24x32.png`, make(2));
}
save('night-witch-left-idle-24x32.png',  mirror(right(0)));
save('night-witch-left-walk-24x32.png',  mirror(right(1)));
save('night-witch-left-walk2-24x32.png', mirror(right(2)));
