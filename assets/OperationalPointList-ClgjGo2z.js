import{R as n}from"./index-RYns6xqu.js";import{O as a}from"./OperationalPoint-Y3ABomcg.js";const o=({operationalPoints:t,activeOperationalPointId:i})=>n.createElement("div",{className:"operational-point-list "},t.map(e=>n.createElement("div",{key:e.id,className:"operational-point-wrapper flex flex-col justify-start",style:e.styles},n.createElement(a,{operationalPoint:e,isActive:i===e.id}))));o.__docgenInfo={description:"",methods:[],displayName:"OperationalPointList",props:{operationalPoints:{required:!0,tsType:{name:"Array",elements:[{name:"intersection",raw:`OperationalPointType & {
  styles?: CSSProperties;
  display?: boolean;
  onClick?: (opId: string, opRef: HTMLDivElement | null) => void;
}`,elements:[{name:"unknown"},{name:"signature",type:"object",raw:`{
  styles?: CSSProperties;
  display?: boolean;
  onClick?: (opId: string, opRef: HTMLDivElement | null) => void;
}`,signature:{properties:[{key:"styles",value:{name:"CSSProperties",required:!1}},{key:"display",value:{name:"boolean",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"(opId: string, opRef: HTMLDivElement | null) => void",signature:{arguments:[{type:{name:"string"},name:"opId"},{type:{name:"union",raw:"HTMLDivElement | null",elements:[{name:"HTMLDivElement"},{name:"null"}]},name:"opRef"}],return:{name:"void"}},required:!1}}]}}]}],raw:"StyledOperationalPointType[]"},description:""},activeOperationalPointId:{required:!1,tsType:{name:"string"},description:""}}};export{o as O};
