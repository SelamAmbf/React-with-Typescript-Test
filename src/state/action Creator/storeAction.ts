import { storeApi } from "./Api";
import { Dispatch } from "redux";
import { STORE_ActionType } from "../actionType/action-types";
import { STORE_STATE, ACTION_STORE } from "../actions/actionStore";

export const create =(data: STORE_STATE, onSucess: any, onCreateError: any) =>
async (useADispatch: Dispatch<ACTION_STORE>) => {
    storeApi().create(data).then((response) => {
        useADispatch({
            type: STORE_ActionType.ADD_STORE,
            payload: response.data,
        });
        debugger;
        const data = response.data;
        debugger;
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
export const fetchAll = (onSuccess: any, onFetchAllError: any, request: any) => 
async (useAuthDispatch: Dispatch<ACTION_STORE>) => {
  try {
    const response = await storeApi().fetchAll(request);
    const data = response.data;
    useAuthDispatch({
      type: STORE_ActionType.VIEW_STORE,
      payload: [data], // Assuming data is an array of products
    });
    onSuccess();
  } catch (err:any) {
    onFetchAllError(err.message);
  }
};

// export const fetchAll =
// (onSuccess: any, onFetchAllError: any, request: any) => 
// async (useAuthDispatch: Dispatch<ACTION_STORE>) => {
//     storeApi()
//       .fetchAll(request)
      
//       .then((response) => {
//         const data = response.data
//         useAuthDispatch({
//           type: STORE_ActionType.VIEW_STORE,
//           payload: [data],
//         });
//         onSuccess();
//       })
//       .catch((err: any) => {
//         return onFetchAllError(err.message);
//       });
//   };
  export const fetchAlls =
(onSuccess: any, onFetchAllError: any) => 
async (useAuthDispatch: Dispatch<ACTION_STORE>) => {
    storeApi()
      .fetchAlls()
      .then((response) => {
        const data = response.data
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
  async(useAuthDispatch: Dispatch<ACTION_STORE>) => {
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
  (AuthDispatch: Dispatch<ACTION_STORE>) => {
    storeApi()
      .delete(id)
      .then((response) => {
        console.log(response);
        const data = response.data
        AuthDispatch({
          type: STORE_ActionType.DELETE_STORE,
          payload: [id],
        });
        onSuccess();
      })
      .catch((err: any) => {
        return onDeleteerror(err.message);
      });
  };