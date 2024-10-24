import{u as f,L as H,B as O,O as c,W as R,a as x,P as G,c as b,d as w,b as C,e as I}from"./useAsyncMemo-CdHsmntP.js";import{r as N,R as e}from"./index-RYns6xqu.js";import{f as U,S as j,L as v}from"./index-zQP5iNEI.js";/* empty css                    */import"./lodash-CcdATr5u.js";import"./index-BwmuJAIN.js";import"./iframe-CXcauK7T.js";import"../sb-preview/runtime.js";const m=[x],B={id:"path-layer",source:"path",type:"line",paint:{"line-width":1,"line-color":"blue"}},L=({path:n})=>{const p=f(()=>fetch(`./${n}.json`).then(T=>T.json()),[n]),a=p.type==="ready"?p.data:null,A=N.useMemo(()=>U(a?[a]:[]),[a]);return a?e.createElement("div",{key:n,style:{background:"lightgrey",display:"flex",flexDirection:"row",alignItems:"stretch",position:"absolute",inset:0}},e.createElement("div",{style:{marginRight:"1em",flexGrow:1}},e.createElement(O,{path:a,sources:m,mapStyle:c},e.createElement(j,{type:"geojson",data:A},e.createElement(v,{id:"path-layer",source:"path",type:"line",paint:{"line-width":1,"line-color":"blue"}})))),e.createElement("div",{style:{flexGrow:1}},e.createElement(R,{log:!0,path:a,pathLayer:B,sources:m,mapStyle:c}))):e.createElement(H,null)};L.__docgenInfo={description:"",methods:[],displayName:"SampleMap",props:{path:{required:!0,tsType:{name:"string"},description:""}}};const F={component:L,title:"WarpedMap/Sample Maps",argTypes:{path:{options:G,control:{type:"radio"}}}},t={name:"Short path",args:{path:b}},r={name:"Medium path",args:{path:w}},o={name:"Long path",args:{path:C}},s={name:"Longer path",args:{path:I}};var i,l,h;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: 'Short path',
  args: {
    path: PATH_SHORT
  }
}`,...(h=(l=t.parameters)==null?void 0:l.docs)==null?void 0:h.source}}};var d,u,g;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: 'Medium path',
  args: {
    path: PATH_MEDIUM
  }
}`,...(g=(u=r.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var S,y,E;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: 'Long path',
  args: {
    path: PATH_LONG
  }
}`,...(E=(y=o.parameters)==null?void 0:y.docs)==null?void 0:E.source}}};var M,P,_;s.parameters={...s.parameters,docs:{...(M=s.parameters)==null?void 0:M.docs,source:{originalSource:`{
  name: 'Longer path',
  args: {
    path: PATH_EXTRA_LONG
  }
}`,...(_=(P=s.parameters)==null?void 0:P.docs)==null?void 0:_.source}}};const J=["PathShort","PathMedium","PathLong","PathLonger"];export{o as PathLong,s as PathLonger,r as PathMedium,t as PathShort,J as __namedExportsOrder,F as default};
