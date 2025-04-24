import{R as m,r as z}from"./index-DQDNmYQF.js";import{u as F,f as G}from"./index.esm-sJxuVDX9.js";/* empty css              */const K=[{id:"1",label:"Manuel"},{id:"2",label:"Consuela"},{id:"3",label:"Juan"},{id:"4",label:"Manolo"},{id:"5",label:"Maria"},{id:"6",label:"Jose"},{id:"7",label:"Ana"},{id:"8",label:"Pedro"},{id:"9",label:"Lucia"},{id:"10",label:"Carlos"},{id:"11",label:"Elena"},{id:"12",label:"Miguel"}],p=c=>{const[_,A]=z.useState(),d=i=>i.label,j=i=>{A(i)},k=F(K,d);return m.createElement("div",{style:{maxWidth:"20rem"}},m.createElement(G,{id:"combo-box-custom",value:_,getSuggestionLabel:d,onSelectSuggestion:j,...k,...c}))},Z={component:p,args:{small:!1,disabled:!1,readOnly:!1},render:c=>m.createElement(p,{...c}),title:"core/ComboBox",tags:["autodocs"]},e={args:{label:"Your name",type:"text",narrow:!1}},a={args:{label:"Your name",type:"text",narrow:!0}},r={args:{label:"Your name",type:"text",suggestions:[{id:"1",label:"Very very very very very very long value 1"},{id:"2",label:"Very very very very very very long value 2"}],value:{id:"1",label:"Very very very very very very long value 1"}}},t={args:{label:"Your name",type:"text",value:{id:"4",label:"Manolo"}}},s={args:{label:"Your name",type:"text",disabled:!0}},o={args:{label:"Your name",type:"text",hint:"You can type Manu to have suggestions"}},n={args:{label:"Your name",type:"text",required:!0}},l={args:{label:"Name",type:"text",required:!0,statusWithMessage:{status:"loading"}}},u={args:{label:"Name",type:"text",required:!0,small:!0}};var g,y,b;e.parameters={...e.parameters,docs:{...(g=e.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: 'Your name',
    type: 'text',
    narrow: false
  }
}`,...(b=(y=e.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var v,x,S;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    label: 'Your name',
    type: 'text',
    narrow: true
  }
}`,...(S=(x=a.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var Y,f,M;r.parameters={...r.parameters,docs:{...(Y=r.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    label: 'Your name',
    type: 'text',
    suggestions: [{
      id: '1',
      label: 'Very very very very very very long value 1'
    }, {
      id: '2',
      label: 'Very very very very very very long value 2'
    }],
    value: {
      id: '1',
      label: 'Very very very very very very long value 1'
    }
  }
}`,...(M=(f=r.parameters)==null?void 0:f.docs)==null?void 0:M.source}}};var h,V,q;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    label: 'Your name',
    type: 'text',
    value: {
      id: '4',
      label: 'Manolo'
    }
  }
}`,...(q=(V=t.parameters)==null?void 0:V.docs)==null?void 0:q.source}}};var D,w,C;s.parameters={...s.parameters,docs:{...(D=s.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    label: 'Your name',
    type: 'text',
    disabled: true
  }
}`,...(C=(w=s.parameters)==null?void 0:w.docs)==null?void 0:C.source}}};var E,I,L;o.parameters={...o.parameters,docs:{...(E=o.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    label: 'Your name',
    type: 'text',
    hint: 'You can type Manu to have suggestions'
  }
}`,...(L=(I=o.parameters)==null?void 0:I.docs)==null?void 0:L.source}}};var N,B,W;n.parameters={...n.parameters,docs:{...(N=n.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    label: 'Your name',
    type: 'text',
    required: true
  }
}`,...(W=(B=n.parameters)==null?void 0:B.docs)==null?void 0:W.source}}};var R,H,J;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    type: 'text',
    required: true,
    statusWithMessage: {
      status: 'loading'
    }
  }
}`,...(J=(H=l.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var O,P,T;u.parameters={...u.parameters,docs:{...(O=u.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    type: 'text',
    required: true,
    small: true
  }
}`,...(T=(P=u.parameters)==null?void 0:P.docs)==null?void 0:T.source}}};const $=["Default","Narrow","LongText","WithDefaultValue","Disabled","Hint","RequiredInput","LoadingInput","SmallInput"];export{e as Default,s as Disabled,o as Hint,l as LoadingInput,r as LongText,a as Narrow,n as RequiredInput,u as SmallInput,t as WithDefaultValue,$ as __namedExportsOrder,Z as default};
