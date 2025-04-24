import{R as r,r as t}from"./index-DQDNmYQF.js";import{l as h}from"./index.esm-sJxuVDX9.js";/* empty css              */const W=e=>{const[x,l]=t.useState(e.toleranceValues),v=({minusTolerance:w,plusTolerance:D})=>{l({minusTolerance:w,plusTolerance:D})};return t.useEffect(()=>{e.toleranceValues&&l(e.toleranceValues)},[e.toleranceValues]),r.createElement(h,{...e,toleranceValues:x,onToleranceChange:v})},R={component:h,args:{label:"TolerancePicker",id:"time-picker"},argTypes:{toleranceValues:{minusTolerance:"number",plusTolerance:"number"}},title:"core/TolerancePicker",tags:["autodocs"],decorators:[e=>r.createElement("div",{style:{display:"flex",justifyContent:"center"}},r.createElement("div",{style:{maxWidth:"11em"}},r.createElement(e,null)))],render:W},a={args:{label:"Tolerance"}},n={args:{label:"Tolerance",narrow:!0}},o={args:{disabled:!0,label:"Tolerance"}},c={args:{toleranceValues:{minusTolerance:200,plusTolerance:600},label:"Tolerance"}},s={args:{},decorators:[e=>r.createElement("div",{style:{height:"1200px"}},r.createElement(e,null))]};var i,u,m;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    label: 'Tolerance'
  }
}`,...(m=(u=a.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var d,p,T;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    label: 'Tolerance',
    narrow: true
  }
}`,...(T=(p=n.parameters)==null?void 0:p.docs)==null?void 0:T.source}}};var g,b,k;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    disabled: true,
    label: 'Tolerance'
  }
}`,...(k=(b=o.parameters)==null?void 0:b.docs)==null?void 0:k.source}}};var S,f,y;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    toleranceValues: {
      minusTolerance: 200,
      plusTolerance: 600
    },
    label: 'Tolerance'
  }
}`,...(y=(f=c.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var P,E,V;s.parameters={...s.parameters,docs:{...(P=s.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {},
  decorators: [Story => <div style={{
    height: '1200px'
  }}>
        <Story />
      </div>]
}`,...(V=(E=s.parameters)==null?void 0:E.docs)==null?void 0:V.source}}};const _=["Default","Narrow","DisabledTolerancePicker","WarningTolerancePicker","ScrollableHeightTolerancePicker"];export{a as Default,o as DisabledTolerancePicker,n as Narrow,s as ScrollableHeightTolerancePicker,c as WarningTolerancePicker,_ as __namedExportsOrder,R as default};
