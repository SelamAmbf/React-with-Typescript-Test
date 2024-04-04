import { STORE_ActionType } from "../actionType/action-types";
import { ACTION_STORE, STORE_STATE } from "../actions/actionStore"

const initialState = {
    storestates: []
};

export const STORE_REDUCER = (
    state: STORE_STATE = initialState,
    action : ACTION_STORE
) => {
    switch (action.type) {
        case STORE_ActionType.ADD_STORE:
            return {
                ...state,
                storestate: [...state.storestates, action.payload],
            };
            default:
                return state;
    }
};