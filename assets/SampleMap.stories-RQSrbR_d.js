import{u as f,f as H,L as O,B as R,O as c,a as x,S as G,b,W as w,c as C,d as I,e as N,P as U,h as j}from"./useAsyncMemo-T1SEZiT6.js";import{r as v,R as e}from"./index-DQDNmYQF.js";import"./lodash-C6rmpCuy.js";import"./iframe-CnBfpWl0.js";import"./index-C8KIgodY.js";import"./index-DrriUsT5.js";const m=[x],B={id:"path-layer",source:"path",type:"line",paint:{"line-width":1,"line-color":"blue"}},L=({path:n})=>{const p=f(()=>fetch(`./${n}.json`).then(T=>T.json()),[n]),a=p.type==="ready"?p.data:null,A=v.useMemo(()=>H(a?[a]:[]),[a]);return a?e.createElement("div",{key:n,style:{background:"lightgrey",display:"flex",flexDirection:"row",alignItems:"stretch",position:"absolute",inset:0}},e.createElement("div",{style:{marginRight:"1em",flexGrow:1}},e.createElement(R,{path:a,sources:m,mapStyle:c},e.createElement(G,{type:"geojson",data:A},e.createElement(b,{id:"path-layer",source:"path",type:"line",paint:{"line-width":1,"line-color":"blue"}})))),e.createElement("div",{style:{flexGrow:1}},e.createElement(w,{log:!0,path:a,pathLayer:B,sources:m,mapStyle:c}))):e.createElement(O,null)};L.__docgenInfo={description:"",methods:[],displayName:"SampleMap",props:{path:{required:!0,tsType:{name:"string"},description:""}}};const $={component:L,title:"WarpedMap/Sample Maps",argTypes:{path:{options:C,control:{type:"radio"}}}},t={name:"Short path",args:{path:I}},r={name:"Medium path",args:{path:N}},s={name:"Long path",args:{path:U}},o={name:"Longer path",args:{path:j}};var i,l,h;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: 'Short path',
  args: {
    path: PATH_SHORT
  }
}`,...(h=(l=t.parameters)==null?void 0:l.docs)==null?void 0:h.source}}};var d,u,g;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: 'Medium path',
  args: {
    path: PATH_MEDIUM
  }
}`,...(g=(u=r.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var S,y,E;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: 'Long path',
  args: {
    path: PATH_LONG
  }
}`,...(E=(y=s.parameters)==null?void 0:y.docs)==null?void 0:E.source}}};var M,P,_;o.parameters={...o.parameters,docs:{...(M=o.parameters)==null?void 0:M.docs,source:{originalSource:`{
  name: 'Longer path',
  args: {
    path: PATH_EXTRA_LONG
  }
}`,...(_=(P=o.parameters)==null?void 0:P.docs)==null?void 0:_.source}}};const z=["PathShort","PathMedium","PathLong","PathLonger"];export{s as PathLong,o as PathLonger,r as PathMedium,t as PathShort,z as __namedExportsOrder,$ as default};
