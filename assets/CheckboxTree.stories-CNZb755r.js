import{R as r,r as U}from"./index-DQDNmYQF.js";import{e as H}from"./index.esm-sJxuVDX9.js";/* empty css              */const V=e=>{const[u,K]=U.useState(e.items),P=Q=>K(Q);return r.createElement(H,{...e,items:u,onChange:P})},ee={component:H,title:"Core/CheckboxesTree",tags:["autodocs"],argTypes:{disabled:{control:"boolean"},small:{control:"boolean"},readOnly:{control:"boolean"},required:{control:"boolean"}},render:e=>r.createElement(V,{...e})},J=[{id:1,props:{label:"Milk"}},{id:2,props:{label:"Butter"}},{id:3,props:{label:"Cream"}}],c=[{id:1,props:{label:"Milk"}},{id:2,props:{label:"Sugar"}},{id:3,props:{label:"Lemon slice"}}],s={args:{items:J}},a={args:{items:c,label:"With your tea"}},o={args:{items:c,label:"With your tea",hint:"At no extra cost for you"}},n={args:{items:[{id:1,props:{label:"A walk on the beach"}},{id:2,props:{label:"A bike ride on long forest winding roads"}},{id:3,props:{label:"Reading a book in a couch"}}]}},t={args:{items:[{id:0,props:{label:"Dairy products"},items:[{id:1,props:{label:"Milk"}},{id:2,props:{label:"Butter"}},{id:3,props:{label:"Cream"}}]}]}},i={args:{items:[{id:1,props:{label:"foo"},items:[{id:2,props:{label:"foo2"},items:[{id:3,props:{label:"foo3"}},{id:4,props:{label:"foo4"}}]},{id:5,props:{label:"foo5"},items:[{id:6,props:{label:"foo6"},items:[{id:8,props:{label:"foo8"}},{id:9,props:{label:"foo9"}}]}]}]},{id:7,props:{label:"foo7"}}]}},l={args:{items:c,label:"With your beverage",required:!0}},p={args:{items:J.map((e,u)=>u===1?{...e,props:{...e.props,checked:!0}}:{...e}),disabled:!0,statusWithMessage:{status:"info",message:"These controls are disabled"}},decorators:[e=>r.createElement("div",{style:{maxWidth:"20rem"}},r.createElement(e,null))]},m={args:{items:c,statusWithMessage:{status:"warning",message:"Your tea will be black, strong and not sweet at all"}},decorators:[e=>r.createElement("div",{style:{maxWidth:"20rem"}},r.createElement(e,null))]},d={args:{items:[{id:1,props:{label:"Chocolate cake"}},{id:2,props:{label:"Ice cream"}},{id:3,props:{label:"Tiramisu"}}],statusWithMessage:{status:"error",message:"You can’t order a meal without a pastry"}},decorators:[e=>r.createElement("div",{style:{maxWidth:"20rem"}},r.createElement(e,null))]};var b,g,h;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    items: milkButterCream
  }
}`,...(h=(g=s.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var f,k,y;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    items: milkSugarLemon,
    label: 'With your tea'
  }
}`,...(y=(k=a.parameters)==null?void 0:k.docs)==null?void 0:y.source}}};var S,W,x;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    items: milkSugarLemon,
    label: 'With your tea',
    hint: 'At no extra cost for you'
  }
}`,...(x=(W=o.parameters)==null?void 0:W.docs)==null?void 0:x.source}}};var C,w,v;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    items: [{
      id: 1,
      props: {
        label: 'A walk on the beach'
      }
    }, {
      id: 2,
      props: {
        label: 'A bike ride on long forest winding roads'
      }
    }, {
      id: 3,
      props: {
        label: 'Reading a book in a couch'
      }
    }]
  }
}`,...(v=(w=n.parameters)==null?void 0:w.docs)==null?void 0:v.source}}};var E,L,M;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    items: [{
      id: 0,
      props: {
        label: 'Dairy products'
      },
      items: [{
        id: 1,
        props: {
          label: 'Milk'
        }
      }, {
        id: 2,
        props: {
          label: 'Butter'
        }
      }, {
        id: 3,
        props: {
          label: 'Cream'
        }
      }]
    }]
  }
}`,...(M=(L=t.parameters)==null?void 0:L.docs)==null?void 0:M.source}}};var T,A,B;i.parameters={...i.parameters,docs:{...(T=i.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    items: [{
      id: 1,
      props: {
        label: 'foo'
      },
      items: [{
        id: 2,
        props: {
          label: 'foo2'
        },
        items: [{
          id: 3,
          props: {
            label: 'foo3'
          }
        }, {
          id: 4,
          props: {
            label: 'foo4'
          }
        }]
      }, {
        id: 5,
        props: {
          label: 'foo5'
        },
        items: [{
          id: 6,
          props: {
            label: 'foo6'
          },
          items: [{
            id: 8,
            props: {
              label: 'foo8'
            }
          }, {
            id: 9,
            props: {
              label: 'foo9'
            }
          }]
        }]
      }]
    }, {
      id: 7,
      props: {
        label: 'foo7'
      }
    }]
  }
}`,...(B=(A=i.parameters)==null?void 0:A.docs)==null?void 0:B.source}}};var R,q,I;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    items: milkSugarLemon,
    label: 'With your beverage',
    required: true
  }
}`,...(I=(q=l.parameters)==null?void 0:q.docs)==null?void 0:I.source}}};var D,G,N;p.parameters={...p.parameters,docs:{...(D=p.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    items: milkButterCream.map((item, index) => index === 1 ? {
      ...item,
      props: {
        ...item.props,
        checked: true
      }
    } : {
      ...item
    }),
    disabled: true,
    statusWithMessage: {
      status: 'info',
      message: 'These controls are disabled'
    }
  },
  decorators: [Story => <div style={{
    maxWidth: '20rem'
  }}>
        <Story />
      </div>]
}`,...(N=(G=p.parameters)==null?void 0:G.docs)==null?void 0:N.source}}};var O,Y,_;m.parameters={...m.parameters,docs:{...(O=m.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    items: milkSugarLemon,
    statusWithMessage: {
      status: 'warning',
      message: 'Your tea will be black, strong and not sweet at all'
    }
  },
  decorators: [Story => <div style={{
    maxWidth: '20rem'
  }}>
        <Story />
      </div>]
}`,...(_=(Y=m.parameters)==null?void 0:Y.docs)==null?void 0:_.source}}};var j,z,F;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    items: [{
      id: 1,
      props: {
        label: 'Chocolate cake'
      }
    }, {
      id: 2,
      props: {
        label: 'Ice cream'
      }
    }, {
      id: 3,
      props: {
        label: 'Tiramisu'
      }
    }],
    statusWithMessage: {
      status: 'error',
      message: 'You can’t order a meal without a pastry'
    }
  },
  decorators: [Story => <div style={{
    maxWidth: '20rem'
  }}>
        <Story />
      </div>]
}`,...(F=(z=d.parameters)==null?void 0:z.docs)==null?void 0:F.source}}};const re=["Default","GroupWithLabel","GroupWithLabelCaption","LabelOverflow","Nested","MoreNested","Required","Information","Warning","Error"];export{s as Default,d as Error,a as GroupWithLabel,o as GroupWithLabelCaption,p as Information,n as LabelOverflow,i as MoreNested,t as Nested,l as Required,m as Warning,re as __namedExportsOrder,ee as default};
