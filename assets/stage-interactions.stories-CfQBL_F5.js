import{r as S,R as l}from"./index-RYns6xqu.js";import{c as _}from"./index-Cm1LdsEh.js";import{X as d,Y as M,M as E,a as b,b as P,c as v}from"./utils-BdV3spGV.js";import{S as h,O as m,P as T,a as X}from"./paths-BB683TMT.js";import"./lodash-CcdATr5u.js";import"./index-CHvE9HB5.js";import{g as A}from"./vectors-BMNFZSin.js";const V=({xPan:f,yPan:c,xZoom:p,yZoom:u,spaceScaleType:L})=>{const[a,O]=S.useState({xOffset:0,yOffset:0,xZoomLevel:d,yZoomLevel:M,panning:null});return l.createElement("div",{className:"inset-0"},l.createElement(h,{className:_("inset-0 absolute p-0 m-0",a.panning&&"cursor-grabbing"),operationalPoints:m,spaceOrigin:0,spaceScales:m.slice(0,-1).map((t,n)=>({from:t.position,to:m[n+1].position,...L==="linear"?{size:50*a.yZoomLevel}:{coefficient:150/a.yZoomLevel}})),timeOrigin:+new Date("2024/04/02"),timeScale:6e4/a.xZoomLevel,xOffset:a.xOffset,yOffset:a.yOffset,onPan:({initialPosition:t,position:n,isPanning:o})=>{if(!f&&!c)return;const r=A(t,n);O(e=>{if(o)if(e.panning){const{initialOffset:y}=e.panning,i={...a};return f&&(i.xOffset=y.x+r.x),c&&(i.yOffset=y.y+r.y),i}else return{...e,panning:{initialOffset:{x:a.xOffset,y:a.yOffset}}};else return{...e,panning:null}})},onZoom:({delta:t,position:{x:n,y:o}})=>{!p&&!u||O(r=>{const e={...r};return p&&(e.xZoomLevel=Math.min(Math.max(e.xZoomLevel*(1+t/10),E),b),e.xOffset=n-(n-a.xOffset)/a.xZoomLevel*e.xZoomLevel),u&&(e.yZoomLevel=Math.min(Math.max(e.yZoomLevel*(1+t/10),P),v),e.yOffset=o-(o-a.yOffset)/a.yZoomLevel*e.yZoomLevel),e})}},T.map(t=>l.createElement(X,{key:t.id,path:t,color:t.color}))))},C={title:"SpaceTimeChart/Panning and zooming",component:V,argTypes:{xPan:{name:"Enable panning on the X axis?",defaultValue:!0,control:{type:"boolean"}},yPan:{name:"Enable panning on the Y axis?",defaultValue:!0,control:{type:"boolean"}},xZoom:{name:"Enable zooming on the X axis?",defaultValue:!0,control:{type:"boolean"}},yZoom:{name:"Enable zooming on the Y axis?",defaultValue:!0,control:{type:"boolean"}},spaceScaleType:{name:"Space scaling type",options:["linear","proportional"],defaultValue:"linear",control:{type:"radio"}}}},s={name:"Default arguments",args:{xPan:!0,yPan:!0,xZoom:!0,yZoom:!0,spaceScaleType:"linear"}};var x,g,Z;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: 'Default arguments',
  args: {
    xPan: true,
    yPan: true,
    xZoom: true,
    yZoom: true,
    spaceScaleType: 'linear'
  }
}`,...(Z=(g=s.parameters)==null?void 0:g.docs)==null?void 0:Z.source}}};const k=["DefaultArgs"];export{s as DefaultArgs,k as __namedExportsOrder,C as default};
