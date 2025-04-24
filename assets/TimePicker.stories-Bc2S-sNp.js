import{R as t,r}from"./index-DQDNmYQF.js";import{j as E}from"./index.esm-sJxuVDX9.js";/* empty css              */const C=e=>{const[H,c]=r.useState(e.hours),[W,m]=r.useState(e.minutes),[k,d]=r.useState(e.seconds),P=i=>{c(i.hours),m(i.minutes),d(i.seconds)};return r.useEffect(()=>{c(e.hours),m(e.minutes),d(e.seconds)},[e.hours,e.minutes,e.seconds]),t.createElement(E,{...e,hours:H,minutes:W,seconds:k,onTimeChange:P})},M={component:E,args:{disabled:!1,readOnly:!1,displaySeconds:!1},argTypes:{hours:{control:{type:"number",min:0,max:23,step:1}},minutes:{control:{type:"number",min:0,max:59,step:1}}},title:"Core/TimePicker",tags:["autodocs"],render:C},s={args:{label:"Time"},decorators:[e=>t.createElement("div",{style:{display:"flex",justifyContent:"center"}},t.createElement("div",{style:{maxWidth:"6.7rem",minHeight:"500px"}},t.createElement(e,null)))]},n={args:{label:"Time",narrow:!0},decorators:[e=>t.createElement("div",{style:{maxWidth:"6.7rem",minHeight:"500px"}},t.createElement(e,null))]},a={args:{disabled:!0,label:"Time"},decorators:[e=>t.createElement("div",{style:{maxWidth:"6.7rem",minHeight:"500px"}},t.createElement(e,null))]},o={args:{displaySeconds:!0,label:"Time"},decorators:[e=>t.createElement("div",{style:{maxWidth:"8.5rem",minHeight:"500px"}},t.createElement(e,null))]};var l,u,y;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    label: 'Time'
  },
  decorators: [Story => <div style={{
    display: 'flex',
    justifyContent: 'center'
  }}>
        <div style={{
      maxWidth: '6.7rem',
      minHeight: '500px'
    }}>
          <Story />
        </div>
      </div>]
}`,...(y=(u=s.parameters)==null?void 0:u.docs)==null?void 0:y.source}}};var S,h,g;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    label: 'Time',
    narrow: true
  },
  decorators: [Story => <div style={{
    maxWidth: '6.7rem',
    minHeight: '500px'
  }}>
        <Story />
      </div>]
}`,...(g=(h=n.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var p,x,b;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    disabled: true,
    label: 'Time'
  },
  decorators: [Story => <div style={{
    maxWidth: '6.7rem',
    minHeight: '500px'
  }}>
        <Story />
      </div>]
}`,...(b=(x=a.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var v,T,f;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    displaySeconds: true,
    label: 'Time'
  },
  decorators: [Story => <div style={{
    maxWidth: '8.5rem',
    minHeight: '500px'
  }}>
        <Story />
      </div>]
}`,...(f=(T=o.parameters)==null?void 0:T.docs)==null?void 0:f.source}}};const N=["Default","Narrow","DisabledTimePicker","TimePickerWithSeconds"];export{s as Default,a as DisabledTimePicker,n as Narrow,o as TimePickerWithSeconds,N as __namedExportsOrder,M as default};
