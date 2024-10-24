import{r as o,R as l}from"./index-RYns6xqu.js";/* empty css              */import{X as qe,i as Ce}from"./index.esm-CkK1enDk.js";import{c as B}from"./index-Cm1LdsEh.js";import{I as ke}from"./Input-DeArfgXO.js";import"./FieldWrapper-sNyiQ-VR.js";import"./InputStatusIcon-BgCZkodG.js";import"./useFocusByTab-DuF17kQm.js";const p=a=>a.normalize("NFD").replace(/[\u0300-\u036f]/g,""),ye=({suggestions:a,onChange:c,getSuggestionLabel:r,customLabel:A,numberOfSuggestionsToShow:fe=5,exactSearch:M=!1,value:y="",small:R,onSelectSuggestion:n,disableDefaultFilter:W=!1,...w})=>{const[f,u]=o.useState([]),[E,V]=o.useState(-1),[z,i]=o.useState(y),[Y,g]=o.useState(null),[ge,L]=o.useState(!1),v=o.useRef(null),m=o.useMemo(()=>W?a:[...a].sort((e,t)=>r(e).localeCompare(r(t))),[a,r,W]),ve=ge&&f.length>0&&!w.disabled,O=()=>{var e;return(e=v.current)==null?void 0:e.focus()},be=()=>{i(""),v.current&&(v.current.value=""),g(null),n==null||n(void 0);const e={target:{value:""},currentTarget:{value:""}};c==null||c(e),O()},Re=[...Y||a.some(e=>r(e)===y)?[{icon:l.createElement(qe,{size:R?"sm":"lg"}),action:be,className:"clear-icon"}]:[],...m.length>0?[{icon:l.createElement(Ce,{size:R?"sm":"lg"}),action:O,className:B("chevron-icon",{disabled:w.disabled})}]:[]];o.useEffect(()=>{y?i(y):(i(""),g(null),n==null||n(void 0))},[y]),o.useEffect(()=>{u(m)},[m]);const we=e=>{const t=p(e.currentTarget.value).trim();if(i(e.currentTarget.value),c==null||c(e),t.trim()===""){u([]),g(null);return}const s=m.filter(d=>{const b=p(r(d).toLowerCase());return M?b.startsWith(t.toLowerCase()):b.includes(t.toLowerCase())});u(s)},F=e=>{const t=f[e],s=r(t);i(s),g(t),n==null||n(t),u([]),V(-1),setTimeout(()=>{var d;(d=v.current)==null||d.blur()},0)},xe=e=>{e.key==="ArrowDown"?V(t=>t<f.length-1?t+1:t):e.key==="ArrowUp"?V(t=>t>0?t-1:t):(e.key==="Enter"||e.key==="Tab")&&E>=0?F(E):e.key==="Escape"&&u([])},Ne=e=>{e.stopPropagation(),L(!0);const t=p(e.currentTarget.value.trim().toLowerCase());if(t){const s=m.filter(d=>{const b=p(r(d).toLowerCase());return M?b.startsWith(t):b.includes(t)});u(s)}else u(m)},Ie=()=>{L(!1);const e=p(z.trim().toLowerCase()),t=a.some(s=>p(r(s).toLowerCase())===e);f.length===1?F(0):!t&&Y?i(r(Y)):t||(i(""),g(null)),u([])},Te=e=>{F(e)};return l.createElement("div",{className:"combo-box",style:{"--number-of-suggestions":fe},onBlur:Ie},A&&l.createElement("label",{htmlFor:w.id},A),l.createElement(ke,{...w,ref:v,value:z,onChange:we,onKeyDown:xe,onFocus:Ne,withIcons:Re,small:R}),ve&&l.createElement("ul",{className:"suggestions-list"},f.map((e,t)=>l.createElement("li",{key:`${r(e)}-${t}`,className:B("suggestion-item",{active:t===E,small:R}),onClick:()=>Te(t),onMouseDown:s=>s.preventDefault()},r(e)))))};ye.__docgenInfo={description:"",methods:[],displayName:"ComboBox",props:{leadingContent:{required:!1,tsType:{name:"union",raw:"InputAffixContent | InputAffixContentWithCallback",elements:[{name:"union",raw:"string | React.ReactNode",elements:[{name:"string"},{name:"ReactReactNode",raw:"React.ReactNode"}]},{name:"signature",type:"object",raw:`{
  content: string | React.ReactNode;
  onClickCallback: () => void;
}`,signature:{properties:[{key:"content",value:{name:"union",raw:"string | React.ReactNode",elements:[{name:"string"},{name:"ReactReactNode",raw:"React.ReactNode"}],required:!0}},{key:"onClickCallback",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}}]},description:""},trailingContent:{required:!1,tsType:{name:"union",raw:"InputAffixContent | InputAffixContentWithCallback",elements:[{name:"union",raw:"string | React.ReactNode",elements:[{name:"string"},{name:"ReactReactNode",raw:"React.ReactNode"}]},{name:"signature",type:"object",raw:`{
  content: string | React.ReactNode;
  onClickCallback: () => void;
}`,signature:{properties:[{key:"content",value:{name:"union",raw:"string | React.ReactNode",elements:[{name:"string"},{name:"ReactReactNode",raw:"React.ReactNode"}],required:!0}},{key:"onClickCallback",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}}]},description:""},inputFieldWrapperClassname:{required:!1,tsType:{name:"string"},description:""},withIcons:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  icon: React.ReactNode;
  action: () => void;
  className?: string;
}`,signature:{properties:[{key:"icon",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0}},{key:"action",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}},{key:"className",value:{name:"string",required:!1}}]}}],raw:"IconConfig[]"},description:""},suggestions:{required:!0,tsType:{name:"Array",elements:[{name:"T"}],raw:"Array<T>"},description:""},getSuggestionLabel:{required:!0,tsType:{name:"signature",type:"function",raw:"(option: T) => string",signature:{arguments:[{type:{name:"T"},name:"option"}],return:{name:"string"}}},description:""},customLabel:{required:!1,tsType:{name:"ReactNode"},description:""},numberOfSuggestionsToShow:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"5",computed:!1}},exactSearch:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},value:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},onSelectSuggestion:{required:!1,tsType:{name:"signature",type:"function",raw:"(option: T | undefined) => void",signature:{arguments:[{type:{name:"union",raw:"T | undefined",elements:[{name:"T"},{name:"undefined"}]},name:"option"}],return:{name:"void"}}},description:""},disableDefaultFilter:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const he=[{id:"1",label:"Manuel"},{id:"2",label:"Consuela"},{id:"3",label:"Juan"},{id:"4",label:"Manolo"}],ze={component:ye,args:{small:!1,disabled:!1,readOnly:!1,onChange:()=>{},onSelectSuggestion:()=>{},getSuggestionLabel:a=>a.label,suggestions:he},decorators:[a=>l.createElement("div",{style:{maxWidth:"20rem"}},l.createElement(a,null))],title:"core/ComboBox",tags:["autodocs"]},x={args:{label:"Your name",type:"text",defaultValue:""}},N={args:{label:"Your name",type:"text",suggestions:[{id:"1",label:"Very very very very very very long value 1"},{id:"2",label:"Very very very very very very long value 2"}],value:"Very very very very very very long value 1"}},I={args:{label:"Your name",type:"text",value:"Manolo"}},T={args:{label:"Your name",type:"text",disabled:!0}},q={args:{label:"Your name",type:"text",hint:"You can type Manu to have suggestions"}},C={args:{label:"Your name",type:"text",required:!0}},k={args:{label:"Name",type:"text",required:!0,statusWithMessage:{status:"loading"}}},h={args:{label:"Name",type:"text",required:!0,small:!0}},D={args:{label:"Name",type:"text",disableDefaultFilter:!0}};var _,j,H;x.parameters={...x.parameters,docs:{...(_=x.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    label: 'Your name',
    type: 'text',
    defaultValue: ''
  }
}`,...(H=(j=x.parameters)==null?void 0:j.docs)==null?void 0:H.source}}};var K,X,$;N.parameters={...N.parameters,docs:{...(K=N.parameters)==null?void 0:K.docs,source:{originalSource:`{
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
    value: 'Very very very very very very long value 1'
  }
}`,...($=(X=N.parameters)==null?void 0:X.docs)==null?void 0:$.source}}};var J,U,G;I.parameters={...I.parameters,docs:{...(J=I.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    label: 'Your name',
    type: 'text',
    value: 'Manolo'
  }
}`,...(G=(U=I.parameters)==null?void 0:U.docs)==null?void 0:G.source}}};var Q,Z,P;T.parameters={...T.parameters,docs:{...(Q=T.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    label: 'Your name',
    type: 'text',
    disabled: true
  }
}`,...(P=(Z=T.parameters)==null?void 0:Z.docs)==null?void 0:P.source}}};var S,ee,te;q.parameters={...q.parameters,docs:{...(S=q.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    label: 'Your name',
    type: 'text',
    hint: 'You can type Manu to have suggestions'
  }
}`,...(te=(ee=q.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var ae,re,ne;C.parameters={...C.parameters,docs:{...(ae=C.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    label: 'Your name',
    type: 'text',
    required: true
  }
}`,...(ne=(re=C.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};var se,oe,le;k.parameters={...k.parameters,docs:{...(se=k.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    type: 'text',
    required: true,
    statusWithMessage: {
      status: 'loading'
    }
  }
}`,...(le=(oe=k.parameters)==null?void 0:oe.docs)==null?void 0:le.source}}};var ue,ie,ce;h.parameters={...h.parameters,docs:{...(ue=h.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    type: 'text',
    required: true,
    small: true
  }
}`,...(ce=(ie=h.parameters)==null?void 0:ie.docs)==null?void 0:ce.source}}};var me,de,pe;D.parameters={...D.parameters,docs:{...(me=D.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    type: 'text',
    disableDefaultFilter: true
  }
}`,...(pe=(de=D.parameters)==null?void 0:de.docs)==null?void 0:pe.source}}};const Le=["Default","LongText","WithDefaultValue","Disabled","Hint","RequiredInput","LoadingInput","SmallInput","DisabledDefaultFilter"];export{x as Default,T as Disabled,D as DisabledDefaultFilter,q as Hint,k as LoadingInput,N as LongText,C as RequiredInput,h as SmallInput,I as WithDefaultValue,Le as __namedExportsOrder,ze as default};
