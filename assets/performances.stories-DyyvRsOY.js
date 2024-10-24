import{r as u,R as O}from"./index-RYns6xqu.js";import{c as C}from"./index-Cm1LdsEh.js";import{l as g}from"./lodash-CcdATr5u.js";import{X as D,Y as T,z as b}from"./utils-BdV3spGV.js";import{g as Z,S as _,M as l,a as R,K as V}from"./paths-BB683TMT.js";import"./index-CHvE9HB5.js";import{g as A}from"./vectors-BMNFZSin.js";/* empty css              */const L=+new Date("2024/01/01"),S=["#9E8256","#FF362E","#FF8E3D","#FFBF00","#95C877","#78E6C5","#66C0F1","#526CE8","#D16DBC","#FF9BC6"],z=({operationalPointsCount:m,trainTypes:c,pathsPerTrain:E,spaceScaleType:h})=>{const n=u.useMemo(()=>{let e=0;return g.range(m).map(t=>({id:`op-${t}`,label:`Operational point n°${t+1}`,position:e+=g.random(5e4,15e4),importanceLevel:!t||t===m-1||Math.random()>.8?1:2}))},[m]),v=u.useMemo(()=>{const e=n,t=e.filter(o=>o.importanceLevel===1),f=e.slice(0).reverse(),r=t.slice(0).reverse();return g.range(c).flatMap(o=>{const s=o%2,i=Math.floor(o/2)%2,F=(100+100*(Math.floor(o/2)/Math.floor(c/2)))*V/(60*l);return Z(`type n°${o}`,i?s?f:e:s?r:t,5*l,(30+o*5)*l,F*(s?-1:1),E,L,{color:S[o%S.length],fromEnd:i?"out":"stop",toEnd:i?"out":"stop"})})},[n,c,E]),[a,d]=u.useState({xOffset:0,yOffset:0,xZoomLevel:D,yZoomLevel:T,panning:null});return O.createElement("div",{className:"inset-0"},O.createElement(_,{className:C("inset-0 absolute p-0 m-0",a.panning&&"cursor-grabbing"),operationalPoints:n,spaceOrigin:0,spaceScales:n.slice(0,-1).map((e,t)=>({from:e.position,to:n[t+1].position,...h==="linear"?{size:50*a.yZoomLevel}:{coefficient:150/a.yZoomLevel}})),timeOrigin:L,timeScale:l/a.xZoomLevel,xOffset:a.xOffset,yOffset:a.yOffset,onPan:({initialPosition:e,position:t,isPanning:f})=>{const{panning:r}=a,o=A(e,t);d(s=>{if(f)if(r){const i=r.initialOffset.x+o.x,y=r.initialOffset.y+o.y;return{...a,xOffset:i,yOffset:y}}else return{...s,panning:{initialOffset:{x:a.xOffset,y:a.yOffset}}};else return{...s,panning:null}})},onZoom:e=>{d(t=>({...t,...b(a,e)}))}},v.map(e=>O.createElement(R,{key:e.id,path:e,color:e.color}))))},U={title:"SpaceTimeChart/Performances",component:z,argTypes:{operationalPointsCount:{name:"Operational points",defaultValue:5,control:{type:"number",step:1,min:2,max:30}},trainTypes:{name:"Train types",defaultValue:4,control:{type:"number",step:1,min:1,max:20}},pathsPerTrain:{name:"Paths per train type",defaultValue:50,control:{type:"number",step:10,min:0,max:200}},spaceScaleType:{name:"Space scaling type",options:["linear","proportional"],defaultValue:"linear",control:{type:"radio"}}}},p={name:"Default arguments",args:{operationalPointsCount:5,trainTypes:4,pathsPerTrain:50,spaceScaleType:"linear"}};var x,M,P;p.parameters={...p.parameters,docs:{...(x=p.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: 'Default arguments',
  args: {
    operationalPointsCount: 5,
    trainTypes: 4,
    pathsPerTrain: 50,
    spaceScaleType: 'linear'
  }
}`,...(P=(M=p.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};const W=["DefaultArgs"];export{p as DefaultArgs,W as __namedExportsOrder,U as default};
