/* Approved R00 v1b art, shared-world geometry and subpixel presentation.
   No random trees, terrain, paths, bridges or buildings are generated here. */
window.UF_Renderer = function(canvas, images) {
  'use strict';
  const W=400,H=225,RS=4,L=UF_DATA.mapLayout,A=L.anchors,SCALE=L.scale,E=UF_DATA.mapEntities,T=UF_DATA.tileAssets;
  canvas.width=W*RS;canvas.height=H*RS;
  const ctx=canvas.getContext('2d');ctx.setTransform(RS,0,0,RS,0,0);ctx.imageSmoothingEnabled=false;
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),lerp=(a,b,t)=>a+(b-a)*t;
  function mulberry32(a){return function(){let t=a+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}
  /* APPROVED_PRIMITIVES */
  const rnd=mulberry32(71831),sourcePoint=(x,y)=>[(x-L.sourceCrop[0])*SCALE,(y-L.sourceCrop[1])*SCALE];
  const [light,lg]=newCv(W*RS,H*RS);lg.setTransform(RS,0,0,RS,0,0);
  const [glitchCopy,gc]=newCv(W*RS,H*RS);
  let camX=0,camY=0,reset=true,parts=[],ambientTime=0;
  const navigation={};
  for(const region of ['forest','grove']){
    const [cv,g]=newCv(L.sourceCrop[2]-L.sourceCrop[0],L.sourceCrop[3]-L.sourceCrop[1]);g.fillStyle='white';
    for(const poly of L.navPolygons.filter(p=>p.region===region)){
      g.beginPath();poly.points.forEach(([x,y],i)=>i?g.lineTo(x-L.sourceCrop[0],y-L.sourceCrop[1]):g.moveTo(x-L.sourceCrop[0],y-L.sourceCrop[1]));g.closePath();g.fill();
    }
    navigation[region]=g.getImageData(0,0,cv.width,cv.height).data;
  }
  const flowers=L.flowersSource.flatMap(([x,y],i)=>[0,1,2,3].map(j=>{const p=sourcePoint(x+(j%2)*3,y+(j>1?2:0));return {x:p[0],y:p[1],glow:0,last:-10,phase:i+j};}));
  const fireflies=[[126,428],[333,134],[642,165],[245,659],[829,114],[973,89],[1399,74],[1323,243],[968,584],[1290,640],[437,668],[694,726],[1230,840]].map(([x,y],i)=>{const p=sourcePoint(x,y);return {x:p[0],y:p[1],phase:i*1.7,gold:i%3!==0};});
  const waterRegions=[
    {rect:[386,86,420,296],width:15}, {rect:[450,534,489,825],width:16},
    {rect:[1240,61,1284,194],width:23}, {rect:[1173,188,1216,301],width:20},
    {rect:[1131,669,1180,791],width:23}, {rect:[1108,847,1162,916],width:21}
  ];
  const [terrain,terrainCtx]=newCv(Math.ceil(L.width),Math.ceil(L.height));
  const [surface,surfaceCtx]=newCv(Math.ceil(L.width),Math.ceil(L.height));
  const tiles={};
  for(const [id,meta]of Object.entries(T.terrainAtlas.tiles)){const [cv,g]=newCv(meta.atlasRect[2],meta.atlasRect[3]);g.drawImage(images.terrainAtlas,...meta.atlasRect,0,0,cv.width,cv.height);tiles[id]=cv;}
  for(const [id,meta]of Object.entries(UF_DATA.surfaceAssets.surfaces)){const [cv,g]=newCv(16,16);g.drawImage(images.surfaceAtlas,...meta.atlasRect,0,0,16,16);tiles[id]=cv;}
  function sourcePath(g,points){g.beginPath();points.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();}
  function texture(g,id){g.fillStyle=g.createPattern(tiles[id],'repeat');}
  // Visual texture stays clipped to approved contours: never affects navigation.
  function surfaceDetail(g,points,kind,seed){
    const random=mulberry32(seed),xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);
    const left=Math.min(...xs),top=Math.min(...ys),right=Math.max(...xs),bottom=Math.max(...ys);
    g.save();sourcePath(g,points);g.clip();
    const grass=kind==='grass';
    g.fillStyle=grass?'#122c31':'#96785e';g.globalAlpha=grass?.52:.18;g.fillRect(left,top,right-left,bottom-top);g.globalAlpha=1;
    const colors=grass?['#25454a','#35594e','#46665a','#1c393e']:['#b79a77','#886c57','#c0a184','#a18a70'];
    const count=Math.floor((right-left)*(bottom-top)/(grass?60:105));
    for(let i=0;i<count;i++){
      const x=Math.floor(left+random()*(right-left)),y=Math.floor(top+random()*(bottom-top));
      g.globalAlpha=grass?.48:.32;g.fillStyle=colors[i%colors.length];g.fillRect(x,y,1+Math.floor(random()*3),1);
      if(grass&&i%3===0){g.fillRect(x+1,y-2,1,3);g.fillRect(x-1,y-1,1,2);}
      if(!grass&&i%9===0){g.fillStyle='#685d55';g.fillRect(x,y,2,1);g.fillStyle='#c3a589';g.fillRect(x,y-1,2,1);}
    }
    g.restore();
  }
  function pathBorder(g,points,seed){
    const random=mulberry32(seed);g.save();
    // Broken pixel edging, rather than a continuous vector stroke.
    for(let i=0;i<points.length;i++){
      const a=points[i],b=points[(i+1)%points.length],distance=Math.hypot(b[0]-a[0],b[1]-a[1]);
      for(let n=0;n<distance;n+=3+random()*4){
        const f=n/distance,x=Math.floor(a[0]+(b[0]-a[0])*f),y=Math.floor(a[1]+(b[1]-a[1])*f);
        g.fillStyle=n%2<1?'#456159':'#314c45';g.globalAlpha=.72;g.fillRect(x-2,y-1,3+random()*3,2);
        if(random()>.6){g.fillStyle='#557566';g.fillRect(x,y-3,1,3);}
      }
    }g.restore();
  }
  function paintTerrainLayers(){
    terrainCtx.fillStyle='#07101b';terrainCtx.fillRect(0,0,terrain.width,terrain.height);
    for(const g of [terrainCtx,surfaceCtx]){g.scale(SCALE,SCALE);g.translate(-L.sourceCrop[0],-L.sourceCrop[1]);}
    // Terrain pieces follow source ground/water contours, never the reference bitmap.
    for(const ch of E.waterChannels||[]){texture(terrainCtx,'waterPool');sourcePath(terrainCtx,ch.points);terrainCtx.fill();}
    for(const c of E.cliffs){
      const face=[...c.points,...[...c.points].reverse().map(([x,y])=>[x,y+c.depth])];texture(terrainCtx,c.level?'cliffFace':'cliffDark');sourcePath(terrainCtx,face);terrainCtx.fill();
      terrainCtx.save();sourcePath(terrainCtx,face);terrainCtx.clip();
      for(let i=0;i<c.points.length-1;i++){const a=c.points[i],b=c.points[i+1],length=Math.hypot(b[0]-a[0],b[1]-a[1]);for(let d=0;d<length;d+=10){const f=d/length,x=a[0]+(b[0]-a[0])*f,y=a[1]+(b[1]-a[1])*f;terrainCtx.fillStyle='#22283e';terrainCtx.fillRect(x,y,3,c.depth);terrainCtx.fillStyle='#687088';terrainCtx.globalAlpha=.45;terrainCtx.fillRect(x+3,y+2,2,c.depth-3);terrainCtx.globalAlpha=1;}}
      terrainCtx.restore();
    }
    let detailSeed=310;
    for(const p of [...(E.groundPlates||[]),...(E.decorativeFloors||[])]){texture(surfaceCtx,p.level?'grassGrove':'grassDark');sourcePath(surfaceCtx,p.points);surfaceCtx.fill();surfaceDetail(surfaceCtx,p.points,'grass',detailSeed++);}
    for(const p of L.navPolygons){texture(surfaceCtx,'dirtWarm');sourcePath(surfaceCtx,p.points);surfaceCtx.fill();surfaceDetail(surfaceCtx,p.points,'dirt',detailSeed++);}
    // Border is drawn after all connected floor pieces, preventing internal seams.
    const [edgeMask,edgeCtx]=newCv(L.sourceCrop[2]-L.sourceCrop[0],L.sourceCrop[3]-L.sourceCrop[1]);
    edgeCtx.translate(-L.sourceCrop[0],-L.sourceCrop[1]);edgeCtx.fillStyle='white';for(const p of L.navPolygons){sourcePath(edgeCtx,p.points);edgeCtx.fill();}
    const edgePixels=edgeCtx.getImageData(0,0,edgeMask.width,edgeMask.height).data;
    for(let y=2;y<edgeMask.height-2;y+=2)for(let x=2;x<edgeMask.width-2;x+=2){const k=(y*edgeMask.width+x)*4;if(edgePixels[k+3]&&(!edgePixels[k-8+3]||!edgePixels[k+8+3]||!edgePixels[k-edgeMask.width*8+3]||!edgePixels[k+edgeMask.width*8+3])){surfaceCtx.fillStyle=(x+y)%6?'#405950':'#526e5b';surfaceCtx.fillRect(x+L.sourceCrop[0]-1,y+L.sourceCrop[1]-1,3,2);}}
    for(const fall of E.waterfalls||[]){const r=fall.sourceRect;surfaceCtx.fillStyle='#155997';surfaceCtx.fillRect(...r);for(let x=2;x<r[2]-2;x+=3){surfaceCtx.fillStyle=x%7<3?'#4dd0ff':'#2188cd';surfaceCtx.fillRect(r[0]+x,r[1]+3,1,r[3]-4);}surfaceCtx.fillStyle='#9eeaff';surfaceCtx.fillRect(r[0],r[1],r[2],2);surfaceCtx.fillStyle='#70d7ef';for(let x=0;x<r[2];x+=4)surfaceCtx.fillRect(r[0]+x,r[1]+r[3]-2-(x%7),3,2);}
    for(const b of E.bridges){const r=b.sourceRect;surfaceCtx.drawImage(images.bridgeHorizontal,r[0],r[1],r[2],r[3]);}
    for(const b of E.stairs){const r=b.sourceRect;surfaceCtx.drawImage(images.stoneStairs,r[0],r[1],r[2],r[3]);}
    for(const log of E.logs||[]){const r=log.sourceRect;if(!r)continue;surfaceCtx.save();surfaceCtx.translate(r[0],r[1]);surfaceCtx.fillStyle='#28272d';surfaceCtx.fillRect(0,3,r[2],r[3]-3);surfaceCtx.fillStyle='#594b43';surfaceCtx.fillRect(2,2,r[2]-4,r[3]-5);surfaceCtx.fillStyle='#88725a';surfaceCtx.fillRect(4,3,r[2]-8,3);for(let x=7;x<r[2]-7;x+=11){surfaceCtx.fillStyle='#342f31';surfaceCtx.fillRect(x,8,9,2);surfaceCtx.fillRect(x+4,5,2,r[3]-9);}surfaceCtx.fillStyle='#527260';surfaceCtx.fillRect(9,1,12,2);surfaceCtx.restore();}
  }
  paintTerrainLayers();
  function drawTree(e,t){
    const type=UF_DATA.treeTypes[e.type],meta=T.trees[type],p=sourcePoint(...e.foot);
    const scale=SCALE*Math.max(.68,Math.min(1.25,(e.size?.[1]||meta.nativeSize[1])/Math.max(1,meta.opaqueBounds[3]-meta.opaqueBounds[1])));
    const X=sx(p[0])-meta.footPivot[0]*scale,Y=sy(p[1])-meta.footPivot[1]*scale,w=meta.nativeSize[0]*scale,h=meta.nativeSize[1]*scale;
    if(X+w<0||X>W||Y+h<0||Y>H)return;
    const trunk=images['tree_'+type+'_trunk'],canopy=images['tree_'+type+'_canopy'];
    ctx.drawImage(trunk,X,Y,w,h);
    const wind=e.type==='root'?Math.sin(t*.45+p[0])*.1:Math.sin(t*.8+p[0]*.013)*.38;
    ctx.drawImage(canopy,X+wind,Y,w,h);
  }
  const sx=x=>x-camX,sy=y=>y-camY;
  function sprite(image,rect,x,y,pivot=[rect[2]/2,rect[3]],scale=1,flip=false){
    if(flip){ctx.save();ctx.translate(sx(x),sy(y));ctx.scale(-1,1);ctx.drawImage(image,...rect,-pivot[0]*scale,-pivot[1]*scale,rect[2]*scale,rect[3]*scale);ctx.restore();}
    else ctx.drawImage(image,...rect,sx(x)-pivot[0]*scale,sy(y)-pivot[1]*scale,rect[2]*scale,rect[3]*scale);
  }
  function hero(S,pose){const face=S.face||'front',seq=['idle','walk-a','idle','walk-b'],id=pose||face+'-'+(S.walking?seq[(S.anim/.14|0)%4]:'idle'),f=UF_DATA.frames[id]||UF_DATA.frames['front-idle'];const bob=S.walking?Math.sin(S.anim*Math.PI/.28)*.18:0;sprite(f.role==='world'?images.walk:images.story,f.rect,S.spawn[0],S.spawn[1]+bob,f.pivot);}
  function bottle(x,y,t,held){const X=sx(x),Y=sy(y)+(held?0:Math.sin(t*1.7)*.8);pxEllipse(ctx,X,Y-5,6,7,'#173247');pxEllipse(ctx,X,Y-5,5,6,'#254c69');ctx.fillStyle='#8e5475';ctx.fillRect(X-5,Y-12,10,1);ctx.fillStyle='#775039';ctx.fillRect(X-3,Y-16,6,2);pxEllipse(ctx,X,Y-5,3,3,'#a383ff');pxEllipse(ctx,X,Y-6,2,2,'#82e8ff');ctx.fillStyle='#dbfaff';ctx.fillRect(X-4,Y-10,1,4);ctx.fillRect(X,Y-10+Math.sin(t*4),1,2);}
  function hands(S,t){const X=sx(S.spawn[0]),Y=sy(S.spawn[1])-15;for(let i=0;i<2;i++){const x=X+(i?-20:20),y=Y+Math.sin(t*2+i)*1.8;ctx.fillStyle='#c3cbd2';ctx.fillRect(x-3,y-2,7,10);ctx.fillStyle='#f5f1e6';ctx.fillRect(x-3,y-2,5,8);for(let j=0;j<3;j++)ctx.fillRect(x-3+j*2,y-6+(j%2),1,5);ctx.fillRect(x+(i?4:-5),y,2,5);ctx.fillStyle='#04080e';ctx.fillRect(x-1,y,3,3);}}
  function overlay(id,dx=0,dy=0,alpha=1){const meta=UF_DATA.mapAssets.images[id],img=images[id],p=sourcePoint(meta.sourceRect[0],meta.sourceRect[1]);ctx.globalAlpha=alpha;ctx.drawImage(img,sx(p[0])+dx,sy(p[1])+dy,img.width*SCALE,img.height*SCALE);ctx.globalAlpha=1;}
  function chest(id,open){if(!open){overlay(id);return;}const m=UF_DATA.mapAssets.images[id],img=images[id],p=sourcePoint(m.sourceRect[0],m.sourceRect[1]),cut=Math.ceil(img.height*.44);ctx.fillStyle='#0a1119';ctx.fillRect(sx(p[0])+5*SCALE,sy(p[1])+cut*SCALE-3,img.width*SCALE-10*SCALE,6);ctx.drawImage(img,0,cut,img.width,img.height-cut,sx(p[0]),sy(p[1])+cut*SCALE,img.width*SCALE,(img.height-cut)*SCALE);ctx.drawImage(img,0,0,img.width,cut,sx(p[0]),sy(p[1])-4,img.width*SCALE,cut*SCALE);}
  function roots(x,y,w=30,h=22){const X=sx(x),Y=sy(y);for(let i=0;i<5;i++){const base=X-w/2+i*w/4;for(let j=0;j<h;j+=2){const xx=base+Math.sin(j*.13+i*1.9)*(w*.12);ctx.fillStyle='#242632';ctx.fillRect(xx-1,Y-h+j,4,3);ctx.fillStyle=i%2?'#685343':'#79604a';ctx.fillRect(xx,Y-h+j,2,3);ctx.fillStyle='#9a7a55';ctx.fillRect(xx,Y-h+j,1,2);if(j%10===0){ctx.fillStyle='#45675c';ctx.fillRect(xx+2,Y-h+j,3,1);ctx.fillRect(xx+3,Y-h+j-1,2,1);}}}}
  function stone(S){const k=S.fx.stoneOpen??(S.worldFlags.groveOpen?1:0),meta=UF_DATA.mapAssets.images.stoneDoor,img=images.stoneDoor,p=sourcePoint(meta.sourceRect[0],meta.sourceRect[1]),split=img.width/2;
    if(!k){overlay('stoneDoor');return;}ctx.drawImage(img,0,0,split,img.height,sx(p[0])-k*24,sy(p[1]),split*SCALE,img.height*SCALE);ctx.drawImage(img,split,0,img.width-split,img.height,sx(p[0])+split*SCALE+k*24,sy(p[1]),(img.width-split)*SCALE,img.height*SCALE);
  }
  function star(x,y,t){const X=sx(x),Y=sy(y)-6;ctx.fillStyle=Math.sin(t*2.4)>.1?'#ffe6a2':'#bda265';ctx.fillRect(X-1,Y-6,2,13);ctx.fillRect(X-6,Y-1,13,2);ctx.fillRect(X-3,Y-3,6,6);ctx.fillStyle='#fff8d8';ctx.fillRect(X-1,Y-1,2,2);}
  function hole(x,y,r,a){if(r<2)return;const q=lg.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,`rgba(255,255,255,${a})`);q.addColorStop(.46,`rgba(255,255,255,${a*.80})`);q.addColorStop(.78,`rgba(255,255,255,${a*.30})`);q.addColorStop(1,'#ffffff00');lg.fillStyle=q;lg.beginPath();lg.arc(x,y,r,0,6.28);lg.fill();}
  function bloom(x,y,r,rgb,a){const q=ctx.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,`rgba(${rgb},${a})`);q.addColorStop(1,`rgba(${rgb},0)`);ctx.fillStyle=q;ctx.fillRect(x-r,y-r,r*2,r*2);}
  function emit(x,y,color,n=12){for(let i=0;i<n;i++)parts.push({x,y,vx:(rnd()-.5)*20,vy:-10-rnd()*24,life:1.2+rnd()*1.8,max:3,color});}
  function collider(S,x,y){
    if(x<6||y<6||x>L.width-6||y>L.height)return true;
    const region=S.room==='sacred_grove'?'grove':'forest',mask=navigation[region],mw=L.sourceCrop[2]-L.sourceCrop[0],mh=L.sourceCrop[3]-L.sourceCrop[1];
    for(const [dx,dy]of [[-5,-1],[5,-1],[-5,-5],[5,-5],[0,-3]]){const xx=Math.floor((x+dx)/SCALE),yy=Math.floor((y+dy)/SCALE);if(xx<0||yy<0||xx>=mw||yy>=mh||mask[(yy*mw+xx)*4+3]<200)return true;}
    const g=L.stageGates;
    if(S.room==='forest_origin'&&!S.worldFlags.bottleTutorialDone&&x>g.mainBridge.x-6&&y>=g.mainBridge.minY&&y<=g.mainBridge.maxY)return true;
    if(region==='forest'&&!S.worldFlags.rootGateBurned&&x>g.rootGate.x-12)return true;
    if(region==='forest'&&!S.worldFlags.groveOpen){const q=A.secretStoneInteract;if(Math.abs(x-q[0])<30&&y<q[1]-8)return true;}
    return false;
  }
  function getRoom(){return {w:L.width,h:L.height,flowers,paths:L.routes,entities:E};}
  function ambient(t,dt,worldActive,S){
    // Existing waterfall pixels retain their original geometry; light streaks flow over them.
    for(const zone of waterRegions){const [x0,y0,x1,y1]=zone.rect,p=sourcePoint(x0,y0),w=(x1-x0)*SCALE,h=(y1-y0)*SCALE;if(sx(p[0])+w<0||sx(p[0])>W||sy(p[1])+h<0||sy(p[1])>H)continue;
      ctx.save();ctx.beginPath();ctx.rect(sx(p[0]),sy(p[1]),w,h);ctx.clip();ctx.globalAlpha=.12;for(let i=0;i<8;i++){const yy=(t*22+i*19)%Math.max(1,h);ctx.fillStyle=i%2?'#b1f3ff':'#459eda';ctx.fillRect(sx(p[0])+3+(i*13%Math.max(4,w-7)),sy(p[1])+yy,1,8+(i%4)*3);}ctx.restore();
    }
    for(const f of flowers){if(worldActive){f.glow=Math.max(0,f.glow-dt*.24);if(Math.hypot(S.spawn[0]-f.x,S.spawn[1]-f.y)<10&&t-f.last>1){f.glow=1;f.last=t;emit(f.x,f.y-6,'#a9edff',3);}}if(f.glow>.1){ctx.globalAlpha=f.glow*.7;ctx.fillStyle='#cefbff';ctx.fillRect(sx(f.x),sy(f.y)-6,1,1);ctx.globalAlpha=1;}}
    for(const f of fireflies){const X=sx(f.x+Math.sin(t*.52+f.phase)*9),Y=sy(f.y+Math.sin(t*.72+f.phase)*5);ctx.globalAlpha=.25+Math.abs(Math.sin(t*1.2+f.phase))*.65;ctx.fillStyle=f.gold?'#ffe6a2':'#91e7ff';ctx.fillRect(X,Y,1.3,1.3);}ctx.globalAlpha=1;
    // Wind leaves and tiny pollen remain on traced existing forest features.
    for(let i=0;i<7;i++){const f=fireflies[i];ctx.globalAlpha=.2;ctx.fillStyle=i%2?'#5491b0':'#617966';ctx.fillRect(sx(f.x)+Math.sin(t*.42+i)*19,sy(f.y)+((t*3+i*9)%28),1.5,1);}ctx.globalAlpha=1;
  }
  function drawFall(S,t){const phase=t*(S.fx.glitch?.25:1);ctx.fillStyle='#080c15';ctx.fillRect(0,0,W,H);for(let i=0;i<26;i++){ctx.fillStyle=i%4?'#111d27':'#1d3341';ctx.fillRect(i*47%400,(i*69+phase*36)%285-30,1+(i%3),16+(i%8)*4);}for(let i=0;i<6;i++){ctx.globalAlpha=.17;const x=i%2===0?-60:340,y=(i*65+phase*18)%350-100;const img=images.tree_broadleafBlue_canopy;ctx.drawImage(img,x,y,120,153);}ctx.globalAlpha=1;const f=UF_DATA.frames.fall;ctx.save();ctx.translate(200,100+Math.sin(phase*.8)*4);ctx.rotate(Math.sin(phase*.7)*.06);ctx.drawImage(images.story,...f.rect,-20,-16,40,32);ctx.restore();ctx.fillStyle=`rgba(0,0,0,${Math.min(.83,S.fx.fallDark||0)})`;ctx.fillRect(0,0,W,H);}
  function draw(S,dt,t,worldActive,settings){
    if(S.fx.black||S.room==='rift_bridge'){ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);return;}
    if(worldActive||S.fx.attacking||S.fx.pose)ambientTime+=dt;
    const at=ambientTime;
    if(S.fx.fall)drawFall(S,t);
    else {
      const [x,y]=S.spawn,tx=clamp(x-W/2,0,L.width-W),ty=clamp(y-H/2,0,L.height-H);
      if(reset){camX=tx;camY=ty;reset=false;}else if(worldActive||S.fx.attacking||S.fx.pose){const a=1-Math.exp(-10*dt);camX=lerp(camX,tx,a);camY=lerp(camY,ty,a);}
      ctx.fillStyle='#04070f';ctx.fillRect(0,0,W,H);ctx.drawImage(terrain,-camX,-camY);ctx.drawImage(surface,-camX,-camY);
      ambient(at,dt,worldActive,S);
      // Existing source flower bed and flower groups are separate from the floor.
      for(const [id,m] of Object.entries(UF_DATA.detailAssets.objects)){const p=sourcePoint(m.sourceRect[0],m.sourceRect[1]),img=images['detail_'+id];ctx.drawImage(img,sx(p[0]),sy(p[1]),img.width*SCALE,img.height*SCALE);}
      const saves=[];
      if(S.worldFlags.bottleTutorialDone){saves.push(A.extensionSave,A.oldTreeSave);star(...A.extensionSave,at);star(...A.oldTreeSave,at);}
      if(S.nUnlocked){saves.push(A.groveSave);star(...A.groveSave,at);}
      const objects=E.trees.map(e=>({y:sourcePoint(...e.foot)[1],draw:()=>drawTree(e,at)}));
      for(const id of ['chestC2','chestC3']){const m=UF_DATA.mapAssets.images[id];objects.push({y:sourcePoint(...m.sourcePivot)[1],draw:()=>overlay(id)});}
      objects.push({y:A.rootChestInteract[1],draw:()=>{chest('chestC1',!!S.worldFlags.chestTaken);if(!S.worldFlags.rootChestBurned)roots(...A.rootChestInteract,31,27);}});
      objects.push({y:A.ringChestInteract[1],draw:()=>chest('chestC4',!!S.worldFlags.ringPicked)});
      objects.push({y:A.secretStoneInteract[1],draw:()=>stone(S)});
      if(!S.worldFlags.rootGateBurned)objects.push({y:A.rootGate[1],draw:()=>roots(...A.rootGate,26,49)});
      if(S.worldFlags.bottleSpawned&&!S.bottle)objects.push({y:S.bottlePosition[1],draw:()=>bottle(...S.bottlePosition,at,false)});
      if(S.fx.deer){const d=S.fx.deer;objects.push({y:d.y,draw:()=>{ctx.globalAlpha=d.alpha;const X=sx(d.x),Y=sy(d.y);pxEllipse(ctx,X,Y-16,9,5,'#8fd3c3');ctx.fillStyle='#6bb6ab';ctx.fillRect(X-7,Y-14,2,13);ctx.fillRect(X+6,Y-14,2,13);ctx.fillRect(X+6,Y-24,2,11);pxEllipse(ctx,X+9,Y-25,4,3,'#d4f9ee');ctx.fillStyle='#a8e6da';ctx.fillRect(X+9,Y-32,1,7);ctx.fillRect(X+9,Y-32,4,1);ctx.globalAlpha=1;}});}
      if(S.worldFlags.memoryAsked&&(!S.worldFlags.groveExited||S.fx.attacking))objects.push({y:S.fx.strangerY??A.stranger[1],draw:()=>sprite(images.stranger,[(S.fx.strangerPose||0)*52,0,52,40],S.fx.strangerX??A.stranger[0],S.fx.strangerY??A.stranger[1],[26,40],1,S.fx.strangerFacing==='right')});
      if(!S.fx.hidePlayer)objects.push({y,draw:()=>{ctx.globalAlpha=.4;pxEllipse(ctx,sx(x),sy(y)-1,10,3,'#000');ctx.globalAlpha=1;hero(S,S.fx.pose);if(S.bottle&&!['hold','pickup'].includes(S.fx.pose))bottle(x+(S.face==='left'?-10:10),y-5,at,true);if(S.fx.hands)hands(S,at);}});
      for(const object of objects.sort((a,b)=>a.y-b.y))object.draw();
      if(S.fx.heal)for(let i=0;i<7;i++){const a=t*3+i*.9,yy=sy(y)-((t*14+i*4)%32);ctx.fillStyle=i%2?'#9dffbc':'#56ad8b';ctx.fillRect(sx(x)+Math.sin(a)*14,yy,2,2);}
      if(S.fx.flame>0){const X=sx(x),Y=sy(y)-6,dir=S.face==='back'?[0,-1]:S.face==='left'?[-1,0]:S.face==='right'?[1,0]:[0,1];for(let i=0;i<17;i++){ctx.fillStyle=i%2?'#acdfff':'#af75ff';ctx.fillRect(X+dir[0]*i*2+Math.sin(t*29+i)*4,Y+dir[1]*i*2+Math.cos(t*23+i)*4,2,3);}}
      for(const p of parts){if(worldActive||S.fx.heal||(!S.worldFlags.landingDone&&S.fx.pose)){p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;}ctx.globalAlpha=clamp(p.life/p.max,0,1);ctx.fillStyle=p.color;ctx.fillRect(sx(p.x),sy(p.y),2,2);}parts=parts.filter(p=>p.life>0);ctx.globalAlpha=1;
      lg.globalCompositeOperation='source-over';lg.clearRect(0,0,W,H);lg.fillStyle=`rgba(3,6,15,${S.room==='sacred_grove'?.66:S.bottle?.78:.86})`;lg.fillRect(0,0,W,H);lg.globalCompositeOperation='destination-out';
      hole(sx(x),sy(y)-12,S.cooldowns.xActive>0?220:S.bottle?152:54,S.bottle?.96:.80);
      for(const f of flowers)if(f.glow>.04)hole(sx(f.x),sy(f.y)-4,30+f.glow*34,f.glow*.82);
      for(const f of fireflies)if(Math.abs(f.x-camX-W/2)<230&&Math.abs(f.y-camY-H/2)<150)hole(sx(f.x),sy(f.y),12,.34);
      for(const p of parts)hole(sx(p.x),sy(p.y),15,clamp(p.life/p.max,0,1)*.4);
      // Quiet emissive flower patches mark the original source locations only.
      for(const [id,m]of Object.entries(UF_DATA.detailAssets.objects)){if(m.layer!=='ground-detail'||id.includes('bench'))continue;const p=sourcePoint((m.sourceRect[0]+m.sourceRect[2])/2,(m.sourceRect[1]+m.sourceRect[3])/2);if(sx(p[0])>-45&&sx(p[0])<W+45&&sy(p[1])>-45&&sy(p[1])<H+45)hole(sx(p[0]),sy(p[1]),21,.12+Math.sin(at*.6+p[0])*.025);}
      if(S.worldFlags.bottleSpawned&&!S.bottle)hole(sx(S.bottlePosition[0]),sy(S.bottlePosition[1])-7,66,.68);
      for(const save of saves)hole(sx(save[0]),sy(save[1])-6,37,.6);
      if(S.fx.heal)hole(sx(x),sy(y)-12,66,.5);if(S.fx.deer)hole(sx(S.fx.deer.x),sy(S.fx.deer.y)-16,60,S.fx.deer.alpha*.6);
      lg.globalCompositeOperation='source-over';ctx.drawImage(light,0,0,W,H);ctx.globalCompositeOperation='lighter';
      if(S.bottle)bloom(sx(x)+10,sy(y)-12,32,'140,155,255',.23);
      if(S.worldFlags.bottleSpawned&&!S.bottle)bloom(sx(S.bottlePosition[0]),sy(S.bottlePosition[1])-7,28,'140,150,255',.22);
      for(const f of flowers)if(f.glow>.2)bloom(sx(f.x),sy(f.y)-4,16,'96,190,255',f.glow*.12);
      if(S.fx.heal)bloom(sx(x),sy(y)-13,42,'90,255,160',.2);ctx.globalCompositeOperation='source-over';
      if(S.fx.rift)overlay('rift');
    }
    if(S.fx.glitch){gc.drawImage(canvas,0,0);const phase=settings.reduceMotion?t*.15:t;for(let i=0;i<12;i++){const x=i*67%340,y=i*39%184,dx=settings.reduceMotion?Math.sin(phase+i)*2:Math.sin(phase*8+i)*6;ctx.drawImage(glitchCopy,x*RS,y*RS,60*RS,34*RS,x+dx,y,60,34);ctx.strokeStyle='#6b768655';ctx.strokeRect(x,y,60,34);}canvas.style.filter='grayscale(1)';}else canvas.style.filter='none';
  }
  return {draw,collider,emit,getRoom,resetCamera:()=>{reset=true;parts=[];},paths:getRoom,presentationScale:RS};
};
