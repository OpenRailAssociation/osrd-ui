import{r as le,R as e}from"./index-RYns6xqu.js";import{c as q}from"./index-Cm1LdsEh.js";import{F as pe}from"./FieldWrapper-sNyiQ-VR.js";import{u as ie}from"./useFocusByTab-DuF17kQm.js";/* empty css              */import"./InputStatusIcon-BgCZkodG.js";import"./index.esm-CkK1enDk.js";const de=40,X=({id:r,label:Z,value:$,hint:L,required:ee,disabled:x,statusWithMessage:s,maxLength:a,onChange:h,onKeyUp:se,onBlur:ae,...re})=>{const[t,te]=le.useState($),T=(t==null?void 0:t.length)||0,{handleKeyUp:oe,handleBlur:ne,isFocusByTab:ce}=ie({onBlur:ae,onKeyUp:se}),ue=A=>{te(A.target.value),h==null||h(A)};return e.createElement(pe,{id:r,label:Z,hint:L,statusWithMessage:s,disabled:x,required:ee,className:"text-area-field-wrapper"},e.createElement("div",{className:q("text-area-wrapper",{"focused-by-tab":ce})},a&&e.createElement("div",{className:q("char-count",{error:T===a,warning:a-T<=de})},T,"/",a),e.createElement("textarea",{className:q("text-area",{[(s==null?void 0:s.status)||""]:!!s}),id:r,value:t,disabled:x,maxLength:a,onChange:ue,onBlur:ne,onKeyUp:oe,...re})))};X.__docgenInfo={description:"",methods:[],displayName:"TextArea"};const fe={component:X,args:{disabled:!1,readOnly:!1,label:"Description"},decorators:[r=>e.createElement("div",{style:{maxWidth:"fit-content"}},e.createElement(r,null))],title:"Core/TextArea",tags:["autodocs"]},o={args:{value:"The light you see is this end of the tunnel."}},n={args:{hint:"Be precise and succinct"}},c={args:{maxLength:220}},u={args:{required:!0}},l={args:{value:"A good looking red train.",statusWithMessage:{status:"success"}}},p={args:{statusWithMessage:{status:"info",message:"You won’t be able to change it"}}},i={args:{value:"Blah blah blah",statusWithMessage:{status:"warning",message:"Please make it useful"}}},d={args:{value:"Blah blah blah",statusWithMessage:{status:"warning"}}},m={args:{value:"^pcds^qpdc^plsqd ^cpl qs^dpcl ^`pqsld c^`pl q",statusWithMessage:{status:"error",message:"This doesn’t make sense"}}},g={args:{value:"^pcds^qpdc^plsqd ^cpl qs^dpcl ^`pqsld c^`pl q",statusWithMessage:{status:"error"}}};var f,b,v;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    value: 'The light you see is this end of the tunnel.'
  }
}`,...(v=(b=o.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var W,E,S;n.parameters={...n.parameters,docs:{...(W=n.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    hint: 'Be precise and succinct'
  }
}`,...(S=(E=n.parameters)==null?void 0:E.docs)==null?void 0:S.source}}};var y,B,M;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    maxLength: 220
  }
}`,...(M=(B=c.parameters)==null?void 0:B.docs)==null?void 0:M.source}}};var w,R,_;u.parameters={...u.parameters,docs:{...(w=u.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    required: true
  }
}`,...(_=(R=u.parameters)==null?void 0:R.docs)==null?void 0:_.source}}};var k,N,H;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    value: 'A good looking red train.',
    statusWithMessage: {
      status: 'success'
    }
  }
}`,...(H=(N=l.parameters)==null?void 0:N.docs)==null?void 0:H.source}}};var O,C,F;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    statusWithMessage: {
      status: 'info',
      message: 'You won’t be able to change it'
    }
  }
}`,...(F=(C=p.parameters)==null?void 0:C.docs)==null?void 0:F.source}}};var I,U,V;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    value: 'Blah blah blah',
    statusWithMessage: {
      status: 'warning',
      message: 'Please make it useful'
    }
  }
}`,...(V=(U=i.parameters)==null?void 0:U.docs)==null?void 0:V.source}}};var D,K,P;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    value: 'Blah blah blah',
    statusWithMessage: {
      status: 'warning'
    }
  }
}`,...(P=(K=d.parameters)==null?void 0:K.docs)==null?void 0:P.source}}};var Y,j,z;m.parameters={...m.parameters,docs:{...(Y=m.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    value: '^pcds^qpdc^plsqd ^cpl qs^dpcl ^\`pqsld c^\`pl q',
    statusWithMessage: {
      status: 'error',
      message: 'This doesn’t make sense'
    }
  }
}`,...(z=(j=m.parameters)==null?void 0:j.docs)==null?void 0:z.source}}};var G,J,Q;g.parameters={...g.parameters,docs:{...(G=g.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    value: '^pcds^qpdc^plsqd ^cpl qs^dpcl ^\`pqsld c^\`pl q',
    statusWithMessage: {
      status: 'error'
    }
  }
}`,...(Q=(J=g.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};const be=["Value","Hint","Counter","RequiredTextArea","SuccessTextArea","InformationTextArea","WarningTextArea","WarningWithoutMessageTextArea","ErrorTextArea","ErrorWithoutMessageTextArea"];export{c as Counter,m as ErrorTextArea,g as ErrorWithoutMessageTextArea,n as Hint,p as InformationTextArea,u as RequiredTextArea,l as SuccessTextArea,o as Value,i as WarningTextArea,d as WarningWithoutMessageTextArea,be as __namedExportsOrder,fe as default};
