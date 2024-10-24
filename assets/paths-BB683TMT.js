import{r as d,R as F}from"./index-RYns6xqu.js";import{c as Ne}from"./index-Cm1LdsEh.js";import{l as j}from"./lodash-CcdATr5u.js";import{c as Fe}from"./index-CHvE9HB5.js";function Se(e){const[n,r]=d.useState({width:(e==null?void 0:e.offsetWidth)||1,height:(e==null?void 0:e.offsetHeight)||1});return d.useEffect(()=>{const i=()=>{const u=(e==null?void 0:e.offsetWidth)||1,s=(e==null?void 0:e.offsetHeight)||1;(u!==n.width||s!==n.height)&&r({width:u,height:s})};if(e){const u=new ResizeObserver(i);return u.observe(e),()=>{u.disconnect()}}else{i();return}},[e,n.height,n.width]),n}const ze=d.createContext(void 0),de=d.createContext(void 0),De=d.createContext(void 0),fe="stop",J=["paths"],Q=["background","graduations","paths","captions","overlay"],Te={},me={};function ke(e){if(me[e])return me[e];const n=`#${e.toString(16).padStart(6,"0")}`.toLowerCase();return Te[n]=e,me[e]=n,n}function Ge(e){return Te[e.toLowerCase()]}function oe(e){return e.toString(16).padStart(2,"0").toLowerCase()}function Me(e,n,r){return`#${oe(e)}${oe(n)}${oe(r)}`}function qe(e){return Fe(e).rgba()}async function Be(e,n,r="#fff"){if(!n.length)throw Error("There must be at least one layer to capture.");const i=e[n[0]],u=i.width,s=i.height,m=document.createElement("CANVAS");m.setAttribute("width",u+""),m.setAttribute("height",s+"");const a=m.getContext("2d");return a.fillStyle=r,a.fillRect(0,0,u,s),n.forEach(l=>{a.drawImage(e[l],0,0,u,s,0,0,u,s)}),new Promise((l,b)=>{m.toBlob(k=>{k?l(k):b()},"image/png")})}const he="picking",we="rendering";function We(e,n,r){const i=d.useRef({}),u=d.useRef({}),s=d.useRef(J.reduce((h,g)=>({...h,[g]:new Set}),{})),m=d.useRef(Q.reduce((h,g)=>({...h,[g]:new Set}),{})),a=d.useRef(n),l=d.useRef(null),b=Se(e),[k,t]=d.useState(null),p=d.useCallback((h,g)=>{h.resetPickingElements(),J.forEach(c=>{if(g&&!g.has(c))return;const o=u.current[`${he}-${c}`],w=s.current[c];if(o){o.clearRect(0,0,o.canvas.width,o.canvas.height);const x=o.getImageData(0,0,o.canvas.width,o.canvas.height);w.forEach(E=>E(x,h)),o.putImageData(x,0,0)}})},[]),y=d.useCallback((h,g)=>{Q.forEach(c=>{if(g&&!g.has(c))return;const o=u.current[`${we}-${c}`],w=m.current[c];o&&(o.clearRect(0,0,o.canvas.width,o.canvas.height),w.forEach(x=>x(o,h)))})},[]),v=d.useCallback(()=>{y(a.current),p(a.current),l.current&&(window.cancelAnimationFrame(l.current.frameId),l.current=null)},[]),f=d.useCallback(()=>{l.current||(l.current={frameId:window.requestAnimationFrame(v)})},[]),q=d.useCallback(({type:h,layer:g,fn:c})=>{if(h==="picking"){const o=s.current[g];if(o.has(c))throw new Error("This picking function has already been registered.");o.add(c)}else if(h==="rendering"){const o=m.current[g];if(o.has(c))throw new Error("This drawing function has already been registered.");o.add(c)}f()},[]),P=d.useCallback(({type:h,layer:g,fn:c})=>{if(h==="picking"){const o=s.current[g];if(!o.has(c))throw new Error("This picking function has not been registered.");o.delete(c)}else if(h==="rendering"){const o=m.current[g];if(!o.has(c))throw new Error("This drawing function has not been registered.");o.delete(c)}f()},[]),S=d.useCallback(()=>Be(i.current,Q.map(h=>`${we}-${h}`),a.current.theme.background),[]);return d.useEffect(()=>{if(!e)return;const h=i.current,g=u.current;[...Q.map(o=>({layer:o,type:"rendering"})),...J.map(o=>({layer:o,type:"picking"}))].forEach(({layer:o,type:w})=>{const x=`${w}-${o}`;if(!h[x]){const E=document.createElement("CANVAS"),A=E.getContext("2d");E.style.position="absolute",E.style.inset="0",e.appendChild(E),h[x]=E,g[x]=A,w==="picking"&&(E.style.display="none")}})},[e]),d.useEffect(()=>{a.current=n,v()},[n.fingerprint]),d.useEffect(()=>{for(const h in i.current){const g=i.current[h];g&&(g.style.width=b.width+"px",g.style.height=b.height+"px",g.setAttribute("width",b.width+"px"),g.setAttribute("height",b.height+"px"))}v()},[b]),d.useEffect(()=>{let h=null;J.some(g=>{const c=u.current[`${he}-${g}`];if(c&&r){const[o,w,x,E]=c.getImageData(r.x,r.y,1,1).data;if(E===255){const A=Me(o,w,x),C=Ge(A),O=a.current.pickingElements[C];return h={layer:g,element:O},!0}}return!1}),j.isEqual(h,k)||t(h)},[r,k]),{canvasContext:d.useMemo(()=>({register:q,unregister:P,captureCanvases:S}),[q,P,S]),hoveredItem:k}}function _e(e,n){const{register:r,unregister:i}=d.useContext(de);d.useEffect(()=>(r({type:"picking",layer:e,fn:n}),()=>{i({type:"picking",layer:e,fn:n})}),[e,n,r,i])}function ie(e,n){const{register:r,unregister:i}=d.useContext(de);d.useEffect(()=>(r({type:"rendering",layer:e,fn:n}),()=>{i({type:"rendering",layer:e,fn:n})}),[e,n,r,i])}const He=()=>{const e=d.useCallback((n,{timePixelOffset:r,getSpacePixel:i,operationalPoints:u,swapAxis:s,width:m,height:a,theme:{spaceGraduationsStyles:l}})=>{const b=s?a:m;u.forEach(k=>{const t=l[k.importanceLevel||0];if(!t)return;n.strokeStyle=t.color,n.lineWidth=t.width,n.globalAlpha=t.opacity||1,t.dashArray&&(n.setLineDash(t.dashArray||[]),n.lineDashOffset=-r);const p=i(k.position);n.beginPath(),s?(n.moveTo(p,0),n.lineTo(p,b)):(n.moveTo(0,p),n.lineTo(b,p)),n.stroke()}),n.setLineDash([]),n.lineDashOffset=0,n.globalAlpha=1},[]);return ie("graduations",e),null},$e="#000000",G="#2170B9",Ue="#EDEDED",se="#B6B2AF",Ye="#797671",Cn="#FFFFFFC0",On="#EFF3F5",Ln="#FF6868",Nn="#D91C1C",Fn="#CAEDDB",zn="#FFD4D8",Dn="#FFEABF",Ke=10,Y="IBM Plex Sans",ye=1e3,M=60*ye,K=60*M,Gn=1e3,Ve={background:"white",breakpoints:[.2,.4,.8,2.4,12,32,72,1/0],timeRanges:[10*ye,30*ye,1*M,5*M,15*M,30*M,1*K,3*K,6*K,12*K,24*K],pathsStyles:{fontSize:Ke,fontFamily:Y},spaceGraduationsStyles:{1:{width:.5,color:G,opacity:.75},2:{width:.5,color:G,opacity:.25},3:{width:.5,color:Ue}},timeCaptionsPriorities:[[0,0,0,0,0,0,0,0,1,1,1],[0,0,0,0,0,0,0,1,1,1,1],[0,0,0,0,0,0,1,1,1,1,1],[0,0,0,0,0,3,1,1,1,1,1],[0,0,0,3,2,1,1,1,1,1,1],[0,0,0,3,2,1,1,1,1,1,1],[0,0,3,2,1,1,1,1,1,1,1],[0,0,3,2,1,1,1,1,1,1,1]],timeCaptionsStyles:{1:{color:Ye,font:`12px ${Y}`,topOffset:11},2:{color:se,font:`12px ${Y}`,topOffset:9},3:{color:se,font:`10px ${Y}`,topOffset:6},4:{color:se,font:`8px ${Y}`,topOffset:8}},timeGraduationsPriorities:[[0,0,0,0,0,0,0,4,3,2,1],[0,0,0,0,0,0,4,3,3,2,1],[0,0,0,0,0,6,4,3,3,2,1],[0,0,0,0,6,5,4,3,3,2,1],[0,0,0,6,5,4,3,2,2,2,1],[0,0,6,5,4,4,3,2,2,2,1],[0,6,5,4,4,4,3,2,2,2,1],[6,0,5,4,4,4,3,2,2,2,1]],timeGraduationsStyles:{1:{width:.5,color:$e},2:{width:.5,color:G,opacity:.77},3:{width:.5,color:G,opacity:.5},4:{width:.5,color:G,opacity:.5,dashArray:[6,6]},5:{width:.5,color:G,opacity:.5,dashArray:[6,18]},6:{width:1,color:G,opacity:.5,dashArray:[1,12]}}},ee=e=>`:${new Date(e).getMinutes().toString().padStart(2,"0")}`,V=(e,n)=>{const r=new Date(e);if(n>1){const i=r.getHours().toString().padStart(2,"0"),u=r.getMinutes().toString().padStart(2,"0");return`${i}:${u}`}else return r.getHours().toString().padStart(2,"0")},N=33,Ze=[()=>"",()=>"",ee,ee,ee,ee,V,V,V,V,V],Xe=()=>{const e=d.useCallback((n,{timeScale:r,timeOrigin:i,timePixelOffset:u,getTimePixel:s,swapAxis:m,width:a,height:l,theme:{background:b,breakpoints:k,timeRanges:t,timeCaptionsPriorities:p,timeCaptionsStyles:y,timeGraduationsStyles:v}})=>{const f=m?l:a,q=m?a:l,P=i-r*u,S=P+r*a,T=1/r*M;let h=[];k.some((c,o)=>T<c?(h=p[o],!0):!1);const g={};t.map((c,o)=>{const w=h[o];if(!w)return;let x=Math.floor(P/c)*c;for(;x<=S;)w&&(g[x]={level:w,rangeIndex:o}),x+=c}),n.fillStyle=b,m?n.fillRect(0,0,N,f):n.fillRect(0,q-N,f,N),n.strokeStyle=v[1].color,n.lineWidth=v[1].width,n.beginPath(),m?(n.moveTo(N,0),n.lineTo(N,f)):(n.moveTo(0,q-N),n.lineTo(f,q-N)),n.stroke();for(const c in g){const{level:o,rangeIndex:w}=g[c],x=y[o],E=Ze[w],A=E(+c,T);n.textAlign="center",n.textBaseline="top",n.fillStyle=x.color,n.font=`${x.fontWeight||"normal"} ${x.font}`,m?(n.save(),n.translate(N-(x.topOffset||0),s(+c)),n.rotate(Math.PI/2),n.fillText(A,0,0),n.restore()):n.fillText(A,s(+c),q-N+(x.topOffset||0))}},[]);return ie("captions",e),null},Je=()=>{const e=d.useCallback((n,{timeScale:r,timeOrigin:i,timePixelOffset:u,spacePixelOffset:s,getTimePixel:m,swapAxis:a,width:l,height:b,theme:{breakpoints:k,timeRanges:t,timeGraduationsStyles:p,timeGraduationsPriorities:y}})=>{const v=a?b:l,f=a?l:b,q=i-r*u,P=q+r*v,S=1/r*M;let T=[];k.some((g,c)=>S<g?(T=y[c],!0):!1);const h={};t.map((g,c)=>{const o=T[c];if(!o)return;let w=Math.floor(q/g)*g;for(;w<=P;)h[w]=o,w+=g});for(const g in h){const c=h[g],o=p[c];n.strokeStyle=o.color,n.lineWidth=o.width,n.globalAlpha=o.opacity||1,n.setLineDash(o.dashArray||[]),o.dashArray&&(n.lineDashOffset=-s);const w=m(+g);n.beginPath(),a?(n.moveTo(0,w),n.lineTo(f,w)):(n.moveTo(w,0),n.lineTo(w,f)),n.stroke()}n.setLineDash([]),n.lineDashOffset=0,n.globalAlpha=1},[]);return ie("graduations",e),null};function Ee(e,n){const r=n.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}function Qe(e){if(typeof e.deltaY<"u")return e.deltaY*-3/360;if(typeof e.detail<"u")return e.detail/-9;throw new Error("Could not extract delta from event.")}function en(e,{position:n,hoveredItem:r,down:i,isHover:u},s,m){const a=d.useRef(m),l=d.useRef(s),[b,k]=d.useState({type:"idle"});d.useEffect(()=>{a.current=m},[m.fingerprint]),d.useEffect(()=>{l.current=s},[s]);const t=d.useCallback(y=>{if(!e)return;const{onClick:v}=l.current;v&&v({event:y,position:n,data:a.current.getData(n),hoveredItem:r,context:a.current})},[e,r,n]),p=d.useCallback(y=>{const{onZoom:v}=l.current;v&&e&&v({delta:Qe(y),position:Ee(y,e),event:y,context:a.current})},[e]);d.useEffect(()=>{if(e)return e.addEventListener("click",t),()=>{e.removeEventListener("click",t)}},[e,t]),d.useEffect(()=>{if(e)return e.addEventListener("wheel",p),()=>{e.removeEventListener("wheel",p)}},[e,p]),d.useEffect(()=>{const{onPan:y}=l.current;i?k({type:"panning",initialPosition:n,initialData:a.current.getData(n)}):(b.type==="panning"&&y&&y({isPanning:!1,position:n,initialPosition:b.initialPosition,data:a.current.getData(n),initialData:b.initialData,context:a.current}),b.type!=="idle"&&k({type:"idle"}))},[i]),d.useEffect(()=>{const{onPan:y,onMouseMove:v}=l.current;v&&v({position:n,isHover:u,data:a.current.getData(n),hoveredItem:r,context:a.current}),b.type==="panning"&&y&&y({isPanning:!0,position:n,initialPosition:b.initialPosition,data:a.current.getData(n),initialData:b.initialData,context:a.current})},[n.x,n.y])}function nn(e){const[n,r]=d.useState({isHover:!1,position:{x:NaN,y:NaN}}),i=d.useCallback(m=>{e&&r(a=>({...a,down:{ctrl:m.ctrlKey,shift:m.shiftKey}}))},[e]),u=d.useCallback(()=>{e&&r(m=>({...m,down:void 0}))},[e]),s=d.useCallback(m=>{if(!e)return;const a=Ee(m,e),{x:l,y:b}=a,k=e.offsetWidth,t=e.offsetHeight,p=l>=0&&l<=k&&b>=0&&b<=t;r(y=>({...y,position:a,isHover:p}))},[e]);return d.useEffect(()=>{if(e)return e.addEventListener("mousedown",i),()=>{e.removeEventListener("mousedown",i)}},[e,i]),d.useEffect(()=>(document.addEventListener("mouseup",u),()=>{document.removeEventListener("mouseup",u)}),[u]),d.useEffect(()=>(document.addEventListener("mousemove",s),()=>{document.removeEventListener("mousemove",s)}),[s]),n}function rn({breakpoints:e,timeRanges:n,timeCaptionsStyles:r,timeCaptionsPriorities:i,timeGraduationsStyles:u,timeGraduationsPriorities:s}){const m="SpaceTimeChartTheme is invalid:",a=e.length,l=n.length,b=new Set(i.flatMap(t=>t)),k=new Set(s.flatMap(t=>t));if(i.length!==a)throw new Error(`${m}: timeCaptionsPriorities should have as much elements as breakpoints.`);if(i.some(t=>t.length!==l))throw new Error(`${m}: each array in timeCaptionsPriorities should have as much elements as timeRanges.`);if(Array.from(b).some(t=>t!==0&&!r[t]))throw new Error(`${m}: all values (except 0s) from timeCaptionsPriorities should have a matching style in timeCaptionsStyles.`);if(s.length!==a)throw new Error(`${m}: timeGraduationsPriorities should have as much elements as breakpoints.`);if(s.some(t=>t.length!==l))throw new Error(`${m}: each array in timeGraduationsPriorities should have as much elements as timeRanges.`);if(Array.from(k).some(t=>t!==0&&!u[t]))throw new Error(`${m}: all values (except 0s) from timeGraduationsPriorities should have a matching style in timeGraduationsStyles.`);if(!u[1])throw new Error(`${m}: there should be a timeGraduationsStyles for value 1.`)}function tn(e,n,r){let i=e;if(n.some(a=>a.to<i?!0:(i=a.to,!1)))throw new Error("Invalid scale: 'to' must be greater than previous 'to'.");if(n.some(a=>("size"in a?a.size:a.coefficient)<=0))throw new Error("Invalid scale: 'to' must be greater than 'from'.");const u=[];let s=0;i=e;for(let a=0;a<n.length;a++){const l=n[a],b="coefficient"in l?l.coefficient:(l.to-i)/l.size,k="coefficient"in l?(l.to-i)/l.coefficient:l.size;u.push({from:i,to:l.to,pixelFrom:s,pixelTo:s+k,coefficient:b}),s+=k,i=l.to,a&&(u[a].previous=u[a-1],u[a-1].next=u[a])}function m(a){if(a.length===0)return{coefficient:1,from:-1/0,to:1/0,pixelFrom:-1/0,pixelTo:1/0};if(a.length===1)return a[0];{const l=Math.ceil(a.length/2),b=a[l-1].to,k=a[l-1].pixelTo;return{limit:b,pixelLimit:k,from:a[0].from,to:a[a.length-1].to,pixelFrom:a[0].pixelFrom,pixelTo:a[a.length-1].pixelTo,left:m(a.slice(0,l)),right:m(a.slice(l))}}}return m(u)}function Ae(e,n){e=j.clamp(e,n.from,n.to);let r=n;for(;"limit"in r;)e<=r.limit?r=r.left:r=r.right;return r}function an(e,n){e=j.clamp(e,n.pixelFrom,n.pixelTo);let r=n;for(;"pixelLimit"in r;)e<=r.pixelLimit?r=r.left:r=r.right;return r}function un(e,n,r){return i=>n+(i-e)/r}function mn(e,n,r){return i=>(i-n)*r+e}function on(e,n){return r=>{const{from:i,pixelFrom:u,coefficient:s}=Ae(r,n);return e+u+(r-i)/s}}function sn(e,n,r){return i=>{const{from:u,pixelFrom:s,coefficient:m}=an(i-n,r);return e+u+(i-n-s)*m}}function ln(e,n,r,i){return u=>({time:e(u[r]),position:n(u[i])})}function pn(e,n,r,i){return({time:u,position:s})=>({[r]:e(u),[i]:n(s)})}function Mn(e,n){const i=e.points.slice(0,-1).map((m,a)=>[m,e.points[a+1]]).find(([m,a])=>j.inRange(n,m.time,a.time));if(i){const[m,a]=i;return m.position+(n-m.time)/(a.time-m.time)*(a.position-m.position)}let u=e.points[0],s=e.points[0];return e.points.slice(1).forEach(m=>{m.time<u.time&&(u=m),m.time>s.time&&(s=m)}),u.time>n?u.position:s.position}function Ie(e,n,r){if(n<e)return Ie(n,e,r).reverse();e=Math.max(e,r.from),n=Math.min(n,r.to);let i=Ae(e,r),u=e;const s=[];for(;i.to<n;)i.to!==u&&s.push(i.to),u=i.to,i=i.next;return s}function yn(e,n,r){const{x:i,y:u}=e,{x:s,y:m}=n,{x:a,y:l}=r,b=a-s,k=l-m,t=i-s,p=u-m,y=t*b+p*k,v=b*b+k*k;if(v===0)return{x:s,y:m};let f=y/v;return f<0?f=0:f>1&&(f=1),{x:s+f*b,y:m+f*k}}function dn(e,n){return!e||!n?e:n.element.type==="point"?n.element.point:yn(e,n.element.from,n.element.to)}const bn=e=>{const{operationalPoints:n,spaceOrigin:r,spaceScales:i,timeOrigin:u,timeScale:s,xOffset:m=0,yOffset:a=0,swapAxis:l,onHoveredChildUpdate:b,children:k,enableSnapping:t,hideGrid:p,hidePathsLabels:y,theme:v,onPan:f,onZoom:q,onClick:P,onMouseMove:S,...T}=e,[h,g]=d.useState(null),[c,o]=d.useState(null),w=d.useMemo(()=>({...Ve,...v}),[v]),{width:x,height:E}=Se(h),A=d.useMemo(()=>JSON.stringify({width:x,height:E,spaceOrigin:r,spaceScales:i,timeOrigin:u,timeScale:s,xOffset:m,yOffset:a,swapAxis:l,hideGrid:p,hidePathsLabels:y}),[x,E,r,i,u,s,m,a,l,p,y]),C=d.useMemo(()=>{const W=tn(r,i),ae=l?"y":"x",ue=l?"x":"y";let $,U;l?($=a,U=m):($=m,U=a);const be=un(u,$,s),ge=on(U,W),Ce=pn(be,ge,ae,ue),ce=mn(u,$,s),ve=sn(r,U,W),Oe=ln(ce,ve,ae,ue),X=[];return{fingerprint:A,width:x,height:E,getTimePixel:be,getSpacePixel:ge,getPoint:Ce,getTime:ce,getSpace:ve,getData:Oe,pickingElements:X,resetPickingElements:()=>{X.length=0},registerPickingElement:Le=>(X.push(Le),X.length-1),operationalPoints:n,spaceOrigin:r,spaceScaleTree:W,timeOrigin:u,timeScale:s,timePixelOffset:$,spacePixelOffset:U,timeAxis:ae,spaceAxis:ue,swapAxis:!!l,enableSnapping:!!t,hideGrid:!!p,hidePathsLabels:!!y,theme:w}},[A]),O=nn(h),{position:I,down:B,isHover:_}=O,{canvasContext:D,hoveredItem:R}=We(c,C,I),H=d.useMemo(()=>{const W=t?dn(O.position,R):O.position;return{down:B,isHover:_,position:W,hoveredItem:R,data:C.getData(W)}},[t,O.position,R,B,_,C]);return en(h,H,{onPan:f,onZoom:q,onClick:P,onMouseMove:S},C),d.useEffect(()=>{b&&b({item:R,context:C})},[R]),d.useEffect(()=>{rn(w)},[w]),F.createElement("div",{...T,ref:g,className:Ne("relative space-time-chart",T.className),style:{background:w.background}},F.createElement("div",{ref:o,className:"absolute inset-0"}),F.createElement(ze.Provider,{value:C},F.createElement(de.Provider,{value:D},F.createElement(De.Provider,{value:H},!p&&F.createElement(F.Fragment,null,F.createElement(He,null),F.createElement(Je,null),F.createElement(Xe,null)),k))))};bn.__docgenInfo={description:"",methods:[],displayName:"SpaceTimeChart",props:{children:{required:!1,tsType:{name:"Array",elements:[{name:"ReactNode"}],raw:"ReactNode[]"},description:""},operationalPoints:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: string;
  label: string;
  position: number;
  importanceLevel?: number; // Lower is better. If null, the point won't be displayed.
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"position",value:{name:"number",required:!0}},{key:"importanceLevel",value:{name:"number",required:!1}}]}}],raw:"OperationalPoint[]"},description:""},spaceOrigin:{required:!0,tsType:{name:"number"},description:""},spaceScales:{required:!0,tsType:{name:"Array",elements:[{name:"intersection",raw:`{
  // End point (in meters):
  to: number;
} & (
  | {
      // Coefficient (in meters/px):
      coefficient: number;
    }
  | {
      // Size (in px):
      size: number;
    }
)`,elements:[{name:"signature",type:"object",raw:`{
  // End point (in meters):
  to: number;
}`,signature:{properties:[{key:"to",value:{name:"number",required:!0}}]}},{name:"unknown"}]}],raw:"SpaceScale[]"},description:""},timeOrigin:{required:!0,tsType:{name:"number"},description:""},timeScale:{required:!0,tsType:{name:"number"},description:""},xOffset:{required:!1,tsType:{name:"number"},description:""},yOffset:{required:!1,tsType:{name:"number"},description:""},swapAxis:{required:!1,tsType:{name:"boolean"},description:""},enableSnapping:{required:!1,tsType:{name:"boolean"},description:""},hideGrid:{required:!1,tsType:{name:"boolean"},description:""},hidePathsLabels:{required:!1,tsType:{name:"boolean"},description:""},theme:{required:!1,tsType:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
  background: string;
  breakpoints: number[];
  timeRanges: number[];
  pathsStyles: {
    fontSize: number;
    fontFamily: string;
  };
  spaceGraduationsStyles: Record<number, LineStyle>;
  timeCaptionsPriorities: number[][];
  timeCaptionsStyles: Record<
    number,
    {
      color: string;
      font: string;
      fontWeight?: string;
      fontSize?: string;
      topOffset?: number;
    }
  >;
  timeGraduationsPriorities: number[][];
  timeGraduationsStyles: Record<number, LineStyle>;
}`,signature:{properties:[{key:"background",value:{name:"string",required:!0}},{key:"breakpoints",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!0}},{key:"timeRanges",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!0}},{key:"pathsStyles",value:{name:"signature",type:"object",raw:`{
  fontSize: number;
  fontFamily: string;
}`,signature:{properties:[{key:"fontSize",value:{name:"number",required:!0}},{key:"fontFamily",value:{name:"string",required:!0}}]},required:!0}},{key:"spaceGraduationsStyles",value:{name:"Record",elements:[{name:"number"},{name:"signature",type:"object",raw:"{ width: number; color: string; opacity?: number; dashArray?: number[] }",signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"color",value:{name:"string",required:!0}},{key:"opacity",value:{name:"number",required:!1}},{key:"dashArray",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!1}}]}}],raw:"Record<number, LineStyle>",required:!0}},{key:"timeCaptionsPriorities",value:{name:"Array",elements:[{name:"Array",elements:[{name:"number"}],raw:"number[]"}],raw:"number[][]",required:!0}},{key:"timeCaptionsStyles",value:{name:"Record",elements:[{name:"number"},{name:"signature",type:"object",raw:`{
  color: string;
  font: string;
  fontWeight?: string;
  fontSize?: string;
  topOffset?: number;
}`,signature:{properties:[{key:"color",value:{name:"string",required:!0}},{key:"font",value:{name:"string",required:!0}},{key:"fontWeight",value:{name:"string",required:!1}},{key:"fontSize",value:{name:"string",required:!1}},{key:"topOffset",value:{name:"number",required:!1}}]}}],raw:`Record<
  number,
  {
    color: string;
    font: string;
    fontWeight?: string;
    fontSize?: string;
    topOffset?: number;
  }
>`,required:!0}},{key:"timeGraduationsPriorities",value:{name:"Array",elements:[{name:"Array",elements:[{name:"number"}],raw:"number[]"}],raw:"number[][]",required:!0}},{key:"timeGraduationsStyles",value:{name:"Record",elements:[{name:"number"},{name:"signature",type:"object",raw:"{ width: number; color: string; opacity?: number; dashArray?: number[] }",signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"color",value:{name:"string",required:!0}},{key:"opacity",value:{name:"number",required:!1}},{key:"dashArray",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!1}}]}}],raw:"Record<number, LineStyle>",required:!0}}]}}],raw:"Partial<SpaceTimeChartTheme>"},description:""},onPan:{required:!1,tsType:{name:"signature",type:"function",raw:"(payload: P) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  isPanning: boolean;
  initialPosition: Point;
  position: Point;
  initialData: DataPoint;
  data: DataPoint;
  context: SpaceTimeChartContextType;
}`,signature:{properties:[{key:"isPanning",value:{name:"boolean",required:!0}},{key:"initialPosition",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}},{key:"position",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}},{key:"initialData",value:{name:"signature",type:"object",raw:`{
  time: number;
  position: number;
}`,signature:{properties:[{key:"time",value:{name:"number",required:!0}},{key:"position",value:{name:"number",required:!0}}]},required:!0}},{key:"data",value:{name:"signature",type:"object",raw:`{
  time: number;
  position: number;
}`,signature:{properties:[{key:"time",value:{name:"number",required:!0}},{key:"position",value:{name:"number",required:!0}}]},required:!0}},{key:"context",value:{name:"signature",type:"object",raw:`{
  width: number;
  height: number;

  // Axis-swapping related data:
  timeAxis: Axis;
  spaceAxis: Axis;
  swapAxis: boolean;

  // This string is designed to be unique to each rendering:
  fingerprint: string;

  // Picking:
  pickingElements: PickingElement[];
  resetPickingElements: () => void;
  registerPickingElement: (element: PickingElement) => number;

  // Scales:
  timePixelOffset: number;
  spacePixelOffset: number;
  timeOrigin: number;
  timeScale: number;
  spaceOrigin: number;
  spaceScaleTree: NormalizedScaleTree;

  // Translation helpers:
  getTimePixel: TimeToPixel;
  getSpacePixel: SpaceToPixel;
  getPoint: DataToPoint;
  getTime: PixelToTime;
  getSpace: PixelToSpace;
  getData: PointToData;

  // Useful data:
  operationalPoints: OperationalPoint[];

  // Full theme:
  theme: SpaceTimeChartTheme;

  // Other options:
  enableSnapping: boolean;
  hideGrid: boolean;
  hidePathsLabels: boolean;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}},{key:"timeAxis",value:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}],required:!0}},{key:"spaceAxis",value:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}],required:!0}},{key:"swapAxis",value:{name:"boolean",required:!0}},{key:"fingerprint",value:{name:"string",required:!0}},{key:"pickingElements",value:{name:"Array",elements:[{name:"union",raw:`| { type: 'point'; pathId: string; point: Point }
| { type: 'segment'; pathId: string; from: Point; to: Point }`,elements:[{name:"signature",type:"object",raw:"{ type: 'point'; pathId: string; point: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'point'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"point",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:"{ type: 'segment'; pathId: string; from: Point; to: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'segment'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"from",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}},{key:"to",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}}]}],raw:"PickingElement[]",required:!0}},{key:"resetPickingElements",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}},{key:"registerPickingElement",value:{name:"signature",type:"function",raw:"(element: PickingElement) => number",signature:{arguments:[{type:{name:"union",raw:`| { type: 'point'; pathId: string; point: Point }
| { type: 'segment'; pathId: string; from: Point; to: Point }`,elements:[{name:"signature",type:"object",raw:"{ type: 'point'; pathId: string; point: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'point'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"point",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:"{ type: 'segment'; pathId: string; from: Point; to: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'segment'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"from",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}},{key:"to",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}}]},name:"element"}],return:{name:"number"}},required:!0}},{key:"timePixelOffset",value:{name:"number",required:!0}},{key:"spacePixelOffset",value:{name:"number",required:!0}},{key:"timeOrigin",value:{name:"number",required:!0}},{key:"timeScale",value:{name:"number",required:!0}},{key:"spaceOrigin",value:{name:"number",required:!0}},{key:"spaceScaleTree",value:{name:"union",raw:`| T
| {
    // "limit", "from" and "to" in meters:
    limit: number;
    from: number;
    to: number;
    // "limit", "from" and "to" in screen pixels:
    pixelFrom: number;
    pixelTo: number;
    pixelLimit: number;
    // children:
    left: BinaryTreeNode<T>;
    right: BinaryTreeNode<T>;
  }`,elements:[{name:"signature",type:"object",raw:`{
  coefficient: number;
  // "from" and "to" in meters:
  from: number;
  to: number;
  // "from" and "to" in screen pixels:
  pixelFrom: number;
  pixelTo: number;
  // siblings:
  previous?: NormalizedScale;
  next?: NormalizedScale;
}`,signature:{properties:[{key:"coefficient",value:{name:"number",required:!0}},{key:"from",value:{name:"number",required:!0}},{key:"to",value:{name:"number",required:!0}},{key:"pixelFrom",value:{name:"number",required:!0}},{key:"pixelTo",value:{name:"number",required:!0}},{key:"previous",value:{name:"NormalizedScale",required:!1}},{key:"next",value:{name:"NormalizedScale",required:!1}}]}},{name:"signature",type:"object",raw:`{
  // "limit", "from" and "to" in meters:
  limit: number;
  from: number;
  to: number;
  // "limit", "from" and "to" in screen pixels:
  pixelFrom: number;
  pixelTo: number;
  pixelLimit: number;
  // children:
  left: BinaryTreeNode<T>;
  right: BinaryTreeNode<T>;
}`,signature:{properties:[{key:"limit",value:{name:"number",required:!0}},{key:"from",value:{name:"number",required:!0}},{key:"to",value:{name:"number",required:!0}},{key:"pixelFrom",value:{name:"number",required:!0}},{key:"pixelTo",value:{name:"number",required:!0}},{key:"pixelLimit",value:{name:"number",required:!0}},{key:"left",value:{name:"BinaryTreeNode",required:!0}},{key:"right",value:{name:"BinaryTreeNode",required:!0}}]}}],required:!0}},{key:"getTimePixel",value:{name:"signature",type:"function",raw:"(time: number) => number",signature:{arguments:[{type:{name:"number"},name:"time"}],return:{name:"number"}},required:!0}},{key:"getSpacePixel",value:{name:"signature",type:"function",raw:"(position: number) => number",signature:{arguments:[{type:{name:"number"},name:"position"}],return:{name:"number"}},required:!0}},{key:"getPoint",value:{name:"signature",type:"function",raw:"(data: DataPoint) => Point",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  time: number;
  position: number;
}`,signature:{properties:[{key:"time",value:{name:"number",required:!0}},{key:"position",value:{name:"number",required:!0}}]},required:!0},name:"data"}],return:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}},required:!0}},{key:"getTime",value:{name:"signature",type:"function",raw:"(x: number) => number",signature:{arguments:[{type:{name:"number"},name:"x"}],return:{name:"number"}},required:!0}},{key:"getSpace",value:{name:"signature",type:"function",raw:"(y: number) => number",signature:{arguments:[{type:{name:"number"},name:"y"}],return:{name:"number"}},required:!0}},{key:"getData",value:{name:"signature",type:"function",raw:"(point: Point) => DataPoint",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0},name:"point"}],return:{name:"signature",type:"object",raw:`{
  time: number;
  position: number;
}`,signature:{properties:[{key:"time",value:{name:"number",required:!0}},{key:"position",value:{name:"number",required:!0}}]},required:!0}},required:!0}},{key:"operationalPoints",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: string;
  label: string;
  position: number;
  importanceLevel?: number; // Lower is better. If null, the point won't be displayed.
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"position",value:{name:"number",required:!0}},{key:"importanceLevel",value:{name:"number",required:!1}}]}}],raw:"OperationalPoint[]",required:!0}},{key:"theme",value:{name:"signature",type:"object",raw:`{
  background: string;
  breakpoints: number[];
  timeRanges: number[];
  pathsStyles: {
    fontSize: number;
    fontFamily: string;
  };
  spaceGraduationsStyles: Record<number, LineStyle>;
  timeCaptionsPriorities: number[][];
  timeCaptionsStyles: Record<
    number,
    {
      color: string;
      font: string;
      fontWeight?: string;
      fontSize?: string;
      topOffset?: number;
    }
  >;
  timeGraduationsPriorities: number[][];
  timeGraduationsStyles: Record<number, LineStyle>;
}`,signature:{properties:[{key:"background",value:{name:"string",required:!0}},{key:"breakpoints",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!0}},{key:"timeRanges",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!0}},{key:"pathsStyles",value:{name:"signature",type:"object",raw:`{
  fontSize: number;
  fontFamily: string;
}`,signature:{properties:[{key:"fontSize",value:{name:"number",required:!0}},{key:"fontFamily",value:{name:"string",required:!0}}]},required:!0}},{key:"spaceGraduationsStyles",value:{name:"Record",elements:[{name:"number"},{name:"signature",type:"object",raw:"{ width: number; color: string; opacity?: number; dashArray?: number[] }",signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"color",value:{name:"string",required:!0}},{key:"opacity",value:{name:"number",required:!1}},{key:"dashArray",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!1}}]}}],raw:"Record<number, LineStyle>",required:!0}},{key:"timeCaptionsPriorities",value:{name:"Array",elements:[{name:"Array",elements:[{name:"number"}],raw:"number[]"}],raw:"number[][]",required:!0}},{key:"timeCaptionsStyles",value:{name:"Record",elements:[{name:"number"},{name:"signature",type:"object",raw:`{
  color: string;
  font: string;
  fontWeight?: string;
  fontSize?: string;
  topOffset?: number;
}`,signature:{properties:[{key:"color",value:{name:"string",required:!0}},{key:"font",value:{name:"string",required:!0}},{key:"fontWeight",value:{name:"string",required:!1}},{key:"fontSize",value:{name:"string",required:!1}},{key:"topOffset",value:{name:"number",required:!1}}]}}],raw:`Record<
  number,
  {
    color: string;
    font: string;
    fontWeight?: string;
    fontSize?: string;
    topOffset?: number;
  }
>`,required:!0}},{key:"timeGraduationsPriorities",value:{name:"Array",elements:[{name:"Array",elements:[{name:"number"}],raw:"number[]"}],raw:"number[][]",required:!0}},{key:"timeGraduationsStyles",value:{name:"Record",elements:[{name:"number"},{name:"signature",type:"object",raw:"{ width: number; color: string; opacity?: number; dashArray?: number[] }",signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"color",value:{name:"string",required:!0}},{key:"opacity",value:{name:"number",required:!1}},{key:"dashArray",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!1}}]}}],raw:"Record<number, LineStyle>",required:!0}}]},required:!0}},{key:"enableSnapping",value:{name:"boolean",required:!0}},{key:"hideGrid",value:{name:"boolean",required:!0}},{key:"hidePathsLabels",value:{name:"boolean",required:!0}}]},required:!0}}]}},name:"payload"}],return:{name:"void"}}},description:""},onZoom:{required:!1,tsType:{name:"signature",type:"function",raw:"(payload: P) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  delta: number;
  position: Point;
  event: WheelEvent;
  context: SpaceTimeChartContextType;
}`,signature:{properties:[{key:"delta",value:{name:"number",required:!0}},{key:"position",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}},{key:"event",value:{name:"WheelEvent",required:!0}},{key:"context",value:{name:"signature",type:"object",raw:`{
  width: number;
  height: number;

  // Axis-swapping related data:
  timeAxis: Axis;
  spaceAxis: Axis;
  swapAxis: boolean;

  // This string is designed to be unique to each rendering:
  fingerprint: string;

  // Picking:
  pickingElements: PickingElement[];
  resetPickingElements: () => void;
  registerPickingElement: (element: PickingElement) => number;

  // Scales:
  timePixelOffset: number;
  spacePixelOffset: number;
  timeOrigin: number;
  timeScale: number;
  spaceOrigin: number;
  spaceScaleTree: NormalizedScaleTree;

  // Translation helpers:
  getTimePixel: TimeToPixel;
  getSpacePixel: SpaceToPixel;
  getPoint: DataToPoint;
  getTime: PixelToTime;
  getSpace: PixelToSpace;
  getData: PointToData;

  // Useful data:
  operationalPoints: OperationalPoint[];

  // Full theme:
  theme: SpaceTimeChartTheme;

  // Other options:
  enableSnapping: boolean;
  hideGrid: boolean;
  hidePathsLabels: boolean;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}},{key:"timeAxis",value:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}],required:!0}},{key:"spaceAxis",value:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}],required:!0}},{key:"swapAxis",value:{name:"boolean",required:!0}},{key:"fingerprint",value:{name:"string",required:!0}},{key:"pickingElements",value:{name:"Array",elements:[{name:"union",raw:`| { type: 'point'; pathId: string; point: Point }
| { type: 'segment'; pathId: string; from: Point; to: Point }`,elements:[{name:"signature",type:"object",raw:"{ type: 'point'; pathId: string; point: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'point'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"point",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:"{ type: 'segment'; pathId: string; from: Point; to: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'segment'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"from",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}},{key:"to",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}}]}],raw:"PickingElement[]",required:!0}},{key:"resetPickingElements",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}},{key:"registerPickingElement",value:{name:"signature",type:"function",raw:"(element: PickingElement) => number",signature:{arguments:[{type:{name:"union",raw:`| { type: 'point'; pathId: string; point: Point }
| { type: 'segment'; pathId: string; from: Point; to: Point }`,elements:[{name:"signature",type:"object",raw:"{ type: 'point'; pathId: string; point: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'point'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"point",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:"{ type: 'segment'; pathId: string; from: Point; to: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'segment'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"from",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}},{key:"to",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}}]},name:"element"}],return:{name:"number"}},required:!0}},{key:"timePixelOffset",value:{name:"number",required:!0}},{key:"spacePixelOffset",value:{name:"number",required:!0}},{key:"timeOrigin",value:{name:"number",required:!0}},{key:"timeScale",value:{name:"number",required:!0}},{key:"spaceOrigin",value:{name:"number",required:!0}},{key:"spaceScaleTree",value:{name:"union",raw:`| T
| {
    // "limit", "from" and "to" in meters:
    limit: number;
    from: number;
    to: number;
    // "limit", "from" and "to" in screen pixels:
    pixelFrom: number;
    pixelTo: number;
    pixelLimit: number;
    // children:
    left: BinaryTreeNode<T>;
    right: BinaryTreeNode<T>;
  }`,elements:[{name:"signature",type:"object",raw:`{
  coefficient: number;
  // "from" and "to" in meters:
  from: number;
  to: number;
  // "from" and "to" in screen pixels:
  pixelFrom: number;
  pixelTo: number;
  // siblings:
  previous?: NormalizedScale;
  next?: NormalizedScale;
}`,signature:{properties:[{key:"coefficient",value:{name:"number",required:!0}},{key:"from",value:{name:"number",required:!0}},{key:"to",value:{name:"number",required:!0}},{key:"pixelFrom",value:{name:"number",required:!0}},{key:"pixelTo",value:{name:"number",required:!0}},{key:"previous",value:{name:"NormalizedScale",required:!1}},{key:"next",value:{name:"NormalizedScale",required:!1}}]}},{name:"signature",type:"object",raw:`{
  // "limit", "from" and "to" in meters:
  limit: number;
  from: number;
  to: number;
  // "limit", "from" and "to" in screen pixels:
  pixelFrom: number;
  pixelTo: number;
  pixelLimit: number;
  // children:
  left: BinaryTreeNode<T>;
  right: BinaryTreeNode<T>;
}`,signature:{properties:[{key:"limit",value:{name:"number",required:!0}},{key:"from",value:{name:"number",required:!0}},{key:"to",value:{name:"number",required:!0}},{key:"pixelFrom",value:{name:"number",required:!0}},{key:"pixelTo",value:{name:"number",required:!0}},{key:"pixelLimit",value:{name:"number",required:!0}},{key:"left",value:{name:"BinaryTreeNode",required:!0}},{key:"right",value:{name:"BinaryTreeNode",required:!0}}]}}],required:!0}},{key:"getTimePixel",value:{name:"signature",type:"function",raw:"(time: number) => number",signature:{arguments:[{type:{name:"number"},name:"time"}],return:{name:"number"}},required:!0}},{key:"getSpacePixel",value:{name:"signature",type:"function",raw:"(position: number) => number",signature:{arguments:[{type:{name:"number"},name:"position"}],return:{name:"number"}},required:!0}},{key:"getPoint",value:{name:"signature",type:"function",raw:"(data: DataPoint) => Point",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  time: number;
  position: number;
}`,signature:{properties:[{key:"time",value:{name:"number",required:!0}},{key:"position",value:{name:"number",required:!0}}]}},name:"data"}],return:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}},required:!0}},{key:"getTime",value:{name:"signature",type:"function",raw:"(x: number) => number",signature:{arguments:[{type:{name:"number"},name:"x"}],return:{name:"number"}},required:!0}},{key:"getSpace",value:{name:"signature",type:"function",raw:"(y: number) => number",signature:{arguments:[{type:{name:"number"},name:"y"}],return:{name:"number"}},required:!0}},{key:"getData",value:{name:"signature",type:"function",raw:"(point: Point) => DataPoint",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0},name:"point"}],return:{name:"signature",type:"object",raw:`{
  time: number;
  position: number;
}`,signature:{properties:[{key:"time",value:{name:"number",required:!0}},{key:"position",value:{name:"number",required:!0}}]}}},required:!0}},{key:"operationalPoints",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: string;
  label: string;
  position: number;
  importanceLevel?: number; // Lower is better. If null, the point won't be displayed.
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"position",value:{name:"number",required:!0}},{key:"importanceLevel",value:{name:"number",required:!1}}]}}],raw:"OperationalPoint[]",required:!0}},{key:"theme",value:{name:"signature",type:"object",raw:`{
  background: string;
  breakpoints: number[];
  timeRanges: number[];
  pathsStyles: {
    fontSize: number;
    fontFamily: string;
  };
  spaceGraduationsStyles: Record<number, LineStyle>;
  timeCaptionsPriorities: number[][];
  timeCaptionsStyles: Record<
    number,
    {
      color: string;
      font: string;
      fontWeight?: string;
      fontSize?: string;
      topOffset?: number;
    }
  >;
  timeGraduationsPriorities: number[][];
  timeGraduationsStyles: Record<number, LineStyle>;
}`,signature:{properties:[{key:"background",value:{name:"string",required:!0}},{key:"breakpoints",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!0}},{key:"timeRanges",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!0}},{key:"pathsStyles",value:{name:"signature",type:"object",raw:`{
  fontSize: number;
  fontFamily: string;
}`,signature:{properties:[{key:"fontSize",value:{name:"number",required:!0}},{key:"fontFamily",value:{name:"string",required:!0}}]},required:!0}},{key:"spaceGraduationsStyles",value:{name:"Record",elements:[{name:"number"},{name:"signature",type:"object",raw:"{ width: number; color: string; opacity?: number; dashArray?: number[] }",signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"color",value:{name:"string",required:!0}},{key:"opacity",value:{name:"number",required:!1}},{key:"dashArray",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!1}}]}}],raw:"Record<number, LineStyle>",required:!0}},{key:"timeCaptionsPriorities",value:{name:"Array",elements:[{name:"Array",elements:[{name:"number"}],raw:"number[]"}],raw:"number[][]",required:!0}},{key:"timeCaptionsStyles",value:{name:"Record",elements:[{name:"number"},{name:"signature",type:"object",raw:`{
  color: string;
  font: string;
  fontWeight?: string;
  fontSize?: string;
  topOffset?: number;
}`,signature:{properties:[{key:"color",value:{name:"string",required:!0}},{key:"font",value:{name:"string",required:!0}},{key:"fontWeight",value:{name:"string",required:!1}},{key:"fontSize",value:{name:"string",required:!1}},{key:"topOffset",value:{name:"number",required:!1}}]}}],raw:`Record<
  number,
  {
    color: string;
    font: string;
    fontWeight?: string;
    fontSize?: string;
    topOffset?: number;
  }
>`,required:!0}},{key:"timeGraduationsPriorities",value:{name:"Array",elements:[{name:"Array",elements:[{name:"number"}],raw:"number[]"}],raw:"number[][]",required:!0}},{key:"timeGraduationsStyles",value:{name:"Record",elements:[{name:"number"},{name:"signature",type:"object",raw:"{ width: number; color: string; opacity?: number; dashArray?: number[] }",signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"color",value:{name:"string",required:!0}},{key:"opacity",value:{name:"number",required:!1}},{key:"dashArray",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!1}}]}}],raw:"Record<number, LineStyle>",required:!0}}]},required:!0}},{key:"enableSnapping",value:{name:"boolean",required:!0}},{key:"hideGrid",value:{name:"boolean",required:!0}},{key:"hidePathsLabels",value:{name:"boolean",required:!0}}]},required:!0}}]}},name:"payload"}],return:{name:"void"}}},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(payload: P) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  position: Point;
  data: DataPoint;
  event: MouseEvent;
  hoveredItem: HoveredItem | null;
  context: SpaceTimeChartContextType;
}`,signature:{properties:[{key:"position",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}},{key:"data",value:{name:"signature",type:"object",raw:`{
  time: number;
  position: number;
}`,signature:{properties:[{key:"time",value:{name:"number",required:!0}},{key:"position",value:{name:"number",required:!0}}]},required:!0}},{key:"event",value:{name:"MouseEvent",required:!0}},{key:"hoveredItem",value:{name:"union",raw:"HoveredItem | null",elements:[{name:"signature",type:"object",raw:"{ layer: PickingLayerType; element: PickingElement }",signature:{properties:[{key:"layer",value:{name:"unknown[number]",raw:"(typeof PICKING_LAYERS)[number]",required:!0}},{key:"element",value:{name:"union",raw:`| { type: 'point'; pathId: string; point: Point }
| { type: 'segment'; pathId: string; from: Point; to: Point }`,elements:[{name:"signature",type:"object",raw:"{ type: 'point'; pathId: string; point: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'point'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"point",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:"{ type: 'segment'; pathId: string; from: Point; to: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'segment'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"from",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}},{key:"to",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}}],required:!0}}]}},{name:"null"}],required:!0}},{key:"context",value:{name:"signature",type:"object",raw:`{
  width: number;
  height: number;

  // Axis-swapping related data:
  timeAxis: Axis;
  spaceAxis: Axis;
  swapAxis: boolean;

  // This string is designed to be unique to each rendering:
  fingerprint: string;

  // Picking:
  pickingElements: PickingElement[];
  resetPickingElements: () => void;
  registerPickingElement: (element: PickingElement) => number;

  // Scales:
  timePixelOffset: number;
  spacePixelOffset: number;
  timeOrigin: number;
  timeScale: number;
  spaceOrigin: number;
  spaceScaleTree: NormalizedScaleTree;

  // Translation helpers:
  getTimePixel: TimeToPixel;
  getSpacePixel: SpaceToPixel;
  getPoint: DataToPoint;
  getTime: PixelToTime;
  getSpace: PixelToSpace;
  getData: PointToData;

  // Useful data:
  operationalPoints: OperationalPoint[];

  // Full theme:
  theme: SpaceTimeChartTheme;

  // Other options:
  enableSnapping: boolean;
  hideGrid: boolean;
  hidePathsLabels: boolean;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}},{key:"timeAxis",value:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}],required:!0}},{key:"spaceAxis",value:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}],required:!0}},{key:"swapAxis",value:{name:"boolean",required:!0}},{key:"fingerprint",value:{name:"string",required:!0}},{key:"pickingElements",value:{name:"Array",elements:[{name:"union",raw:`| { type: 'point'; pathId: string; point: Point }
| { type: 'segment'; pathId: string; from: Point; to: Point }`,elements:[{name:"signature",type:"object",raw:"{ type: 'point'; pathId: string; point: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'point'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"point",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:"{ type: 'segment'; pathId: string; from: Point; to: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'segment'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"from",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}},{key:"to",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}}],required:!0}],raw:"PickingElement[]",required:!0}},{key:"resetPickingElements",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}},{key:"registerPickingElement",value:{name:"signature",type:"function",raw:"(element: PickingElement) => number",signature:{arguments:[{type:{name:"union",raw:`| { type: 'point'; pathId: string; point: Point }
| { type: 'segment'; pathId: string; from: Point; to: Point }`,elements:[{name:"signature",type:"object",raw:"{ type: 'point'; pathId: string; point: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'point'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"point",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:"{ type: 'segment'; pathId: string; from: Point; to: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'segment'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"from",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}},{key:"to",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}}],required:!0},name:"element"}],return:{name:"number"}},required:!0}},{key:"timePixelOffset",value:{name:"number",required:!0}},{key:"spacePixelOffset",value:{name:"number",required:!0}},{key:"timeOrigin",value:{name:"number",required:!0}},{key:"timeScale",value:{name:"number",required:!0}},{key:"spaceOrigin",value:{name:"number",required:!0}},{key:"spaceScaleTree",value:{name:"union",raw:`| T
| {
    // "limit", "from" and "to" in meters:
    limit: number;
    from: number;
    to: number;
    // "limit", "from" and "to" in screen pixels:
    pixelFrom: number;
    pixelTo: number;
    pixelLimit: number;
    // children:
    left: BinaryTreeNode<T>;
    right: BinaryTreeNode<T>;
  }`,elements:[{name:"signature",type:"object",raw:`{
  coefficient: number;
  // "from" and "to" in meters:
  from: number;
  to: number;
  // "from" and "to" in screen pixels:
  pixelFrom: number;
  pixelTo: number;
  // siblings:
  previous?: NormalizedScale;
  next?: NormalizedScale;
}`,signature:{properties:[{key:"coefficient",value:{name:"number",required:!0}},{key:"from",value:{name:"number",required:!0}},{key:"to",value:{name:"number",required:!0}},{key:"pixelFrom",value:{name:"number",required:!0}},{key:"pixelTo",value:{name:"number",required:!0}},{key:"previous",value:{name:"NormalizedScale",required:!1}},{key:"next",value:{name:"NormalizedScale",required:!1}}]}},{name:"signature",type:"object",raw:`{
  // "limit", "from" and "to" in meters:
  limit: number;
  from: number;
  to: number;
  // "limit", "from" and "to" in screen pixels:
  pixelFrom: number;
  pixelTo: number;
  pixelLimit: number;
  // children:
  left: BinaryTreeNode<T>;
  right: BinaryTreeNode<T>;
}`,signature:{properties:[{key:"limit",value:{name:"number",required:!0}},{key:"from",value:{name:"number",required:!0}},{key:"to",value:{name:"number",required:!0}},{key:"pixelFrom",value:{name:"number",required:!0}},{key:"pixelTo",value:{name:"number",required:!0}},{key:"pixelLimit",value:{name:"number",required:!0}},{key:"left",value:{name:"BinaryTreeNode",required:!0}},{key:"right",value:{name:"BinaryTreeNode",required:!0}}]}}],required:!0}},{key:"getTimePixel",value:{name:"signature",type:"function",raw:"(time: number) => number",signature:{arguments:[{type:{name:"number"},name:"time"}],return:{name:"number"}},required:!0}},{key:"getSpacePixel",value:{name:"signature",type:"function",raw:"(position: number) => number",signature:{arguments:[{type:{name:"number"},name:"position"}],return:{name:"number"}},required:!0}},{key:"getPoint",value:{name:"signature",type:"function",raw:"(data: DataPoint) => Point",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  time: number;
  position: number;
}`,signature:{properties:[{key:"time",value:{name:"number",required:!0}},{key:"position",value:{name:"number",required:!0}}]},required:!0},name:"data"}],return:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}},required:!0}},{key:"getTime",value:{name:"signature",type:"function",raw:"(x: number) => number",signature:{arguments:[{type:{name:"number"},name:"x"}],return:{name:"number"}},required:!0}},{key:"getSpace",value:{name:"signature",type:"function",raw:"(y: number) => number",signature:{arguments:[{type:{name:"number"},name:"y"}],return:{name:"number"}},required:!0}},{key:"getData",value:{name:"signature",type:"function",raw:"(point: Point) => DataPoint",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0},name:"point"}],return:{name:"signature",type:"object",raw:`{
  time: number;
  position: number;
}`,signature:{properties:[{key:"time",value:{name:"number",required:!0}},{key:"position",value:{name:"number",required:!0}}]},required:!0}},required:!0}},{key:"operationalPoints",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: string;
  label: string;
  position: number;
  importanceLevel?: number; // Lower is better. If null, the point won't be displayed.
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"position",value:{name:"number",required:!0}},{key:"importanceLevel",value:{name:"number",required:!1}}]}}],raw:"OperationalPoint[]",required:!0}},{key:"theme",value:{name:"signature",type:"object",raw:`{
  background: string;
  breakpoints: number[];
  timeRanges: number[];
  pathsStyles: {
    fontSize: number;
    fontFamily: string;
  };
  spaceGraduationsStyles: Record<number, LineStyle>;
  timeCaptionsPriorities: number[][];
  timeCaptionsStyles: Record<
    number,
    {
      color: string;
      font: string;
      fontWeight?: string;
      fontSize?: string;
      topOffset?: number;
    }
  >;
  timeGraduationsPriorities: number[][];
  timeGraduationsStyles: Record<number, LineStyle>;
}`,signature:{properties:[{key:"background",value:{name:"string",required:!0}},{key:"breakpoints",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!0}},{key:"timeRanges",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!0}},{key:"pathsStyles",value:{name:"signature",type:"object",raw:`{
  fontSize: number;
  fontFamily: string;
}`,signature:{properties:[{key:"fontSize",value:{name:"number",required:!0}},{key:"fontFamily",value:{name:"string",required:!0}}]},required:!0}},{key:"spaceGraduationsStyles",value:{name:"Record",elements:[{name:"number"},{name:"signature",type:"object",raw:"{ width: number; color: string; opacity?: number; dashArray?: number[] }",signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"color",value:{name:"string",required:!0}},{key:"opacity",value:{name:"number",required:!1}},{key:"dashArray",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!1}}]}}],raw:"Record<number, LineStyle>",required:!0}},{key:"timeCaptionsPriorities",value:{name:"Array",elements:[{name:"Array",elements:[{name:"number"}],raw:"number[]"}],raw:"number[][]",required:!0}},{key:"timeCaptionsStyles",value:{name:"Record",elements:[{name:"number"},{name:"signature",type:"object",raw:`{
  color: string;
  font: string;
  fontWeight?: string;
  fontSize?: string;
  topOffset?: number;
}`,signature:{properties:[{key:"color",value:{name:"string",required:!0}},{key:"font",value:{name:"string",required:!0}},{key:"fontWeight",value:{name:"string",required:!1}},{key:"fontSize",value:{name:"string",required:!1}},{key:"topOffset",value:{name:"number",required:!1}}]}}],raw:`Record<
  number,
  {
    color: string;
    font: string;
    fontWeight?: string;
    fontSize?: string;
    topOffset?: number;
  }
>`,required:!0}},{key:"timeGraduationsPriorities",value:{name:"Array",elements:[{name:"Array",elements:[{name:"number"}],raw:"number[]"}],raw:"number[][]",required:!0}},{key:"timeGraduationsStyles",value:{name:"Record",elements:[{name:"number"},{name:"signature",type:"object",raw:"{ width: number; color: string; opacity?: number; dashArray?: number[] }",signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"color",value:{name:"string",required:!0}},{key:"opacity",value:{name:"number",required:!1}},{key:"dashArray",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!1}}]}}],raw:"Record<number, LineStyle>",required:!0}}]},required:!0}},{key:"enableSnapping",value:{name:"boolean",required:!0}},{key:"hideGrid",value:{name:"boolean",required:!0}},{key:"hidePathsLabels",value:{name:"boolean",required:!0}}]},required:!0}}]}},name:"payload"}],return:{name:"void"}}},description:""},onMouseMove:{required:!1,tsType:{name:"signature",type:"function",raw:"(payload: P) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  position: Point;
  data: DataPoint;
  isHover: boolean;
  hoveredItem: HoveredItem | null;
  context: SpaceTimeChartContextType;
}`,signature:{properties:[{key:"position",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}},{key:"data",value:{name:"signature",type:"object",raw:`{
  time: number;
  position: number;
}`,signature:{properties:[{key:"time",value:{name:"number",required:!0}},{key:"position",value:{name:"number",required:!0}}]},required:!0}},{key:"isHover",value:{name:"boolean",required:!0}},{key:"hoveredItem",value:{name:"union",raw:"HoveredItem | null",elements:[{name:"signature",type:"object",raw:"{ layer: PickingLayerType; element: PickingElement }",signature:{properties:[{key:"layer",value:{name:"unknown[number]",raw:"(typeof PICKING_LAYERS)[number]",required:!0}},{key:"element",value:{name:"union",raw:`| { type: 'point'; pathId: string; point: Point }
| { type: 'segment'; pathId: string; from: Point; to: Point }`,elements:[{name:"signature",type:"object",raw:"{ type: 'point'; pathId: string; point: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'point'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"point",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:"{ type: 'segment'; pathId: string; from: Point; to: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'segment'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"from",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}},{key:"to",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}}],required:!0}}]}},{name:"null"}],required:!0}},{key:"context",value:{name:"signature",type:"object",raw:`{
  width: number;
  height: number;

  // Axis-swapping related data:
  timeAxis: Axis;
  spaceAxis: Axis;
  swapAxis: boolean;

  // This string is designed to be unique to each rendering:
  fingerprint: string;

  // Picking:
  pickingElements: PickingElement[];
  resetPickingElements: () => void;
  registerPickingElement: (element: PickingElement) => number;

  // Scales:
  timePixelOffset: number;
  spacePixelOffset: number;
  timeOrigin: number;
  timeScale: number;
  spaceOrigin: number;
  spaceScaleTree: NormalizedScaleTree;

  // Translation helpers:
  getTimePixel: TimeToPixel;
  getSpacePixel: SpaceToPixel;
  getPoint: DataToPoint;
  getTime: PixelToTime;
  getSpace: PixelToSpace;
  getData: PointToData;

  // Useful data:
  operationalPoints: OperationalPoint[];

  // Full theme:
  theme: SpaceTimeChartTheme;

  // Other options:
  enableSnapping: boolean;
  hideGrid: boolean;
  hidePathsLabels: boolean;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}},{key:"timeAxis",value:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}],required:!0}},{key:"spaceAxis",value:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}],required:!0}},{key:"swapAxis",value:{name:"boolean",required:!0}},{key:"fingerprint",value:{name:"string",required:!0}},{key:"pickingElements",value:{name:"Array",elements:[{name:"union",raw:`| { type: 'point'; pathId: string; point: Point }
| { type: 'segment'; pathId: string; from: Point; to: Point }`,elements:[{name:"signature",type:"object",raw:"{ type: 'point'; pathId: string; point: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'point'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"point",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:"{ type: 'segment'; pathId: string; from: Point; to: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'segment'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"from",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}},{key:"to",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}}],required:!0}],raw:"PickingElement[]",required:!0}},{key:"resetPickingElements",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}},{key:"registerPickingElement",value:{name:"signature",type:"function",raw:"(element: PickingElement) => number",signature:{arguments:[{type:{name:"union",raw:`| { type: 'point'; pathId: string; point: Point }
| { type: 'segment'; pathId: string; from: Point; to: Point }`,elements:[{name:"signature",type:"object",raw:"{ type: 'point'; pathId: string; point: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'point'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"point",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:"{ type: 'segment'; pathId: string; from: Point; to: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'segment'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"from",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}},{key:"to",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}}],required:!0},name:"element"}],return:{name:"number"}},required:!0}},{key:"timePixelOffset",value:{name:"number",required:!0}},{key:"spacePixelOffset",value:{name:"number",required:!0}},{key:"timeOrigin",value:{name:"number",required:!0}},{key:"timeScale",value:{name:"number",required:!0}},{key:"spaceOrigin",value:{name:"number",required:!0}},{key:"spaceScaleTree",value:{name:"union",raw:`| T
| {
    // "limit", "from" and "to" in meters:
    limit: number;
    from: number;
    to: number;
    // "limit", "from" and "to" in screen pixels:
    pixelFrom: number;
    pixelTo: number;
    pixelLimit: number;
    // children:
    left: BinaryTreeNode<T>;
    right: BinaryTreeNode<T>;
  }`,elements:[{name:"signature",type:"object",raw:`{
  coefficient: number;
  // "from" and "to" in meters:
  from: number;
  to: number;
  // "from" and "to" in screen pixels:
  pixelFrom: number;
  pixelTo: number;
  // siblings:
  previous?: NormalizedScale;
  next?: NormalizedScale;
}`,signature:{properties:[{key:"coefficient",value:{name:"number",required:!0}},{key:"from",value:{name:"number",required:!0}},{key:"to",value:{name:"number",required:!0}},{key:"pixelFrom",value:{name:"number",required:!0}},{key:"pixelTo",value:{name:"number",required:!0}},{key:"previous",value:{name:"NormalizedScale",required:!1}},{key:"next",value:{name:"NormalizedScale",required:!1}}]}},{name:"signature",type:"object",raw:`{
  // "limit", "from" and "to" in meters:
  limit: number;
  from: number;
  to: number;
  // "limit", "from" and "to" in screen pixels:
  pixelFrom: number;
  pixelTo: number;
  pixelLimit: number;
  // children:
  left: BinaryTreeNode<T>;
  right: BinaryTreeNode<T>;
}`,signature:{properties:[{key:"limit",value:{name:"number",required:!0}},{key:"from",value:{name:"number",required:!0}},{key:"to",value:{name:"number",required:!0}},{key:"pixelFrom",value:{name:"number",required:!0}},{key:"pixelTo",value:{name:"number",required:!0}},{key:"pixelLimit",value:{name:"number",required:!0}},{key:"left",value:{name:"BinaryTreeNode",required:!0}},{key:"right",value:{name:"BinaryTreeNode",required:!0}}]}}],required:!0}},{key:"getTimePixel",value:{name:"signature",type:"function",raw:"(time: number) => number",signature:{arguments:[{type:{name:"number"},name:"time"}],return:{name:"number"}},required:!0}},{key:"getSpacePixel",value:{name:"signature",type:"function",raw:"(position: number) => number",signature:{arguments:[{type:{name:"number"},name:"position"}],return:{name:"number"}},required:!0}},{key:"getPoint",value:{name:"signature",type:"function",raw:"(data: DataPoint) => Point",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  time: number;
  position: number;
}`,signature:{properties:[{key:"time",value:{name:"number",required:!0}},{key:"position",value:{name:"number",required:!0}}]},required:!0},name:"data"}],return:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}},required:!0}},{key:"getTime",value:{name:"signature",type:"function",raw:"(x: number) => number",signature:{arguments:[{type:{name:"number"},name:"x"}],return:{name:"number"}},required:!0}},{key:"getSpace",value:{name:"signature",type:"function",raw:"(y: number) => number",signature:{arguments:[{type:{name:"number"},name:"y"}],return:{name:"number"}},required:!0}},{key:"getData",value:{name:"signature",type:"function",raw:"(point: Point) => DataPoint",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0},name:"point"}],return:{name:"signature",type:"object",raw:`{
  time: number;
  position: number;
}`,signature:{properties:[{key:"time",value:{name:"number",required:!0}},{key:"position",value:{name:"number",required:!0}}]},required:!0}},required:!0}},{key:"operationalPoints",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: string;
  label: string;
  position: number;
  importanceLevel?: number; // Lower is better. If null, the point won't be displayed.
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"position",value:{name:"number",required:!0}},{key:"importanceLevel",value:{name:"number",required:!1}}]}}],raw:"OperationalPoint[]",required:!0}},{key:"theme",value:{name:"signature",type:"object",raw:`{
  background: string;
  breakpoints: number[];
  timeRanges: number[];
  pathsStyles: {
    fontSize: number;
    fontFamily: string;
  };
  spaceGraduationsStyles: Record<number, LineStyle>;
  timeCaptionsPriorities: number[][];
  timeCaptionsStyles: Record<
    number,
    {
      color: string;
      font: string;
      fontWeight?: string;
      fontSize?: string;
      topOffset?: number;
    }
  >;
  timeGraduationsPriorities: number[][];
  timeGraduationsStyles: Record<number, LineStyle>;
}`,signature:{properties:[{key:"background",value:{name:"string",required:!0}},{key:"breakpoints",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!0}},{key:"timeRanges",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!0}},{key:"pathsStyles",value:{name:"signature",type:"object",raw:`{
  fontSize: number;
  fontFamily: string;
}`,signature:{properties:[{key:"fontSize",value:{name:"number",required:!0}},{key:"fontFamily",value:{name:"string",required:!0}}]},required:!0}},{key:"spaceGraduationsStyles",value:{name:"Record",elements:[{name:"number"},{name:"signature",type:"object",raw:"{ width: number; color: string; opacity?: number; dashArray?: number[] }",signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"color",value:{name:"string",required:!0}},{key:"opacity",value:{name:"number",required:!1}},{key:"dashArray",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!1}}]}}],raw:"Record<number, LineStyle>",required:!0}},{key:"timeCaptionsPriorities",value:{name:"Array",elements:[{name:"Array",elements:[{name:"number"}],raw:"number[]"}],raw:"number[][]",required:!0}},{key:"timeCaptionsStyles",value:{name:"Record",elements:[{name:"number"},{name:"signature",type:"object",raw:`{
  color: string;
  font: string;
  fontWeight?: string;
  fontSize?: string;
  topOffset?: number;
}`,signature:{properties:[{key:"color",value:{name:"string",required:!0}},{key:"font",value:{name:"string",required:!0}},{key:"fontWeight",value:{name:"string",required:!1}},{key:"fontSize",value:{name:"string",required:!1}},{key:"topOffset",value:{name:"number",required:!1}}]}}],raw:`Record<
  number,
  {
    color: string;
    font: string;
    fontWeight?: string;
    fontSize?: string;
    topOffset?: number;
  }
>`,required:!0}},{key:"timeGraduationsPriorities",value:{name:"Array",elements:[{name:"Array",elements:[{name:"number"}],raw:"number[]"}],raw:"number[][]",required:!0}},{key:"timeGraduationsStyles",value:{name:"Record",elements:[{name:"number"},{name:"signature",type:"object",raw:"{ width: number; color: string; opacity?: number; dashArray?: number[] }",signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"color",value:{name:"string",required:!0}},{key:"opacity",value:{name:"number",required:!1}},{key:"dashArray",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!1}}]}}],raw:"Record<number, LineStyle>",required:!0}}]},required:!0}},{key:"enableSnapping",value:{name:"boolean",required:!0}},{key:"hideGrid",value:{name:"boolean",required:!0}},{key:"hidePathsLabels",value:{name:"boolean",required:!0}}]},required:!0}}]}},name:"payload"}],return:{name:"void"}}},description:""},onHoveredChildUpdate:{required:!1,tsType:{name:"signature",type:"function",raw:"(payload: P) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{ item: HoveredItem | null; context: SpaceTimeChartContextType }",signature:{properties:[{key:"item",value:{name:"union",raw:"HoveredItem | null",elements:[{name:"signature",type:"object",raw:"{ layer: PickingLayerType; element: PickingElement }",signature:{properties:[{key:"layer",value:{name:"unknown[number]",raw:"(typeof PICKING_LAYERS)[number]",required:!0}},{key:"element",value:{name:"union",raw:`| { type: 'point'; pathId: string; point: Point }
| { type: 'segment'; pathId: string; from: Point; to: Point }`,elements:[{name:"signature",type:"object",raw:"{ type: 'point'; pathId: string; point: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'point'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"point",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:"{ type: 'segment'; pathId: string; from: Point; to: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'segment'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"from",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}},{key:"to",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}}],required:!0}}]}},{name:"null"}],required:!0}},{key:"context",value:{name:"signature",type:"object",raw:`{
  width: number;
  height: number;

  // Axis-swapping related data:
  timeAxis: Axis;
  spaceAxis: Axis;
  swapAxis: boolean;

  // This string is designed to be unique to each rendering:
  fingerprint: string;

  // Picking:
  pickingElements: PickingElement[];
  resetPickingElements: () => void;
  registerPickingElement: (element: PickingElement) => number;

  // Scales:
  timePixelOffset: number;
  spacePixelOffset: number;
  timeOrigin: number;
  timeScale: number;
  spaceOrigin: number;
  spaceScaleTree: NormalizedScaleTree;

  // Translation helpers:
  getTimePixel: TimeToPixel;
  getSpacePixel: SpaceToPixel;
  getPoint: DataToPoint;
  getTime: PixelToTime;
  getSpace: PixelToSpace;
  getData: PointToData;

  // Useful data:
  operationalPoints: OperationalPoint[];

  // Full theme:
  theme: SpaceTimeChartTheme;

  // Other options:
  enableSnapping: boolean;
  hideGrid: boolean;
  hidePathsLabels: boolean;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}},{key:"timeAxis",value:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}],required:!0}},{key:"spaceAxis",value:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}],required:!0}},{key:"swapAxis",value:{name:"boolean",required:!0}},{key:"fingerprint",value:{name:"string",required:!0}},{key:"pickingElements",value:{name:"Array",elements:[{name:"union",raw:`| { type: 'point'; pathId: string; point: Point }
| { type: 'segment'; pathId: string; from: Point; to: Point }`,elements:[{name:"signature",type:"object",raw:"{ type: 'point'; pathId: string; point: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'point'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"point",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:"{ type: 'segment'; pathId: string; from: Point; to: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'segment'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"from",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}},{key:"to",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}}],required:!0}],raw:"PickingElement[]",required:!0}},{key:"resetPickingElements",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}},{key:"registerPickingElement",value:{name:"signature",type:"function",raw:"(element: PickingElement) => number",signature:{arguments:[{type:{name:"union",raw:`| { type: 'point'; pathId: string; point: Point }
| { type: 'segment'; pathId: string; from: Point; to: Point }`,elements:[{name:"signature",type:"object",raw:"{ type: 'point'; pathId: string; point: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'point'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"point",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}},{name:"signature",type:"object",raw:"{ type: 'segment'; pathId: string; from: Point; to: Point }",signature:{properties:[{key:"type",value:{name:"literal",value:"'segment'",required:!0}},{key:"pathId",value:{name:"string",required:!0}},{key:"from",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}},{key:"to",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}}]}}],required:!0},name:"element"}],return:{name:"number"}},required:!0}},{key:"timePixelOffset",value:{name:"number",required:!0}},{key:"spacePixelOffset",value:{name:"number",required:!0}},{key:"timeOrigin",value:{name:"number",required:!0}},{key:"timeScale",value:{name:"number",required:!0}},{key:"spaceOrigin",value:{name:"number",required:!0}},{key:"spaceScaleTree",value:{name:"union",raw:`| T
| {
    // "limit", "from" and "to" in meters:
    limit: number;
    from: number;
    to: number;
    // "limit", "from" and "to" in screen pixels:
    pixelFrom: number;
    pixelTo: number;
    pixelLimit: number;
    // children:
    left: BinaryTreeNode<T>;
    right: BinaryTreeNode<T>;
  }`,elements:[{name:"signature",type:"object",raw:`{
  coefficient: number;
  // "from" and "to" in meters:
  from: number;
  to: number;
  // "from" and "to" in screen pixels:
  pixelFrom: number;
  pixelTo: number;
  // siblings:
  previous?: NormalizedScale;
  next?: NormalizedScale;
}`,signature:{properties:[{key:"coefficient",value:{name:"number",required:!0}},{key:"from",value:{name:"number",required:!0}},{key:"to",value:{name:"number",required:!0}},{key:"pixelFrom",value:{name:"number",required:!0}},{key:"pixelTo",value:{name:"number",required:!0}},{key:"previous",value:{name:"NormalizedScale",required:!1}},{key:"next",value:{name:"NormalizedScale",required:!1}}]}},{name:"signature",type:"object",raw:`{
  // "limit", "from" and "to" in meters:
  limit: number;
  from: number;
  to: number;
  // "limit", "from" and "to" in screen pixels:
  pixelFrom: number;
  pixelTo: number;
  pixelLimit: number;
  // children:
  left: BinaryTreeNode<T>;
  right: BinaryTreeNode<T>;
}`,signature:{properties:[{key:"limit",value:{name:"number",required:!0}},{key:"from",value:{name:"number",required:!0}},{key:"to",value:{name:"number",required:!0}},{key:"pixelFrom",value:{name:"number",required:!0}},{key:"pixelTo",value:{name:"number",required:!0}},{key:"pixelLimit",value:{name:"number",required:!0}},{key:"left",value:{name:"BinaryTreeNode",required:!0}},{key:"right",value:{name:"BinaryTreeNode",required:!0}}]}}],required:!0}},{key:"getTimePixel",value:{name:"signature",type:"function",raw:"(time: number) => number",signature:{arguments:[{type:{name:"number"},name:"time"}],return:{name:"number"}},required:!0}},{key:"getSpacePixel",value:{name:"signature",type:"function",raw:"(position: number) => number",signature:{arguments:[{type:{name:"number"},name:"position"}],return:{name:"number"}},required:!0}},{key:"getPoint",value:{name:"signature",type:"function",raw:"(data: DataPoint) => Point",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  time: number;
  position: number;
}`,signature:{properties:[{key:"time",value:{name:"number",required:!0}},{key:"position",value:{name:"number",required:!0}}]}},name:"data"}],return:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}},required:!0}},{key:"getTime",value:{name:"signature",type:"function",raw:"(x: number) => number",signature:{arguments:[{type:{name:"number"},name:"x"}],return:{name:"number"}},required:!0}},{key:"getSpace",value:{name:"signature",type:"function",raw:"(y: number) => number",signature:{arguments:[{type:{name:"number"},name:"y"}],return:{name:"number"}},required:!0}},{key:"getData",value:{name:"signature",type:"function",raw:"(point: Point) => DataPoint",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0},name:"point"}],return:{name:"signature",type:"object",raw:`{
  time: number;
  position: number;
}`,signature:{properties:[{key:"time",value:{name:"number",required:!0}},{key:"position",value:{name:"number",required:!0}}]}}},required:!0}},{key:"operationalPoints",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: string;
  label: string;
  position: number;
  importanceLevel?: number; // Lower is better. If null, the point won't be displayed.
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"position",value:{name:"number",required:!0}},{key:"importanceLevel",value:{name:"number",required:!1}}]}}],raw:"OperationalPoint[]",required:!0}},{key:"theme",value:{name:"signature",type:"object",raw:`{
  background: string;
  breakpoints: number[];
  timeRanges: number[];
  pathsStyles: {
    fontSize: number;
    fontFamily: string;
  };
  spaceGraduationsStyles: Record<number, LineStyle>;
  timeCaptionsPriorities: number[][];
  timeCaptionsStyles: Record<
    number,
    {
      color: string;
      font: string;
      fontWeight?: string;
      fontSize?: string;
      topOffset?: number;
    }
  >;
  timeGraduationsPriorities: number[][];
  timeGraduationsStyles: Record<number, LineStyle>;
}`,signature:{properties:[{key:"background",value:{name:"string",required:!0}},{key:"breakpoints",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!0}},{key:"timeRanges",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!0}},{key:"pathsStyles",value:{name:"signature",type:"object",raw:`{
  fontSize: number;
  fontFamily: string;
}`,signature:{properties:[{key:"fontSize",value:{name:"number",required:!0}},{key:"fontFamily",value:{name:"string",required:!0}}]},required:!0}},{key:"spaceGraduationsStyles",value:{name:"Record",elements:[{name:"number"},{name:"signature",type:"object",raw:"{ width: number; color: string; opacity?: number; dashArray?: number[] }",signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"color",value:{name:"string",required:!0}},{key:"opacity",value:{name:"number",required:!1}},{key:"dashArray",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!1}}]}}],raw:"Record<number, LineStyle>",required:!0}},{key:"timeCaptionsPriorities",value:{name:"Array",elements:[{name:"Array",elements:[{name:"number"}],raw:"number[]"}],raw:"number[][]",required:!0}},{key:"timeCaptionsStyles",value:{name:"Record",elements:[{name:"number"},{name:"signature",type:"object",raw:`{
  color: string;
  font: string;
  fontWeight?: string;
  fontSize?: string;
  topOffset?: number;
}`,signature:{properties:[{key:"color",value:{name:"string",required:!0}},{key:"font",value:{name:"string",required:!0}},{key:"fontWeight",value:{name:"string",required:!1}},{key:"fontSize",value:{name:"string",required:!1}},{key:"topOffset",value:{name:"number",required:!1}}]}}],raw:`Record<
  number,
  {
    color: string;
    font: string;
    fontWeight?: string;
    fontSize?: string;
    topOffset?: number;
  }
>`,required:!0}},{key:"timeGraduationsPriorities",value:{name:"Array",elements:[{name:"Array",elements:[{name:"number"}],raw:"number[]"}],raw:"number[][]",required:!0}},{key:"timeGraduationsStyles",value:{name:"Record",elements:[{name:"number"},{name:"signature",type:"object",raw:"{ width: number; color: string; opacity?: number; dashArray?: number[] }",signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"color",value:{name:"string",required:!0}},{key:"opacity",value:{name:"number",required:!1}},{key:"dashArray",value:{name:"Array",elements:[{name:"number"}],raw:"number[]",required:!1}}]}}],raw:"Record<number, LineStyle>",required:!0}}]},required:!0}},{key:"enableSnapping",value:{name:"boolean",required:!0}},{key:"hideGrid",value:{name:"boolean",required:!0}},{key:"hidePathsLabels",value:{name:"boolean",required:!0}}]},required:!0}}]}},name:"payload"}],return:{name:"void"}}},description:""}}};function je(e,n,r,[i,u,s],m,a,l=Math.ceil(m/2)){if(n.x>r.x)return je(e,r,n,[i,u,s],m);const b=e.width,k=e.height,t=r.x-n.x,p=r.y-n.y,y=Math.sqrt(t*t+p*p),v=-p/y,f=t/y,q=l,P={x:n.x+(+v-t/y)*q,y:n.y+(+f-p/y)*q},S={x:n.x+(-v-t/y)*q,y:n.y+(-f-p/y)*q},T={x:r.x+(-v+t/y)*q,y:r.y+(-f+p/y)*q},h={x:r.x+(+v+t/y)*q,y:r.y+(+f+p/y)*q},g=n.y<r.y,c=g?h:P,o=g?P:S,w=g?T:h,x=g?S:T,E=j.clamp(Math.floor(o.x),0,b),A=j.clamp(Math.ceil(w.x),0,b),C=j.clamp(Math.floor(x.y),0,k),O=j.clamp(Math.ceil(c.y),0,k);for(let I=C;I<=O;I++){const B=j.clamp(I<o.y?Math.floor(x.x+(I-x.y)*(o.x-x.x)/(o.y-x.y)):Math.floor(o.x+(I-o.y)*(o.x-c.x)/(o.y-c.y)),E,A),_=j.clamp(I<w.y?Math.ceil(x.x+(I-x.y)*(w.x-x.x)/(w.y-x.y)):Math.ceil(w.x+(I-w.y)*(w.x-c.x)/(w.y-c.y)),E,A);for(let D=B;D<=_;D++){const R=(I*b+D)*4;e.data[R+3]||(e.data[R]=i,e.data[R+1]=u,e.data[R+2]=s,e.data[R+3]=255)}}}const xe=new Map;function gn(e){const n=xe.get(e);if(n)return n;const r=e*2+1,i=new Uint8Array(r*r);for(let u=-e;u<=e;u++)for(let s=-e;s<=e;s++)if(s*s+u*u<=e*e){const a=s+e,l=u+e;i[l*r+a]=1}return xe.set(e,i),i}function cn(e,{x:n,y:r},i,[u,s,m],a){n=Math.round(n),r=Math.round(r),i=Math.ceil(i);const{width:l,height:b}=e,k=gn(i),t=i*2+1;for(let p=-i;p<=i;p++)for(let y=-i;y<=i;y++){const v=(p+i)*t+(y+i);if(k[v]===1){const f=n+y,q=r+p;if(f>=0&&f<l&&q>=0&&q<b){const P=(q*l+f)*4;e.data[P]=u,e.data[P+1]=s,e.data[P+2]=m,e.data[P+3]=255}}}}const ne=6;function vn(e,n,r,i){e.beginPath(),i?(e.moveTo(r-ne/2,n),e.lineTo(r+ne/2,n)):(e.moveTo(n,r-ne/2),e.lineTo(n,r+ne/2)),e.stroke()}const le=12;function fn(e,n,r,i,u,s){let m=u==="from"?-1:1,a=(s==="down"?-1:1)*m,l=n+4*m,b=r+(le-2)*a,k=n,t=r;i&&([m,a]=[a,m],[l,b]=[b,l],[k,t]=[t,k]),e.beginPath(),e.moveTo(k,t),e.bezierCurveTo(l,b,l,b,k+le*m,t+le*a),e.stroke()}function Pe(e,n,r,i,u,s,m){m==="out"?fn(e,n,r,i,u,s):vn(e,n,r,i)}function kn({points:e},n){if(e.length<2)return"down";for(let r=1,i=Math.min(3,e.length);r<i;r++){const u=e[r].position-e[r-1].position;if(u>0)return"up";if(u<0)return"down"}return"down"}const qn=5,hn=7,wn=.2,pe={1:{width:1.5,endWidth:1.5},2:{width:1,endWidth:1},3:{width:1,endWidth:1,dashArray:[5,5],lineCap:"square"},4:{width:1.5,endWidth:1,dashArray:[0,4],lineCap:"round"}},xn=2,Bn=({path:e,color:n,level:r=xn,pickingTolerance:i=qn})=>{const u=d.useCallback(({getTimePixel:t,getSpacePixel:p,spaceScaleTree:y,timeAxis:v,spaceAxis:f})=>{const q=[];return e.points.forEach(({position:P,time:S},T,h)=>{if(!T)q.push({[v]:t(S),[f]:p(P)});else{const{position:g,time:c}=h[T-1];Ie(g,P,y).forEach(w=>{const x=c+(w-g)/(P-g)*(S-c);q.push({[v]:t(x),[f]:p(w)})}),q.push({[v]:t(S),[f]:p(P)})}}),q},[e]),s=d.useCallback(({getTimePixel:t,getSpacePixel:p,timeAxis:y,spaceAxis:v,operationalPoints:f})=>{const q=[],P=new Set(f.map(S=>S.position));return e.points.forEach(({position:S,time:T})=>{P.has(S)&&q.push({[y]:t(T),[v]:p(S)})}),q},[e]),m=d.useCallback((t,{getTimePixel:p,getSpacePixel:y,operationalPoints:v,swapAxis:f})=>{const q=new Set(v.map(P=>P.position));e.points.forEach(({position:P,time:S},T,h)=>{if(T){const{position:g,time:c}=h[T-1];if(g===P&&q.has(P)){const o=y(P);t.beginPath(),f?(t.moveTo(o,p(c)),t.lineTo(o,p(S))):(t.moveTo(p(c),o),t.lineTo(p(S),o)),t.stroke()}}})},[e]),a=d.useCallback((t,{width:p,height:y,swapAxis:v,theme:{background:f,pathsStyles:{fontSize:q,fontFamily:P}}},S,T,h)=>{if(!S)return;const g=h.findIndex(({x:R,y:H})=>v?j.inRange(R,N,p)&&j.inRange(H,0,y):j.inRange(R,0,p)&&j.inRange(H,0,y-N));if(g<0)return;const c=h[g-1],o=h[g],w=h[g+1];let x=o,E=0;g===0?w&&(E=Math.atan2(w.y-o.y,w.x-o.x)):(v?x={y:0,x:o.x-o.y*(o.x-c.x)/(o.y-c.y)}:x={x:0,y:o.y-o.x*(o.y-c.y)/(o.x-c.x)},E=Math.atan2(o.y-x.y,o.x-x.x)),t.save(),t.translate(x.x,x.y),t.rotate(E),t.font=`${q}px ${P}`,t.textAlign="start";const A=5,C=E>=0?-5:15,O=2,I=t.measureText(S),B=I.width+2*O,D=I.actualBoundingBoxAscent+I.actualBoundingBoxDescent+2*O;t.globalAlpha=.75,t.fillStyle=f,t.fillRect(A-O,C-D+O,B,D),t.fillStyle=T,t.globalAlpha=1,t.fillText(S,A,C),t.restore()},[]),l=d.useCallback((t,{getTimePixel:p,getSpacePixel:y,swapAxis:v})=>{if(!e.points.length)return;const f=kn(e),q=e.points[0],P=e.fromEnd||fe,S=j.last(e.points),T=e.toEnd||fe;Pe(t,p(q.time),y(q.position),v,"from",f,P),Pe(t,p(S.time),y(S.position),v,"to",f,T)},[e]),b=d.useCallback((t,p)=>{t.strokeStyle=n,t.lineWidth=hn,t.globalAlpha=wn,t.lineCap="round",m(t,p);const y=pe[r];t.strokeStyle=n,t.lineWidth=y.width,t.setLineDash(y.dashArray||[]),t.globalAlpha=y.opacity||1,t.lineCap=y.lineCap||"square",t.beginPath();const v=u(p);v.forEach(({x:f,y:q},P)=>{P?t.lineTo(f,q):t.moveTo(f,q)}),t.stroke(),t.setLineDash([]),t.lineWidth=y.endWidth,l(t,p),p.hidePathsLabels||a(t,p,e.label,n,v)},[n,m,r,u,l,a,e.label]);ie("paths",b);const k=d.useCallback((t,p)=>{const{registerPickingElement:y}=p;u(p).forEach((v,f,q)=>{if(f){const P=q[f-1],S=y({type:"segment",pathId:e.id,from:P,to:v}),T=qe(ke(S));je(t,P,v,T,pe[r].width+i)}}),s(p).forEach(v=>{const f=y({type:"point",pathId:e.id,point:v}),q=qe(ke(f));cn(t,v,(pe[r].width+i)*2,q)})},[u,s,r,e.id,i]);return _e("paths",k),null},z=1e3,L=60*1e3;function re(e,n,r,i,u,s,m,a){const l=[];for(let b=0;b<s;b++){let k=m+b*i,t=n[0].position;const p={id:`${e}-${b+1}`,label:`Train ${e} ${b+1}`,points:[{position:t,time:k}],...a};n.forEach((y,v)=>{if(v){const f=n[v-1],q=y.position-f.position,P=q/u;t+=q,k+=P,p.points.push({position:t,time:k})}k+=r,p.points.push({position:t,time:k})}),l.push(p)}return l}const Z=[{id:"city-a",label:"Point A",position:0*z,importanceLevel:1},{id:"city-b",label:"Point B",position:10*z,importanceLevel:2},{id:"city-c",label:"Point C",position:60*z,importanceLevel:1},{id:"city-d",label:"Point D",position:70*z,importanceLevel:2},{id:"city-e",label:"Point E",position:90*z,importanceLevel:2},{id:"city-f",label:"Point F",position:140*z,importanceLevel:1}],Pn=Z.slice(0).reverse(),Re=[Z[0],Z[2],Z[5]],Sn=Re.slice(0).reverse(),te=new Date("2024/04/02"),Wn=[...re("omnibus",Z,3*L,30*L,80*z/(60*L),5,+te,{color:"#FF362E"}),...re("omnibus-reversed",Pn,3*L,35*L,-(80*z)/(60*L),4,+te,{color:"#FF8E3D"}),...re("fast",Re,5*L,50*L,140*z/(60*L),3,+te,{color:"#526CE8",fromEnd:"out",toEnd:"out"}),...re("fast-reversed",Sn,5*L,45*L,-(140*z)/(60*L),3,+te,{color:"#66C0F1",fromEnd:"out",toEnd:"out"})];export{On as A,de as C,Ln as E,K as H,Gn as K,M,Z as O,Wn as P,bn as S,Cn as W,Bn as a,te as b,Nn as c,ze as d,De as e,Mn as f,re as g,Fn as h,zn as i,Dn as j,ie as u};
