import{R as e,r as l}from"./index-DQDNmYQF.js";import{S as u}from"./index.esm-sJxuVDX9.js";/* empty css                */const p=t=>{const[s,m]=l.useState(50),[d,i]=l.useState(50);return e.createElement("div",{className:"wrapper-container"},e.createElement("div",{className:"values-container"},e.createElement("div",{className:"value-box"},"Value: ",s),e.createElement("div",{className:"value-box"},"Committed Value: ",d)),e.createElement("div",{className:"slider-container"},e.createElement(u,{value:s,onChange:r=>{m(Number(r.target.value))},onChangeCommitted:r=>{i(Number(r.currentTarget.value))},...t})))},b={component:p,args:{disabled:!1,width:112},decorators:[t=>e.createElement("div",{style:{maxWidth:"fit-content"}},e.createElement(t,null))],title:"Core/Slider",tags:["autodocs"]},a={args:{disabled:!1,width:112}};var o,n,c;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    disabled: false,
    width: 112
  }
}`,...(c=(n=a.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};const f=["Value"];export{a as Value,f as __namedExportsOrder,b as default};
