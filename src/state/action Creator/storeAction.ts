// import Api from "./Api";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { stores } from "../actions/actionStore";
// const BASE_URL = 'http://localhost:8000'; // Assuming your JSON server is running on port 8000
// // export const addStore = createAsyncThunk("addEmployee", async (stores: stores) => {
// //     try {
// //         const response = await Api.post("store", stores)
// //         return response.data
// //     } catch (error) { 
// //         console.log(error)
// //     }
// // })
// export const getStore = () => Api.get(`/stores`);
// export const addStore = (store: any) => Api.post(`/stores`, store);
// export const updateStore = (store: { id: any; }) => Api.put(`${BASE_URL}/stores/${store.id}`, store);
// export const deleteStore = (id: any) => Api.delete(`${BASE_URL}/stores/${id}`);
// export const searchStore = (storeId: any) => Api.get(`${BASE_URL}/products?storeId=${storeId}`);

// export const addProduct = (product: any) => Api.post(`${BASE_URL}/products`, product);
// export const searchProducts = (storeId: any) => Api.get(`${BASE_URL}/products?storeId=${storeId}`);
// export const getProducts= () => Api.get(`${BASE_URL}/products`);
// export const updateProducts = (product: { id: any; }) => Api.put(`${BASE_URL}/products/${product.id}`, product);
// export const deleteProducts = (id: any) => Api.delete(`${BASE_URL}/products/${id}`); 
import { storeApi } from "./Api";
import { Dispatch } from "redux";
import { STORE_ActionType } from "../actionType/action-types";
import { STORE_STATE, ACTION_STORE } from "../actions/actionStore";

export const create =(data: STORE_STATE, onSucess: any, onCreateError: any) =>
(useADispatch: Dispatch<ACTION_STORE>) => {
    storeApi().create(data).then((response) => {
        useADispatch({
            type: STORE_ActionType.ADD_STORE,
            payload: response.data,
        });
        onSucess();
    })
    .catch((err) =>{
        if(err.response != undefined || null){
            return onCreateError(err.response.data.message);
        }
        else{
            return onCreateError(err.message);
        }
    });
};
export const fetchAll =
  (onSuccess: any, onFetchAllError: any, request: any) =>
  (useAuthDispatch: Dispatch<ACTION_STORE>) => {
    storeApi()
      .fetchAll(request)
      .then((response) => {
        const data = response.data;
        useAuthDispatch({
          type: STORE_ActionType.VIEW_STORE,
          payload: [data],
        });
        onSuccess();
      })
      .catch((err: any) => {
        return onFetchAllError(err.message);
      });
  };
  export const update =
  (id: any, data: STORE_STATE, onSuccess: any, onUpdateError: any) =>
  (useAuthDispatch: Dispatch<ACTION_STORE>) => {
    storeApi()
      .update(id, data)
      .then((response) => {
        useAuthDispatch({
          type: STORE_ActionType.UPDATE_STORE,
          payload: [id, response.data],
        });
        onSuccess();
      })
      .catch((err) => {
        if (err.response != undefined || null) {
          return onUpdateError(err.response.data.message);
        } else {
          return onUpdateError(err.message);
        }
      });
  };

export const Delete =
  (id: any, onSuccess: any, onDeleteerror: any) =>
  (useAuthDispatch: Dispatch<ACTION_STORE>) => {
    storeApi()
      .delete(id)
      .then((response) => {
        console.log(response);
        useAuthDispatch({
          type: STORE_ActionType.DELETE_STORE,
          payload: [id],
        });
        onSuccess();
      })
      .catch((err: any) => {
        return onDeleteerror(err.message);
      });
  };


