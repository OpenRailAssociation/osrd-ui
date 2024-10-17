import{R as r}from"./index-RYns6xqu.js";import{S as u,O as o,P as O,a as d}from"./PathLayer-CqjmGShJ.js";import{X as y,Y as g}from"./main-Clr1OPIu.js";import"./lodash-CcdATr5u.js";import"./index-CHvE9HB5.js";/* empty css              */import"./index-Cm1LdsEh.js";const L=({xZoomLevel:l,yZoomLevel:t,xOffset:p,yOffset:m,spaceScaleType:c})=>r.createElement(u,{className:"inset-0 absolute",operationalPoints:o,spaceOrigin:0,spaceScales:o.slice(0,-1).map((e,f)=>({from:e.position,to:o[f+1].position,...c==="linear"?{size:50*t}:{coefficient:150/t}})),timeOrigin:+new Date("2024/04/02"),timeScale:6e4/l,xOffset:p,yOffset:m},O.map(e=>r.createElement(d,{key:e.id,path:e,color:e.color}))),v={title:"SpaceTimeChart/Rendering",component:L,argTypes:{xZoomLevel:{name:"X zoom level",description:"(in pixels/minute)",defaultValue:.4,control:{type:"range",min:.1,max:75,step:.1}},xOffset:{name:"X offset",description:"(in pixels)",defaultValue:0,control:{type:"number",step:10}},yZoomLevel:{name:"Y zoom level",options:["linear","proportional"],defaultValue:1,control:{type:"range",min:.1,max:10,step:.1}},yOffset:{name:"Y offset",description:"(in pixels)",defaultValue:0,control:{type:"number",step:10}},spaceScaleType:{name:"Space scaling type",options:["linear","proportional"],defaultValue:"linear",control:{type:"radio"}}}},a={name:"Default arguments",args:{xZoomLevel:y,yZoomLevel:g,xOffset:0,yOffset:0,spaceScaleType:"linear"}};var n,s,i;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: 'Default arguments',
  args: {
    xZoomLevel: X_ZOOM_LEVEL,
    yZoomLevel: Y_ZOOM_LEVEL,
    xOffset: 0,
    yOffset: 0,
    spaceScaleType: 'linear'
  }
}`,...(i=(s=a.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};const P=["DefaultArgs"];export{a as DefaultArgs,P as __namedExportsOrder,v as default};
