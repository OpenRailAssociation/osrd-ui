import{R as e}from"./index-RYns6xqu.js";import{a as ee,n as p,q as ae,g as re,$ as ne}from"./index.esm-CkK1enDk.js";/* empty css              */import{c as se}from"./index-Cm1LdsEh.js";const U=({label:d,variant:W="Primary",isLoading:a=!1,isDisabled:g=!1,leadingIcon:b=null,counter:v=null,size:Y="large",onClick:f,...C})=>{const Z=()=>{!a&&!g&&f&&f()};return e.createElement("button",{...C,className:se("button flex items-center",C.className,W.toLowerCase(),Y.toLowerCase(),{loading:a}),onClick:Z,disabled:g||a},a?e.createElement("span",{className:"icon"},e.createElement(ee,{variant:"fill",size:"lg"})):e.createElement(e.Fragment,null,b&&e.createElement("span",{className:"leading-icon mr-2"},b),d,v!==null&&e.createElement("span",{className:"counter ml-2"},v)))};U.__docgenInfo={description:"",methods:[],displayName:"Button",props:{label:{required:!0,tsType:{name:"string"},description:""},variant:{required:!1,tsType:{name:"union",raw:"'Normal' | 'Cancel' | 'Quiet' | 'Destructive' | 'Primary'",elements:[{name:"literal",value:"'Normal'"},{name:"literal",value:"'Cancel'"},{name:"literal",value:"'Quiet'"},{name:"literal",value:"'Destructive'"},{name:"literal",value:"'Primary'"}]},description:"",defaultValue:{value:"'Primary'",computed:!1}},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isDisabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},leadingIcon:{required:!1,tsType:{name:"ReactNode"},description:"",defaultValue:{value:"null",computed:!1}},counter:{required:!1,tsType:{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}]},description:"",defaultValue:{value:"null",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'large' | 'medium' | 'small'",elements:[{name:"literal",value:"'large'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'small'"}]},description:"",defaultValue:{value:"'large'",computed:!1}},onClick:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const y={archive:e.createElement(p,null),bookmark:e.createElement(ae,null),cloud:e.createElement(re,null),clock:e.createElement(ne,null)},ie={component:U,title:"Core/Button",tags:["autodocs"],argTypes:{leadingIcon:{options:Object.keys(y),mapping:y,control:{type:"select",labels:{Archive:"Archive",Bookmark:"Bookmark",Cloud:"Cloud",Clock:"Clock"}}}}},r={args:{label:"Click me"}},n={args:{label:"Loading",isLoading:!0}},s={args:{label:"Disabled",isDisabled:!0}},t={args:{label:"Counter",counter:5}},l={args:{label:"Quiet",variant:"Quiet"}},o={args:{label:"Destructive",variant:"Destructive"}},c={args:{label:"Cancel",variant:"Cancel"}},i={args:{label:"Leading Icon",leadingIcon:e.createElement(p,null)}},u={args:{label:"Leading Icon Counter",leadingIcon:e.createElement(p,null),counter:5}},m={args:{label:"Generic properties",type:"button",className:"my-super-class",onMouseEnter:d=>console.log("mouve enter",d)}};var D,E,k;r.parameters={...r.parameters,docs:{...(D=r.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    label: 'Click me'
  }
}`,...(k=(E=r.parameters)==null?void 0:E.docs)==null?void 0:k.source}}};var I,L,N;n.parameters={...n.parameters,docs:{...(I=n.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    label: 'Loading',
    isLoading: true
  }
}`,...(N=(L=n.parameters)==null?void 0:L.docs)==null?void 0:N.source}}};var S,q,T;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    label: 'Disabled',
    isDisabled: true
  }
}`,...(T=(q=s.parameters)==null?void 0:q.docs)==null?void 0:T.source}}};var Q,h,B;t.parameters={...t.parameters,docs:{...(Q=t.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    label: 'Counter',
    counter: 5
  }
}`,...(B=(h=t.parameters)==null?void 0:h.docs)==null?void 0:B.source}}};var w,P,V;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    label: 'Quiet',
    variant: 'Quiet'
  }
}`,...(V=(P=l.parameters)==null?void 0:P.docs)==null?void 0:V.source}}};var x,G,_;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    label: 'Destructive',
    variant: 'Destructive'
  }
}`,...(_=(G=o.parameters)==null?void 0:G.docs)==null?void 0:_.source}}};var A,R,z;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    label: 'Cancel',
    variant: 'Cancel'
  }
}`,...(z=(R=c.parameters)==null?void 0:R.docs)==null?void 0:z.source}}};var M,O,$;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    label: 'Leading Icon',
    leadingIcon: <Archive />
  }
}`,...($=(O=i.parameters)==null?void 0:O.docs)==null?void 0:$.source}}};var j,F,X;u.parameters={...u.parameters,docs:{...(j=u.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    label: 'Leading Icon Counter',
    leadingIcon: <Archive />,
    counter: 5
  }
}`,...(X=(F=u.parameters)==null?void 0:F.docs)==null?void 0:X.source}}};var H,J,K;m.parameters={...m.parameters,docs:{...(H=m.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    label: 'Generic properties',
    type: 'button',
    className: 'my-super-class',
    // eslint-disable-next-line no-console
    onMouseEnter: e => console.log('mouve enter', e)
  }
}`,...(K=(J=m.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};const ue=["Default","Loading","Disabled","Counter","Quiet","Destructive","Cancel","LeadingIcon","LeadingIconCounter","GenericButtonProps"];export{c as Cancel,t as Counter,r as Default,o as Destructive,s as Disabled,m as GenericButtonProps,i as LeadingIcon,u as LeadingIconCounter,n as Loading,l as Quiet,ue as __namedExportsOrder,ie as default};
