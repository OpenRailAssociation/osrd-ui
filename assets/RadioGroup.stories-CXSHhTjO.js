import{R as a}from"./index-DQDNmYQF.js";import{h as r}from"./index.esm-sJxuVDX9.js";/* empty css              */const s=e=>[{id:`${e}-banana-${Date.now()}`,label:"Banana",value:"Banana"},{id:`${e}-pear-${Date.now()}`,label:"Pear",value:"Pear"},{id:`${e}-litchee-${Date.now()}`,label:"Litchee",value:"Litchee"}],F={component:r,render:e=>a.createElement(r,{...e,options:s("doc")}),args:{small:!1,disabled:!1,readOnly:!1},tags:["autodocs"],title:"Core/RadioGroup"},n={args:{options:s("default")}},o={args:{label:"Choose a flavour",options:s("groupWithLabel")},render:e=>a.createElement(r,{...e})},t={args:{label:"Pick a flower",subtitle:"And put a smile on your face",options:[{label:"Iris",value:"Iris"},{label:"Daisy",value:"Daisy"},{label:"Tulip",value:"Tulip"}]},render:e=>a.createElement(r,{...e})},l={args:{options:[{label:"Cycling around Britany",value:"Cycling around Britany"},{label:"Discovering forgotten tracks in the Italian Alps",value:"Discovering forgotten tracks in the Italian Alps"},{label:"Visiting middle age churches",value:"Visiting middle age churches"}]},render:e=>a.createElement(r,{...e})},i={args:{label:"Choose a flavour",required:!0,options:s("required")},render:e=>a.createElement(r,{...e})},u={args:{options:s("info"),statusWithMessage:{status:"info",message:"We made this choice for you"}},render:e=>a.createElement(r,{...e})},c={args:{label:"With your beverage",required:!0,options:[{label:"Milk",value:"Milk"},{label:"Sugar",value:"Sugar"},{label:"Lemon slice",value:"Lemon slice"}],statusWithMessage:{status:"warning",message:"Lemon and coffee is a rare match"}},render:e=>a.createElement(r,{...e})},d={args:{options:[{label:"Parsley",value:"Parsley"},{label:"Chives",value:"Chives"},{label:"Garlic",value:"Garlic"}],statusWithMessage:{status:"error",message:"The Chef refuses to cook omelettes with garlic"}},render:e=>a.createElement(r,{...e})};var g,p,m;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    options: buildFruitsOptions('default')
  }
}`,...(m=(p=n.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var b,h,v;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    label: 'Choose a flavour',
    options: buildFruitsOptions('groupWithLabel')
  },
  render: currentArgs => <RadioGroup {...currentArgs} />
}`,...(v=(h=o.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var f,y,R;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    label: 'Pick a flower',
    subtitle: 'And put a smile on your face',
    options: [{
      label: 'Iris',
      value: 'Iris'
    }, {
      label: 'Daisy',
      value: 'Daisy'
    }, {
      label: 'Tulip',
      value: 'Tulip'
    }]
  },
  render: currentArgs => <RadioGroup {...currentArgs} />
}`,...(R=(y=t.parameters)==null?void 0:y.docs)==null?void 0:R.source}}};var A,C,G;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    options: [{
      label: 'Cycling around Britany',
      value: 'Cycling around Britany'
    }, {
      label: 'Discovering forgotten tracks in the Italian Alps',
      value: 'Discovering forgotten tracks in the Italian Alps'
    }, {
      label: 'Visiting middle age churches',
      value: 'Visiting middle age churches'
    }]
  },
  render: currentArgs => <RadioGroup {...currentArgs} />
}`,...(G=(C=l.parameters)==null?void 0:C.docs)==null?void 0:G.source}}};var L,W,B;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    label: 'Choose a flavour',
    required: true,
    options: buildFruitsOptions('required')
  },
  render: currentArgs => <RadioGroup {...currentArgs} />
}`,...(B=(W=i.parameters)==null?void 0:W.docs)==null?void 0:B.source}}};var D,k,S;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    options: buildFruitsOptions('info'),
    statusWithMessage: {
      status: 'info',
      message: 'We made this choice for you'
    }
  },
  render: currentArgs => <RadioGroup {...currentArgs} />
}`,...(S=(k=u.parameters)==null?void 0:k.docs)==null?void 0:S.source}}};var w,E,M;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    label: 'With your beverage',
    required: true,
    options: [{
      label: 'Milk',
      value: 'Milk'
    }, {
      label: 'Sugar',
      value: 'Sugar'
    }, {
      label: 'Lemon slice',
      value: 'Lemon slice'
    }],
    statusWithMessage: {
      status: 'warning',
      message: 'Lemon and coffee is a rare match'
    }
  },
  render: currentArgs => <RadioGroup {...currentArgs} />
}`,...(M=(E=c.parameters)==null?void 0:E.docs)==null?void 0:M.source}}};var O,q,I;d.parameters={...d.parameters,docs:{...(O=d.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    options: [{
      label: 'Parsley',
      value: 'Parsley'
    }, {
      label: 'Chives',
      value: 'Chives'
    }, {
      label: 'Garlic',
      value: 'Garlic'
    }],
    statusWithMessage: {
      status: 'error',
      message: 'The Chef refuses to cook omelettes with garlic'
    }
  },
  render: currentArgs => <RadioGroup {...currentArgs} />
}`,...(I=(q=d.parameters)==null?void 0:q.docs)==null?void 0:I.source}}};const V=["Default","GroupWithLabel","GroupLabelCaption","LabelOverflow","RequiredRadioButton","InfoRadioButton","WarningRadioButton","ErrorRadioButton"];export{n as Default,d as ErrorRadioButton,t as GroupLabelCaption,o as GroupWithLabel,u as InfoRadioButton,l as LabelOverflow,i as RequiredRadioButton,c as WarningRadioButton,V as __namedExportsOrder,F as default};
