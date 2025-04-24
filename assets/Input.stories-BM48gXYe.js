import{R as e,r as Pe}from"./index-DQDNmYQF.js";import{I as Ae,g as He,X as De}from"./index.esm-sJxuVDX9.js";/* empty css              */const je={component:Ae,args:{small:!1,disabled:!1,readOnly:!1,narrow:!1},decorators:[t=>e.createElement("div",{style:{maxWidth:"20rem"}},e.createElement(t,null))],title:"Core/Input",tags:["autodocs"]},a={args:{label:"Your name",type:"text"}},r={args:{label:"Your name",type:"text",value:"Manuel"}},s={args:{label:"Your name",type:"text",value:"Manuel",hint:"It doesn't have to be real"}},n={args:{label:"Price",type:"number",leadingContent:"£"},decorators:[t=>e.createElement("div",{style:{maxWidth:"10rem"}},e.createElement(t,null))]},o={args:{label:"Price",type:"number",trailingContent:"€"},decorators:[t=>e.createElement("div",{style:{maxWidth:"10rem"}},e.createElement(t,null))]},u={args:{label:"Price",type:"number",leadingContent:"Minimum",trailingContent:"Km/h"}},l={args:{label:"Your name",type:"text",required:!0}},i={args:{label:"Name",type:"text",required:!0,value:"Manuel",statusWithMessage:{status:"loading"}}},c={args:{label:"Your name",type:"text",required:!0,value:"jean-michel.halleurt@exemple.fr",statusWithMessage:{status:"success"}}},p={args:{label:"Name",type:"text",required:!0,value:"Jean-Michel Halleurt",statusWithMessage:{status:"info",message:"You won’t be able to change it"}}},m={args:{label:"Your name",type:"text",required:!0,value:"Jean-Michel Halleurt",statusWithMessage:{status:"warning",message:"Don’t be a troll, please"}}},g={args:{label:"Your name",type:"text",required:!0,value:"Jean-Michel Halleurt",statusWithMessage:{status:"warning"}}},d={args:{label:"Name",type:"text",required:!0,value:"Michel Sardou",statusWithMessage:{status:"error",message:"“Michel Sardou” can’t be used"}}},h={args:{label:"Name",type:"text",required:!0,value:"Michel Sardou",statusWithMessage:{tooltip:"right",status:"error",message:"“Michel Sardou” can’t be used"}}},b={args:{label:"Name",type:"text",value:"This is a narrow input",statusWithMessage:{status:"warning",message:"My wrapper doesn't have any padding. Don't use me with 'required' or 'statusWithMessage' with no tooltip."},narrow:!0}},M={args:{label:"Name",type:"text",required:!0,value:"Michel Sardou"},decorators:[function(Je,ze){const[Be,Le]=Pe.useState({tooltip:"right",status:"info",message:"“Michel Sardou” can’t be used"});return e.createElement(Je,{args:{...ze.args,statusWithMessage:Be,onCloseStatusMessage:()=>Le(void 0)}})}]},y={decorators:[t=>e.createElement("div",{style:{display:"flex",flexDirection:"row",gap:"20px"}},e.createElement(t,{args:{label:"Name",type:"text",value:"Michel Sardou",statusWithMessage:{tooltip:"left",status:"error",message:"Michel Sardou can’t be used"}}}),e.createElement(t,{args:{label:"Name",type:"text",value:"Jean-Michel Halleurt",statusWithMessage:{tooltip:"right",status:"error",message:"Jean-Michel Halleurt can’t be used"}}}))]},v={args:{label:"Name",type:"text",required:!0,value:"Michel Sardou",statusWithMessage:{status:"error"}}},S={args:{label:"Your name",type:"text",value:"Manuel",withIcons:[{icon:e.createElement(He,{size:"lg"}),action:()=>{},className:"chevron-icon"}]}},x={args:{label:"Your name",type:"text",value:"Hubert Blaine Wolfeschlegelsteinhausenbergerdorff Sr",withIcons:[{icon:e.createElement(De,{size:"lg"}),action:()=>{},className:"chevron-icon"}]}},W={args:{label:"Your name",type:"text",value:"Hubert Blaine Wolfeschlegelsteinhausenbergerdorff Sr",withIcons:[{icon:e.createElement(De,{size:"lg"}),action:()=>{},className:"chevron-icon"},{icon:e.createElement(He,{size:"lg"}),action:()=>{},className:"chevron-icon"}]}};var I,f,w;a.parameters={...a.parameters,docs:{...(I=a.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    label: 'Your name',
    type: 'text'
  }
}`,...(w=(f=a.parameters)==null?void 0:f.docs)==null?void 0:w.source}}};var N,C,q;r.parameters={...r.parameters,docs:{...(N=r.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    label: 'Your name',
    type: 'text',
    value: 'Manuel'
  }
}`,...(q=(C=r.parameters)==null?void 0:C.docs)==null?void 0:q.source}}};var E,Y,T;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    label: 'Your name',
    type: 'text',
    value: 'Manuel',
    hint: "It doesn't have to be real"
  }
}`,...(T=(Y=s.parameters)==null?void 0:Y.docs)==null?void 0:T.source}}};var H,D,J;n.parameters={...n.parameters,docs:{...(H=n.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    label: 'Price',
    type: 'number',
    leadingContent: '£'
  },
  decorators: [Story => <div style={{
    maxWidth: '10rem'
  }}>
        <Story />
      </div>]
}`,...(J=(D=n.parameters)==null?void 0:D.docs)==null?void 0:J.source}}};var z,B,L;o.parameters={...o.parameters,docs:{...(z=o.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    label: 'Price',
    type: 'number',
    trailingContent: '€'
  },
  decorators: [Story => <div style={{
    maxWidth: '10rem'
  }}>
        <Story />
      </div>]
}`,...(L=(B=o.parameters)==null?void 0:B.docs)==null?void 0:L.source}}};var P,A,R;u.parameters={...u.parameters,docs:{...(P=u.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    label: 'Price',
    type: 'number',
    leadingContent: 'Minimum',
    trailingContent: 'Km/h'
  }
}`,...(R=(A=u.parameters)==null?void 0:A.docs)==null?void 0:R.source}}};var V,X,j;l.parameters={...l.parameters,docs:{...(V=l.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    label: 'Your name',
    type: 'text',
    required: true
  }
}`,...(j=(X=l.parameters)==null?void 0:X.docs)==null?void 0:j.source}}};var K,O,_;i.parameters={...i.parameters,docs:{...(K=i.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    type: 'text',
    required: true,
    value: 'Manuel',
    statusWithMessage: {
      status: 'loading'
    }
  }
}`,...(_=(O=i.parameters)==null?void 0:O.docs)==null?void 0:_.source}}};var k,F,G;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    label: 'Your name',
    type: 'text',
    required: true,
    value: 'jean-michel.halleurt@exemple.fr',
    statusWithMessage: {
      status: 'success'
    }
  }
}`,...(G=(F=c.parameters)==null?void 0:F.docs)==null?void 0:G.source}}};var Q,U,Z;p.parameters={...p.parameters,docs:{...(Q=p.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    type: 'text',
    required: true,
    value: 'Jean-Michel Halleurt',
    statusWithMessage: {
      status: 'info',
      message: 'You won’t be able to change it'
    }
  }
}`,...(Z=(U=p.parameters)==null?void 0:U.docs)==null?void 0:Z.source}}};var $,ee,te;m.parameters={...m.parameters,docs:{...($=m.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    label: 'Your name',
    type: 'text',
    required: true,
    value: 'Jean-Michel Halleurt',
    statusWithMessage: {
      status: 'warning',
      message: 'Don’t be a troll, please'
    }
  }
}`,...(te=(ee=m.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var ae,re,se;g.parameters={...g.parameters,docs:{...(ae=g.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    label: 'Your name',
    type: 'text',
    required: true,
    value: 'Jean-Michel Halleurt',
    statusWithMessage: {
      status: 'warning'
    }
  }
}`,...(se=(re=g.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};var ne,oe,ue;d.parameters={...d.parameters,docs:{...(ne=d.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    type: 'text',
    required: true,
    value: 'Michel Sardou',
    statusWithMessage: {
      status: 'error',
      message: '“Michel Sardou” can’t be used'
    }
  }
}`,...(ue=(oe=d.parameters)==null?void 0:oe.docs)==null?void 0:ue.source}}};var le,ie,ce;h.parameters={...h.parameters,docs:{...(le=h.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    type: 'text',
    required: true,
    value: 'Michel Sardou',
    statusWithMessage: {
      tooltip: 'right',
      status: 'error',
      message: '“Michel Sardou” can’t be used'
    }
  }
}`,...(ce=(ie=h.parameters)==null?void 0:ie.docs)==null?void 0:ce.source}}};var pe,me,ge;b.parameters={...b.parameters,docs:{...(pe=b.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    type: 'text',
    value: 'This is a narrow input',
    statusWithMessage: {
      status: 'warning',
      message: "My wrapper doesn't have any padding. Don't use me with 'required' or 'statusWithMessage' with no tooltip."
    },
    narrow: true
  }
}`,...(ge=(me=b.parameters)==null?void 0:me.docs)==null?void 0:ge.source}}};var de,he,be;M.parameters={...M.parameters,docs:{...(de=M.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    type: 'text',
    required: true,
    value: 'Michel Sardou'
  },
  decorators: [function Component(Story, ctx) {
    const [status, setStatus] = useState<StatusWithMessage | undefined>({
      tooltip: 'right',
      status: 'info',
      message: '“Michel Sardou” can’t be used'
    });
    return <Story args={{
      ...ctx.args,
      statusWithMessage: status,
      onCloseStatusMessage: () => setStatus(undefined)
    }} />;
  }]
}`,...(be=(he=M.parameters)==null?void 0:he.docs)==null?void 0:be.source}}};var Me,ye,ve;y.parameters={...y.parameters,docs:{...(Me=y.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  decorators: [Story => <div style={{
    display: 'flex',
    flexDirection: 'row',
    gap: '20px'
  }}>
        <Story args={{
      label: 'Name',
      type: 'text',
      value: 'Michel Sardou',
      statusWithMessage: {
        tooltip: 'left',
        status: 'error',
        message: 'Michel Sardou can’t be used'
      }
    }} />
        <Story args={{
      label: 'Name',
      type: 'text',
      value: 'Jean-Michel Halleurt',
      statusWithMessage: {
        tooltip: 'right',
        status: 'error',
        message: 'Jean-Michel Halleurt can’t be used'
      }
    }} />
      </div>]
}`,...(ve=(ye=y.parameters)==null?void 0:ye.docs)==null?void 0:ve.source}}};var Se,xe,We;v.parameters={...v.parameters,docs:{...(Se=v.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    type: 'text',
    required: true,
    value: 'Michel Sardou',
    statusWithMessage: {
      status: 'error'
    }
  }
}`,...(We=(xe=v.parameters)==null?void 0:xe.docs)==null?void 0:We.source}}};var Ie,fe,we;S.parameters={...S.parameters,docs:{...(Ie=S.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
  args: {
    label: 'Your name',
    type: 'text',
    value: 'Manuel',
    withIcons: [{
      icon: <ChevronDown size="lg" />,
      action: () => {},
      className: 'chevron-icon'
    }]
  }
}`,...(we=(fe=S.parameters)==null?void 0:fe.docs)==null?void 0:we.source}}};var Ne,Ce,qe;x.parameters={...x.parameters,docs:{...(Ne=x.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
  args: {
    label: 'Your name',
    type: 'text',
    value: 'Hubert Blaine Wolfeschlegelsteinhausenbergerdorff Sr',
    withIcons: [{
      icon: <X size="lg" />,
      action: () => {},
      className: 'chevron-icon'
    }]
  }
}`,...(qe=(Ce=x.parameters)==null?void 0:Ce.docs)==null?void 0:qe.source}}};var Ee,Ye,Te;W.parameters={...W.parameters,docs:{...(Ee=W.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
  args: {
    label: 'Your name',
    type: 'text',
    value: 'Hubert Blaine Wolfeschlegelsteinhausenbergerdorff Sr',
    withIcons: [{
      icon: <X size="lg" />,
      action: () => {},
      className: 'chevron-icon'
    }, {
      icon: <ChevronDown size="lg" />,
      action: () => {},
      className: 'chevron-icon'
    }]
  }
}`,...(Te=(Ye=W.parameters)==null?void 0:Ye.docs)==null?void 0:Te.source}}};const Ke=["Default","Value","Hint","LeadingContent","TrainlingContent","LeadingAndTrainlingContent","RequiredInput","LoadingInput","SuccessInput","InformationInput","WarningInput","WarningWithoutMessageInput","ErrorInput","TooltipErrorInput","TooltipWarningNarrowInput","TooltipInfoInput","TwoTooltipErrorInput","ErrorWithoutMessageInput","InputWithChevronButton","InputWithClearButton","InputWithTwoIconAndLongValue"];export{a as Default,d as ErrorInput,v as ErrorWithoutMessageInput,s as Hint,p as InformationInput,S as InputWithChevronButton,x as InputWithClearButton,W as InputWithTwoIconAndLongValue,u as LeadingAndTrainlingContent,n as LeadingContent,i as LoadingInput,l as RequiredInput,c as SuccessInput,h as TooltipErrorInput,M as TooltipInfoInput,b as TooltipWarningNarrowInput,o as TrainlingContent,y as TwoTooltipErrorInput,r as Value,m as WarningInput,g as WarningWithoutMessageInput,Ke as __namedExportsOrder,je as default};
