import { productApi } from "./Api";
import { Dispatch } from "redux";
import { PRODUCT_ActionType } from "../actionType/action-types";
import { ACTION_PRODUCT, PRODUCT_STATE } from "../actions/actionProduct";

export const create =(data: PRODUCT_STATE, onSucess: any, onCreateError: any) =>
(useADispatch: Dispatch<ACTION_PRODUCT>) => {
    productApi().create(data).then((response) => {
        useADispatch({
            type: PRODUCT_ActionType.ADD_PRODUCT,
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
(useAuthDispatch: Dispatch<ACTION_PRODUCT>) => {
    productApi()
      .fetchAll(request)
      .then((response) => {
        const data = response.data
        useAuthDispatch({
          type: PRODUCT_ActionType.VIEW_PRODUCT,
          payload: [data],
        });
        onSuccess();
      })
      .catch((err: any) => {
        return onFetchAllError(err.message);
      });
  };
  export const fetchById =
  (id: any, onSuccess: any, onFetchByIderror: any) =>
  (useAuthDispatch: Dispatch<ACTION_PRODUCT>) => {
    productApi()
      .fetchById(id)
      .then((response) => {
        useAuthDispatch({
          type: PRODUCT_ActionType.SEARCH_PRODUCT,
          payload: [id],
        });
        onSuccess();
      })
      .catch((err: any) => {
        return onFetchByIderror(err.message);
      });
  };
  export const update =
  (id: any, data: PRODUCT_STATE, onSuccess: any, onUpdateError: any) =>
  (useAuthDispatch: Dispatch<ACTION_PRODUCT>) => {
    productApi()
      .update(id, data)
      .then((response) => {
        useAuthDispatch({
          type: PRODUCT_ActionType.UPDATE_PRODUCT,
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
  (AuthDispatch: Dispatch<ACTION_PRODUCT>) => {
    productApi()
      .delete(id)
      .then((response) => {
        console.log(response);
        const data = response.data
        AuthDispatch({
          type: PRODUCT_ActionType.DELETE_PRODUCT,
          payload: [id],
        });
        onSuccess();
      })
      .catch((err: any) => {
        return onDeleteerror(err.message);
      });
  };