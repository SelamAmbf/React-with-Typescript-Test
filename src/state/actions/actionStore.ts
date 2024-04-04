import { STORE_ActionType } from "../actionType/action-types";
export interface STORE_STATE {
        storestates: stores[];
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

// export const insertDatabase =(insertDatabase: any) => ({
//         type :STORE_ActionType.ADD_STORE,
//         payload: insertDatabase,
// })
// export const deleteData =(deleteData: any) => ({
//         type :STORE_ActionType.DELETE_STORE,
//         payload: deleteData,
// })
// export const updateData =(updateData: any) => ({
//         type :STORE_ActionType.UPDATE_STORE,
//         payload: updateData,
// })
// export const searchData =(searchData: any) => ({
//         type :STORE_ActionType.SEARCH_STORE,
//         payload: searchData,
// })
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

export type ACTION_STORE  = ADD_STORE_ACTION | UPDATE_STORE_ACTION  | DELETE_STORE_ACTION  | VIEW_STORE_ACTION  | SEARCH_STORE_ACTION ;