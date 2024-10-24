import{R as r}from"./index-RYns6xqu.js";import{X as g,Y as L}from"./utils-BdV3spGV.js";import{O as o,S as x,a as E,P as S}from"./paths-BB683TMT.js";import"./lodash-CcdATr5u.js";import"./index-CHvE9HB5.js";/* empty css              */import"./index-Cm1LdsEh.js";const _=({xZoomLevel:p,yZoomLevel:n,xOffset:m,yOffset:c,spaceScaleType:f,emptyData:t})=>{const u=t?[]:o,d=t?[]:o.slice(0,-1).map((e,O)=>({from:e.position,to:o[O+1].position,...f==="linear"?{size:50*n}:{coefficient:150/n}})),y=t?[{id:"empty-train",label:"Train with no path",color:"transparent",points:[]}]:S;return r.createElement(x,{className:"inset-0 absolute",operationalPoints:u,spaceOrigin:0,spaceScales:d,timeOrigin:+new Date("2024/04/02"),timeScale:6e4/p,xOffset:m,yOffset:c},y.map(e=>r.createElement(E,{key:e.id,path:e,color:e.color})))},A={title:"SpaceTimeChart/Rendering",component:_,argTypes:{xZoomLevel:{name:"X zoom level",description:"(in pixels/minute)",defaultValue:.4,control:{type:"range",min:.1,max:75,step:.1}},xOffset:{name:"X offset",description:"(in pixels)",defaultValue:0,control:{type:"number",step:10}},yZoomLevel:{name:"Y zoom level",options:["linear","proportional"],defaultValue:1,control:{type:"range",min:.1,max:10,step:.1}},yOffset:{name:"Y offset",description:"(in pixels)",defaultValue:0,control:{type:"number",step:10}},spaceScaleType:{name:"Space scaling type",options:["linear","proportional"],defaultValue:"linear",control:{type:"radio"}},emptyData:{name:"Use empty data",defaultValue:!1,control:{type:"boolean"}}}},a={name:"Default arguments",args:{xZoomLevel:g,yZoomLevel:L,xOffset:0,yOffset:0,spaceScaleType:"linear",emptyData:!1}};var s,l,i;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`{
  name: 'Default arguments',
  args: {
    xZoomLevel: X_ZOOM_LEVEL,
    yZoomLevel: Y_ZOOM_LEVEL,
    xOffset: 0,
    yOffset: 0,
    spaceScaleType: 'linear',
    emptyData: false
  }
}`,...(i=(l=a.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};const R=["DefaultArgs"];export{a as DefaultArgs,R as __namedExportsOrder,A as default};
