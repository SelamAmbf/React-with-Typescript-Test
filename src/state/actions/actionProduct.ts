import { PRODUCT_ActionType } from "../actionType/action-types";

export interface PRODUCT_STATE {
    productstate: products[];
    productnamestate:products[];
  }
  export interface products {
    id: number;
    productName: string;
    productDescription: string;
    productSerialNo:string;
    shelfNo:string;
    shelfName:string;
    expiryDate: string;
    storeid: number;
    
}
export interface ADD_PRODUCT_ACTION {
    type: PRODUCT_ActionType.ADD_PRODUCT;
    payload: PRODUCT_STATE[];
}
export interface DELETE_PRODUCT_ACTION {
    type: PRODUCT_ActionType.DELETE_PRODUCT;
    payload?: PRODUCT_STATE[];
}
export interface UPDATE_PRODUCT_ACTION {
    type: PRODUCT_ActionType.UPDATE_PRODUCT; 
    payload: PRODUCT_STATE[];
}
export interface VIEW_PRODUCT_ACTION {
    type: PRODUCT_ActionType.VIEW_PRODUCT;
    payload: PRODUCT_STATE[];
}
export interface SEARCH_PRODUCT_ACTION {
    type: PRODUCT_ActionType.SEARCH_PRODUCT;
    payload: PRODUCT_STATE[];
  }
  export type ACTION_PRODUCT  = |ADD_PRODUCT_ACTION |UPDATE_PRODUCT_ACTION  |DELETE_PRODUCT_ACTION  |VIEW_PRODUCT_ACTION  | SEARCH_PRODUCT_ACTION;