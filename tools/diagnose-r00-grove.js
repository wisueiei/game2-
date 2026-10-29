async page => {
  return page.evaluate(()=>{
    UF_QA.warp('sacred_grove',[1200,230]);
    const results=[];
    for(const step of [6,4,2,1]){
      const x0=1120,y0=160,x1=1490,y1=310,cols=Math.ceil((x1-x0)/step),rows=Math.ceil((y1-y0)/step);
      const free=(x,y)=>x>=0&&y>=0&&x<cols&&y<rows&&!UF_QA.collides(x0+x*step,y0+y*step);
      const closest=p=>{let best=null;for(let y=0;y<rows;y++)for(let x=0;x<cols;x++)if(free(x,y)){const d=Math.hypot(x0+x*step-p[0],y0+y*step-p[1]);if(!best||d<best.d)best={x,y,d};}return best;};
      const a=closest(UF_DATA.mapLayout.anchors.groveSpawn),b=closest(UF_DATA.mapLayout.routes.groveEntryToRing[1]),q=[a],seen=new Set([a.y*cols+a.x]);let reached=false;
      for(let i=0;i<q.length;i++){const p=q[i];if(p.x===b.x&&p.y===b.y){reached=true;break;}for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]]){const x=p.x+dx,y=p.y+dy,id=y*cols+x;if(!seen.has(id)&&free(x,y)){seen.add(id);q.push({x,y});}}}
      results.push({step,start:a,goal:b,reached,visited:seen.size});
    }
    return results;
  });
}
