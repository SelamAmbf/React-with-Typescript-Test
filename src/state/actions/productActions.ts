import { PRODUCT_ActionType, STORE_ActionType } from "../constant/action-types";
export interface STORE_STATE {

        storestate: stores[];
        storenamestate:stores[];
      }
export interface PRODUCT_STATE {
        productstate: products[];
        productnamestate:products[];
      }
// Attributs For TASK ACTION
export interface stores {
        id: number;
        storeName: string;
        storeDescription: string;
        storeCountry:string;
        storeCity: string;
        storeLocation:string;
        
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
export const insertDatabase =(insertDatabase: any) => ({
        type :STORE_ActionType.ADD_STORE,
        payload: insertDatabase,
})
export const deleteData =(deleteData: any) => ({
        type :STORE_ActionType.DELETE_STORE,
        payload: deleteData,
})
export const updateData =(updateData: any) => ({
        type :STORE_ActionType.UPDATE_STORE,
        payload: updateData,
})
export const searchData =(searchData: any) => ({
        type :STORE_ActionType.SEARCH_STORE,
        payload: searchData,
})
export interface ADD_STORE_ACTION {
        type: STORE_ActionType.ADD_STORE;
        payload: STORE_STATE[];
}
export interface DELETE_STORE_ACTION {
        type: STORE_ActionType.DELETE_STORE;
        payload?: STORE_STATE[];
}
export interface UPDATE_STORE_ACTION {
        type: STORE_ActionType.UPDATE_STORE;
        payload: STORE_STATE[];
}
export interface VIEW_STORE_ACTION {
        type: STORE_ActionType.VIEW_STORE;
        payload: STORE_STATE[];
}
export interface SEARCH_STORE_ACTION {
        type: STORE_ActionType.SEARCH_STORE;
        payload: STORE_STATE[];
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
export type ACTION_STORE  = ADD_STORE_ACTION |ADD_PRODUCT_ACTION| UPDATE_STORE_ACTION |UPDATE_PRODUCT_ACTION | DELETE_STORE_ACTION |DELETE_PRODUCT_ACTION | VIEW_STORE_ACTION |VIEW_PRODUCT_ACTION | SEARCH_STORE_ACTION | SEARCH_PRODUCT_ACTION;