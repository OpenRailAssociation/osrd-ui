import{R as s,r as de}from"./index-RYns6xqu.js";/* empty css              */import{c as ce}from"./index-Cm1LdsEh.js";import{C as be}from"./Checkbox-B8WoWQyS.js";import{F as ge}from"./FieldWrapper-sNyiQ-VR.js";import"./useFocusByTab-DuF17kQm.js";import"./InputStatusIcon-BgCZkodG.js";import"./index.esm-CkK1enDk.js";const w=e=>{const{items:r,onClickItem:t,small:n=!1,label:a="",readOnly:o=!1,disabled:m=!1}=e;return s.createElement(s.Fragment,null,s.createElement("span",{className:"checkbox-list-label"},a),s.createElement("ul",{className:ce("checkbox-list",{small:n})},r.map(u=>{const{id:p,props:l,items:d}=u;return s.createElement("li",{key:p},s.createElement(be,{small:n,onClick:q=>t(q,u),checked:u.props.checked,isIndeterminate:u.props.isIndeterminate,...l,disabled:m,readOnly:o}),d&&s.createElement(w,{...e,items:d}))})))};w.__docgenInfo={description:"",methods:[],displayName:"CheckboxList",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: number;
  props: CheckboxProps;
  items?: CheckboxTreeItem[];
}`,signature:{properties:[{key:"id",value:{name:"number",required:!0}},{key:"props",value:{name:"intersection",raw:`InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  small?: boolean;
  hint?: string;
  isIndeterminate?: boolean;
}`,elements:[{name:"InputHTMLAttributes",elements:[{name:"HTMLInputElement"}],raw:"InputHTMLAttributes<HTMLInputElement>"},{name:"signature",type:"object",raw:`{
  label?: string;
  small?: boolean;
  hint?: string;
  isIndeterminate?: boolean;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!1}},{key:"small",value:{name:"boolean",required:!1}},{key:"hint",value:{name:"string",required:!1}},{key:"isIndeterminate",value:{name:"boolean",required:!1}}]}}],required:!0}},{key:"items",value:{name:"Array",elements:[{name:"CheckboxTreeItem"}],raw:"CheckboxTreeItem[]",required:!1}}]}}],raw:"CheckboxTreeItem[]"},description:""},onClickItem:{required:!0,tsType:{name:"signature",type:"function",raw:"(e: React.MouseEvent<HTMLInputElement, MouseEvent>, item: CheckboxTreeItem) => void",signature:{arguments:[{type:{name:"ReactMouseEvent",raw:"React.MouseEvent<HTMLInputElement, MouseEvent>",elements:[{name:"HTMLInputElement"},{name:"MouseEvent"}]},name:"e"},{type:{name:"signature",type:"object",raw:`{
  id: number;
  props: CheckboxProps;
  items?: CheckboxTreeItem[];
}`,signature:{properties:[{key:"id",value:{name:"number",required:!0}},{key:"props",value:{name:"intersection",raw:`InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  small?: boolean;
  hint?: string;
  isIndeterminate?: boolean;
}`,elements:[{name:"InputHTMLAttributes",elements:[{name:"HTMLInputElement"}],raw:"InputHTMLAttributes<HTMLInputElement>"},{name:"signature",type:"object",raw:`{
  label?: string;
  small?: boolean;
  hint?: string;
  isIndeterminate?: boolean;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!1}},{key:"small",value:{name:"boolean",required:!1}},{key:"hint",value:{name:"string",required:!1}},{key:"isIndeterminate",value:{name:"boolean",required:!1}}]}}],required:!0}},{key:"items",value:{name:"Array",elements:[{name:"CheckboxTreeItem"}],raw:"CheckboxTreeItem[]",required:!1}}]}},name:"item"}],return:{name:"void"}}},description:""},small:{required:!1,tsType:{name:"boolean"},description:""},label:{required:!1,tsType:{name:"string"},description:""},readOnly:{required:!1,tsType:{name:"boolean"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""}}};var i=(e=>(e[e.UNCHECKED=0]="UNCHECKED",e[e.CHECKED=1]="CHECKED",e[e.INDETERMINATE=2]="INDETERMINATE",e))(i||{});const v=(e,r,t)=>{e.forEach(n=>{r(n,t),n.items&&n.items.length>0&&v(n.items,r,n)})},Ie=e=>{const r={},t={};return v(e,(n,a)=>{(a==null?void 0:a.id)!==void 0&&(r[a.id]||(r[a.id]=[]),r[a.id].push(n.id),t[n.id]=a.id)}),{parentChildrenMap:r,childrenParentMap:t}},ie=(e,r,t,n)=>{var a;n[e]=r,(a=t[e])==null||a.forEach(o=>ie(o,r,t,n))},le=(e,r,t)=>{const{parentChildrenMap:n,childrenParentMap:a}=t,o=a[e];if(o===void 0)return;const u=n[o].map(l=>r[l]);let p;u.every(l=>l===i.CHECKED)?p=i.CHECKED:u.every(l=>l===i.UNCHECKED)?p=i.UNCHECKED:p=i.INDETERMINATE,r[o]=p,le(o,r,{parentChildrenMap:n,childrenParentMap:a})},ye=(e,r,t)=>{const n={...r},a=n[t]===i.CHECKED?i.UNCHECKED:i.CHECKED,{parentChildrenMap:o,childrenParentMap:m}=Ie(e);return ie(t,a,o,n),le(t,n,{parentChildrenMap:o,childrenParentMap:m}),n},ke=e=>{const r={};return v(e,t=>{t.props.isIndeterminate?r[t.id]=i.INDETERMINATE:r[t.id]=t.props.checked?i.CHECKED:i.UNCHECKED}),r},he=(e,r)=>{const t=JSON.parse(JSON.stringify(e));return v(t,n=>{const{checked:a,isIndeterminate:o,...m}=n.props;n.props=m,r[n.id]===i.INDETERMINATE?n.props.isIndeterminate=!0:r[n.id]===i.CHECKED?n.props.checked=!0:n.props.checked=!1}),t},Te=(e,r)=>{const t=ke(e),n=ye(e,t,r.id);return he(e,n)},H=({items:e,small:r,id:t,label:n,hint:a,statusWithMessage:o,disabled:m,required:u,readOnly:p,onChange:l,computeNewItemsTree:d})=>{const q=(ue,c)=>{var L,x;const pe=d?d(e,c):Te(e,c);l==null||l(pe,c),(x=(L=c.props).onClick)==null||x.call(L,ue)};return s.createElement(ge,{id:t,label:n,hint:a,statusWithMessage:o,statusIconPosition:"before-status-message",disabled:m,required:u,small:r},s.createElement(w,{small:r,items:e,disabled:m,readOnly:p,onClickItem:q}))};H.__docgenInfo={description:"",methods:[],displayName:"CheckboxesTree",props:{readOnly:{required:!1,tsType:{name:"boolean"},description:""},items:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: number;
  props: CheckboxProps;
  items?: CheckboxTreeItem[];
}`,signature:{properties:[{key:"id",value:{name:"number",required:!0}},{key:"props",value:{name:"intersection",raw:`InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  small?: boolean;
  hint?: string;
  isIndeterminate?: boolean;
}`,elements:[{name:"InputHTMLAttributes",elements:[{name:"HTMLInputElement"}],raw:"InputHTMLAttributes<HTMLInputElement>"},{name:"signature",type:"object",raw:`{
  label?: string;
  small?: boolean;
  hint?: string;
  isIndeterminate?: boolean;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!1}},{key:"small",value:{name:"boolean",required:!1}},{key:"hint",value:{name:"string",required:!1}},{key:"isIndeterminate",value:{name:"boolean",required:!1}}]}}],required:!0}},{key:"items",value:{name:"Array",elements:[{name:"CheckboxTreeItem"}],raw:"CheckboxTreeItem[]",required:!1}}]}}],raw:"CheckboxTreeItem[]"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(newItems: CheckboxTreeItem[], item: CheckboxTreeItem) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: number;
  props: CheckboxProps;
  items?: CheckboxTreeItem[];
}`,signature:{properties:[{key:"id",value:{name:"number",required:!0}},{key:"props",value:{name:"intersection",raw:`InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  small?: boolean;
  hint?: string;
  isIndeterminate?: boolean;
}`,elements:[{name:"InputHTMLAttributes",elements:[{name:"HTMLInputElement"}],raw:"InputHTMLAttributes<HTMLInputElement>"},{name:"signature",type:"object",raw:`{
  label?: string;
  small?: boolean;
  hint?: string;
  isIndeterminate?: boolean;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!1}},{key:"small",value:{name:"boolean",required:!1}},{key:"hint",value:{name:"string",required:!1}},{key:"isIndeterminate",value:{name:"boolean",required:!1}}]}}],required:!0}},{key:"items",value:{name:"Array",elements:[{name:"CheckboxTreeItem"}],raw:"CheckboxTreeItem[]",required:!1}}]}}],raw:"CheckboxTreeItem[]"},name:"newItems"},{type:{name:"signature",type:"object",raw:`{
  id: number;
  props: CheckboxProps;
  items?: CheckboxTreeItem[];
}`,signature:{properties:[{key:"id",value:{name:"number",required:!0}},{key:"props",value:{name:"intersection",raw:`InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  small?: boolean;
  hint?: string;
  isIndeterminate?: boolean;
}`,elements:[{name:"InputHTMLAttributes",elements:[{name:"HTMLInputElement"}],raw:"InputHTMLAttributes<HTMLInputElement>"},{name:"signature",type:"object",raw:`{
  label?: string;
  small?: boolean;
  hint?: string;
  isIndeterminate?: boolean;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!1}},{key:"small",value:{name:"boolean",required:!1}},{key:"hint",value:{name:"string",required:!1}},{key:"isIndeterminate",value:{name:"boolean",required:!1}}]}}],required:!0}},{key:"items",value:{name:"Array",elements:[{name:"CheckboxTreeItem"}],raw:"CheckboxTreeItem[]",required:!1}}]}},name:"item"}],return:{name:"void"}}},description:""},computeNewItemsTree:{required:!1,tsType:{name:"signature",type:"function",raw:`(
  prevItemsTree: CheckboxTreeItem[],
  item: CheckboxTreeItem
) => CheckboxTreeItem[]`,signature:{arguments:[{type:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: number;
  props: CheckboxProps;
  items?: CheckboxTreeItem[];
}`,signature:{properties:[{key:"id",value:{name:"number",required:!0}},{key:"props",value:{name:"intersection",raw:`InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  small?: boolean;
  hint?: string;
  isIndeterminate?: boolean;
}`,elements:[{name:"InputHTMLAttributes",elements:[{name:"HTMLInputElement"}],raw:"InputHTMLAttributes<HTMLInputElement>"},{name:"signature",type:"object",raw:`{
  label?: string;
  small?: boolean;
  hint?: string;
  isIndeterminate?: boolean;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!1}},{key:"small",value:{name:"boolean",required:!1}},{key:"hint",value:{name:"string",required:!1}},{key:"isIndeterminate",value:{name:"boolean",required:!1}}]}}],required:!0}},{key:"items",value:{name:"Array",elements:[{name:"CheckboxTreeItem"}],raw:"CheckboxTreeItem[]",required:!1}}]}}],raw:"CheckboxTreeItem[]"},name:"prevItemsTree"},{type:{name:"signature",type:"object",raw:`{
  id: number;
  props: CheckboxProps;
  items?: CheckboxTreeItem[];
}`,signature:{properties:[{key:"id",value:{name:"number",required:!0}},{key:"props",value:{name:"intersection",raw:`InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  small?: boolean;
  hint?: string;
  isIndeterminate?: boolean;
}`,elements:[{name:"InputHTMLAttributes",elements:[{name:"HTMLInputElement"}],raw:"InputHTMLAttributes<HTMLInputElement>"},{name:"signature",type:"object",raw:`{
  label?: string;
  small?: boolean;
  hint?: string;
  isIndeterminate?: boolean;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!1}},{key:"small",value:{name:"boolean",required:!1}},{key:"hint",value:{name:"string",required:!1}},{key:"isIndeterminate",value:{name:"boolean",required:!1}}]}}],required:!0}},{key:"items",value:{name:"Array",elements:[{name:"CheckboxTreeItem"}],raw:"CheckboxTreeItem[]",required:!1}}]}},name:"item"}],return:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  id: number;
  props: CheckboxProps;
  items?: CheckboxTreeItem[];
}`,signature:{properties:[{key:"id",value:{name:"number",required:!0}},{key:"props",value:{name:"intersection",raw:`InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  small?: boolean;
  hint?: string;
  isIndeterminate?: boolean;
}`,elements:[{name:"InputHTMLAttributes",elements:[{name:"HTMLInputElement"}],raw:"InputHTMLAttributes<HTMLInputElement>"},{name:"signature",type:"object",raw:`{
  label?: string;
  small?: boolean;
  hint?: string;
  isIndeterminate?: boolean;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!1}},{key:"small",value:{name:"boolean",required:!1}},{key:"hint",value:{name:"string",required:!1}},{key:"isIndeterminate",value:{name:"boolean",required:!1}}]}}],required:!0}},{key:"items",value:{name:"Array",elements:[{name:"CheckboxTreeItem"}],raw:"CheckboxTreeItem[]",required:!1}}]}}],raw:"CheckboxTreeItem[]"}}},description:""}}};const fe=e=>{const[r,t]=de.useState(e.items),n=a=>t(a);return s.createElement(H,{...e,items:r,onChange:n})},xe={component:H,title:"Core/CheckboxesTree",tags:["autodocs"],argTypes:{disabled:{control:"boolean"},small:{control:"boolean"},readOnly:{control:"boolean"},required:{control:"boolean"}},render:e=>s.createElement(fe,{...e})},me=[{id:1,props:{label:"Milk"}},{id:2,props:{label:"Butter"}},{id:3,props:{label:"Cream"}}],M=[{id:1,props:{label:"Milk"}},{id:2,props:{label:"Sugar"}},{id:3,props:{label:"Lemon slice"}}],b={args:{items:me}},g={args:{items:M,label:"With your tea"}},I={args:{items:M,label:"With your tea",hint:"At no extra cost for you"}},y={args:{items:[{id:1,props:{label:"A walk on the beach"}},{id:2,props:{label:"A bike ride on long forest winding roads"}},{id:3,props:{label:"Reading a book in a couch"}}]}},k={args:{items:[{id:0,props:{label:"Dairy products"},items:[{id:1,props:{label:"Milk"}},{id:2,props:{label:"Butter"}},{id:3,props:{label:"Cream"}}]}]}},h={args:{items:[{id:1,props:{label:"foo"},items:[{id:2,props:{label:"foo2"},items:[{id:3,props:{label:"foo3"}},{id:4,props:{label:"foo4"}}]},{id:5,props:{label:"foo5"},items:[{id:6,props:{label:"foo6"},items:[{id:8,props:{label:"foo8"}},{id:9,props:{label:"foo9"}}]}]}]},{id:7,props:{label:"foo7"}}]}},T={args:{items:M,label:"With your beverage",required:!0}},f={args:{items:me.map((e,r)=>r===1?{...e,props:{...e.props,checked:!0}}:{...e}),disabled:!0,statusWithMessage:{status:"info",message:"These controls are disabled"}},decorators:[e=>s.createElement("div",{style:{maxWidth:"20rem"}},s.createElement(e,null))]},E={args:{items:M,statusWithMessage:{status:"warning",message:"Your tea will be black, strong and not sweet at all"}},decorators:[e=>s.createElement("div",{style:{maxWidth:"20rem"}},s.createElement(e,null))]},C={args:{items:[{id:1,props:{label:"Chocolate cake"}},{id:2,props:{label:"Ice cream"}},{id:3,props:{label:"Tiramisu"}}],statusWithMessage:{status:"error",message:"You can’t order a meal without a pastry"}},decorators:[e=>s.createElement("div",{style:{maxWidth:"20rem"}},s.createElement(e,null))]};var A,N,S;b.parameters={...b.parameters,docs:{...(A=b.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    items: milkButterCream
  }
}`,...(S=(N=b.parameters)==null?void 0:N.docs)==null?void 0:S.source}}};var W,D,j;g.parameters={...g.parameters,docs:{...(W=g.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    items: milkSugarLemon,
    label: 'With your tea'
  }
}`,...(j=(D=g.parameters)==null?void 0:D.docs)==null?void 0:j.source}}};var R,K,P;I.parameters={...I.parameters,docs:{...(R=I.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    items: milkSugarLemon,
    label: 'With your tea',
    hint: 'At no extra cost for you'
  }
}`,...(P=(K=I.parameters)==null?void 0:K.docs)==null?void 0:P.source}}};var O,U,_;y.parameters={...y.parameters,docs:{...(O=y.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(_=(U=y.parameters)==null?void 0:U.docs)==null?void 0:_.source}}};var B,G,Y;k.parameters={...k.parameters,docs:{...(B=k.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(Y=(G=k.parameters)==null?void 0:G.docs)==null?void 0:Y.source}}};var F,J,z;h.parameters={...h.parameters,docs:{...(F=h.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(z=(J=h.parameters)==null?void 0:J.docs)==null?void 0:z.source}}};var Q,X,Z;T.parameters={...T.parameters,docs:{...(Q=T.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    items: milkSugarLemon,
    label: 'With your beverage',
    required: true
  }
}`,...(Z=(X=T.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var V,$,ee;f.parameters={...f.parameters,docs:{...(V=f.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(ee=($=f.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var ne,re,te;E.parameters={...E.parameters,docs:{...(ne=E.parameters)==null?void 0:ne.docs,source:{originalSource:`{
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
}`,...(te=(re=E.parameters)==null?void 0:re.docs)==null?void 0:te.source}}};var ae,se,oe;C.parameters={...C.parameters,docs:{...(ae=C.parameters)==null?void 0:ae.docs,source:{originalSource:`{
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
}`,...(oe=(se=C.parameters)==null?void 0:se.docs)==null?void 0:oe.source}}};const Ae=["Default","GroupWithLabel","GroupWithLabelCaption","LabelOverflow","Nested","MoreNested","Required","Information","Warning","Error"];export{b as Default,C as Error,g as GroupWithLabel,I as GroupWithLabelCaption,f as Information,y as LabelOverflow,h as MoreNested,k as Nested,T as Required,E as Warning,Ae as __namedExportsOrder,xe as default};
