import { PRODUCT_STATE } from "../state/actions/actionProduct";
import { STORE_STATE } from "../state/actions/actionStore";
import * as STORE_REDUCER from "../state/reducers/storeReducer";
export interface AllStates {
    STORE_STATE: STORE_STATE;
    //PRODUCT_STATE: PRODUCT_STATE;
}

export const reducers = {
    STORE_REDUCER: STORE_REDUCER.STORE_REDUCER
};

export interface AppThunkAction<TAction>{
    (dispatch: (action: TAction) => void, getState: () => AllStates): void;
}