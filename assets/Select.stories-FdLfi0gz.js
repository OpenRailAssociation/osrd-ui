import{r as M,R as r}from"./index-RYns6xqu.js";import{c as pe}from"./index-Cm1LdsEh.js";import{F as ge}from"./FieldWrapper-sNyiQ-VR.js";/* empty css              */import"./InputStatusIcon-BgCZkodG.js";import"./index.esm-CkK1enDk.js";const O="__PLACEHOLDER__",se=({id:e,label:ne,hint:oe,value:v,options:f,placeholder:y,statusWithMessage:t,required:T,disabled:W,readOnly:E,small:q,getOptionLabel:ie,getOptionValue:s,onChange:ce,...ue})=>{const[h,b]=M.useState(v),le=a=>{const w=a.target.value===O?void 0:f.find(de=>s(de)===a.target.value);b(w),ce(w)};return M.useEffect(()=>{b(v)},[v]),r.createElement(ge,{id:e,label:ne,hint:oe,statusWithMessage:t,required:T,disabled:W,small:q},r.createElement("select",{id:e,className:pe("osrd-ui-custom-select",t==null?void 0:t.status,{"placeholder-selected":y&&!h,small:q,"read-only":E}),value:h?s(h):void 0,required:T,disabled:W||E,onChange:le,...ue},y&&r.createElement("option",{value:O},`– ${y} –`),f.map(a=>r.createElement("option",{key:s(a),value:s(a)},ie(a)))))};se.__docgenInfo={description:"",methods:[],displayName:"Select",props:{options:{required:!0,tsType:{name:"Array",elements:[{name:"T"}],raw:"Array<T>"},description:""},value:{required:!1,tsType:{name:"T"},description:""},getOptionLabel:{required:!0,tsType:{name:"signature",type:"function",raw:"(option: T) => string",signature:{arguments:[{type:{name:"T"},name:"option"}],return:{name:"string"}}},description:""},getOptionValue:{required:!0,tsType:{name:"signature",type:"function",raw:"(option: T) => string",signature:{arguments:[{type:{name:"T"},name:"option"}],return:{name:"string"}}},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(option?: T) => void",signature:{arguments:[{type:{name:"T"},name:"option"}],return:{name:"void"}}},description:""}}};const S=[{value:"blue",label:"Blue"},{value:"red",label:"Red"},{value:"green",label:"Green"}],me=e=>r.createElement(se,{...e}),We={component:me,args:{label:"Fill colour",placeholder:"Choose",value:S[0],options:S,getOptionLabel:e=>e.label,getOptionValue:e=>e.value,onChange:e=>console.log(e),small:!1,disabled:!1,readOnly:!1},decorators:[e=>r.createElement("div",{style:{maxWidth:"20rem"}},r.createElement(e,null))],title:"Core/Select",tags:["autodocs"]},n={args:{id:"Default",value:void 0}},o={args:{id:"LongText",value:void 0,placeholder:"Very very very very very very long placeholder",options:[{value:"blue",label:"Blue"},{value:"long_value",label:"Very very very very very very long value"}]}},i={args:{id:"SelectedOption",value:S[1]}},c={args:{id:"Hint",hint:"This is not a choice"}},u={args:{id:"RequiredInput",required:!0}},l={args:{id:"InformationSelect",required:!0,statusWithMessage:{status:"info",message:"This is a one way choice"}}},d={args:{id:"WarningSelect",required:!0,statusWithMessage:{status:"warning"}}},p={args:{id:"WarningWithMessageSelect",required:!0,statusWithMessage:{status:"warning",message:"This is a one way choice"}}},g={args:{id:"ErrorSelect",required:!0,statusWithMessage:{status:"error"}}},m={args:{id:"ErrorWithMessageSelect",required:!0,statusWithMessage:{status:"error",message:"This is a one way choice"}}};var L,_,x;n.parameters={...n.parameters,docs:{...(L=n.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    id: 'Default',
    value: undefined
  }
}`,...(x=(_=n.parameters)==null?void 0:_.docs)==null?void 0:x.source}}};var I,R,C;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    id: 'LongText',
    value: undefined,
    placeholder: 'Very very very very very very long placeholder',
    options: [{
      value: 'blue',
      label: 'Blue'
    }, {
      value: 'long_value',
      label: 'Very very very very very very long value'
    }]
  }
}`,...(C=(R=o.parameters)==null?void 0:R.docs)==null?void 0:C.source}}};var D,H,A;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    id: 'SelectedOption',
    value: options[1]
  }
}`,...(A=(H=i.parameters)==null?void 0:H.docs)==null?void 0:A.source}}};var V,B,F;c.parameters={...c.parameters,docs:{...(V=c.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    id: 'Hint',
    hint: 'This is not a choice'
  }
}`,...(F=(B=c.parameters)==null?void 0:B.docs)==null?void 0:F.source}}};var N,P,k;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    id: 'RequiredInput',
    required: true
  }
}`,...(k=(P=u.parameters)==null?void 0:P.docs)==null?void 0:k.source}}};var G,U,$;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    id: 'InformationSelect',
    required: true,
    statusWithMessage: {
      status: 'info',
      message: 'This is a one way choice'
    }
  }
}`,...($=(U=l.parameters)==null?void 0:U.docs)==null?void 0:$.source}}};var j,z,J;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    id: 'WarningSelect',
    required: true,
    statusWithMessage: {
      status: 'warning'
    }
  }
}`,...(J=(z=d.parameters)==null?void 0:z.docs)==null?void 0:J.source}}};var K,Q,X;p.parameters={...p.parameters,docs:{...(K=p.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    id: 'WarningWithMessageSelect',
    required: true,
    statusWithMessage: {
      status: 'warning',
      message: 'This is a one way choice'
    }
  }
}`,...(X=(Q=p.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,Z,ee;g.parameters={...g.parameters,docs:{...(Y=g.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    id: 'ErrorSelect',
    required: true,
    statusWithMessage: {
      status: 'error'
    }
  }
}`,...(ee=(Z=g.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var re,ae,te;m.parameters={...m.parameters,docs:{...(re=m.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    id: 'ErrorWithMessageSelect',
    required: true,
    statusWithMessage: {
      status: 'error',
      message: 'This is a one way choice'
    }
  }
}`,...(te=(ae=m.parameters)==null?void 0:ae.docs)==null?void 0:te.source}}};const Ee=["Default","LongText","SelectedOption","Hint","RequiredInput","InformationSelect","WarningSelect","WarningWithMessageSelect","ErrorSelect","ErrorWithMessageSelect"];export{n as Default,g as ErrorSelect,m as ErrorWithMessageSelect,c as Hint,l as InformationSelect,o as LongText,u as RequiredInput,i as SelectedOption,d as WarningSelect,p as WarningWithMessageSelect,Ee as __namedExportsOrder,We as default};
