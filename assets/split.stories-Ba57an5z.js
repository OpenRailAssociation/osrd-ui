import{R as t,r as T}from"./index-DQDNmYQF.js";import{u as f,a as u,M as L,S as O,P as I,p as Y,c as z}from"./theme-DmjDcwR9.js";/* empty css              */import{l as h}from"./lodash-C6rmpCuy.js";import{a as e,S as C}from"./sampleData-BMJfJTv1.js";import"./index.esm-sJxuVDX9.js";import"./index-DUfPS_J0.js";const _="#EFF3F5",P=({size:o,position:n,name:a})=>t.createElement("div",{style:{height:o,backgroundColor:_,fontWeight:"400",paddingLeft:"16px"}},Y(n)," ",a),d=({position:o})=>{const n=T.useCallback((a,{getSpacePixel:p,width:c,height:m,spaceAxis:s})=>{const l=s==="x"?c:m,S=s==="x"?m:c,r=h.clamp(p(o),0,l),i=h.clamp(p(o,!0),0,l)-r;i&&(a.fillStyle=_,s==="x"?a.fillRect(r,0,i,S):a.fillRect(0,r,S,i))},[o]);return z("overlay",n),null},y=({waypoints:o,projectPathTrainResult:n,selectedTrain:a,height:p=561,splitPoints:c=[]})=>{const m=T.useRef(null),s=T.useRef(null),l=f(n),{manchetteProps:S,spaceTimeChartProps:r,handleScroll:E}=u({waypoints:o,manchetteWithSpaceTimeChartRef:m,height:p,spaceTimeChartRef:s,splitPoints:c,defaultTimeOrigin:Math.min(...n.map(i=>+i.departureTime))});return t.createElement("div",{className:"manchette-space-time-chart-wrapper"},t.createElement("div",{ref:m,className:"manchette flex",style:{height:`${p}px`},onScroll:E},t.createElement(L,{...S}),t.createElement("div",{className:"space-time-chart-container w-full sticky",ref:s},t.createElement(O,{className:"inset-0 absolute h-full",...r},l.map(i=>t.createElement(I,{key:i.id,path:i,color:i.color,level:i.level}))))))},D={title:"Manchette with SpaceTimeChart/Split points",component:y},A={args:{waypoints:e,projectPathTrainResult:C,selectedTrain:1,splitPoints:[{id:e[2].id,position:e[2].position,size:100,spaceTimeChartNode:t.createElement(d,{position:e[2].position}),manchetteNode:t.createElement(P,{size:100,position:e[2].position,name:e[2].name})},{id:e[3].id,position:e[3].position,size:100,spaceTimeChartNode:t.createElement(d,{position:e[3].position}),manchetteNode:t.createElement(P,{size:100,position:e[3].position,name:e[3].name})},{id:e[4].id,position:e[4].position,size:200,spaceTimeChartNode:t.createElement(d,{position:e[4].position}),manchetteNode:t.createElement(P,{size:200,position:e[4].position,name:e[4].name})},{id:e[7].id,position:e[7].position,size:100,spaceTimeChartNode:t.createElement(d,{position:e[7].position}),manchetteNode:t.createElement(P,{size:100,position:e[7].position,name:e[7].name})}],scaleWithZoom:!1}};var N,M,W;A.parameters={...A.parameters,docs:{...(N=A.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    waypoints: SAMPLE_WAYPOINTS,
    projectPathTrainResult: SAMPLE_PATHS_DATA,
    selectedTrain: 1,
    splitPoints: [{
      id: SAMPLE_WAYPOINTS[2].id,
      position: SAMPLE_WAYPOINTS[2].position,
      size: 100,
      spaceTimeChartNode: <FlatStep position={SAMPLE_WAYPOINTS[2].position} />,
      manchetteNode: <SplitElement size={100} position={SAMPLE_WAYPOINTS[2].position} name={SAMPLE_WAYPOINTS[2].name} />
    }, {
      id: SAMPLE_WAYPOINTS[3].id,
      position: SAMPLE_WAYPOINTS[3].position,
      size: 100,
      spaceTimeChartNode: <FlatStep position={SAMPLE_WAYPOINTS[3].position} />,
      manchetteNode: <SplitElement size={100} position={SAMPLE_WAYPOINTS[3].position} name={SAMPLE_WAYPOINTS[3].name} />
    }, {
      id: SAMPLE_WAYPOINTS[4].id,
      position: SAMPLE_WAYPOINTS[4].position,
      size: 200,
      spaceTimeChartNode: <FlatStep position={SAMPLE_WAYPOINTS[4].position} />,
      manchetteNode: <SplitElement size={200} position={SAMPLE_WAYPOINTS[4].position} name={SAMPLE_WAYPOINTS[4].name} />
    }, {
      id: SAMPLE_WAYPOINTS[7].id,
      position: SAMPLE_WAYPOINTS[7].position,
      size: 100,
      spaceTimeChartNode: <FlatStep position={SAMPLE_WAYPOINTS[7].position} />,
      manchetteNode: <SplitElement size={100} position={SAMPLE_WAYPOINTS[7].position} name={SAMPLE_WAYPOINTS[7].name} />
    }],
    scaleWithZoom: false
  }
}`,...(W=(M=A.parameters)==null?void 0:M.docs)==null?void 0:W.source}}};const b=["Default"];export{A as Default,b as __namedExportsOrder,D as default};
