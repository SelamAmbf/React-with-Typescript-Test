import { STORE_ActionType } from "../actionType/action-types";
import { ACTION_STORE, STORE_STATE } from "../actions/actionStore"

const initialState = {
    storestates: [],
    total:0
};

export const STORE_REDUCER = (
    state: STORE_STATE = initialState,
    action : ACTION_STORE
) => {
    switch (action.type) {
        case STORE_ActionType.ADD_STORE:
            return {
                ...state,
                storestates: [...state.storestates, action.payload],
            };
        case STORE_ActionType.FETCH_BY_ID_STORE:
            return {
                  ...state,
                  storestates: action.payload,
                };
        case STORE_ActionType.VIEW_STORE:
            return {
                
                  ...state,
                  storestates: action.payload[0],
                  total:action.payload[1]
                };
        case STORE_ActionType.UPDATE_STORE:
            return {
                 ...state,
                 storestates: state.storestates.map((store) =>
                {//@ts-ignore
                    return store.id == action.payload[1].id ? action.payload[1] : store;
                }
                ),
                };
        case STORE_ActionType.DELETE_STORE:
                return {
                    ...state,
                    storestates: state.storestates.filter(
                        (
                            store //@ts-ignore
                        ) => store.id != action.payload
                      ),
                    };
        default:
            return state;
                
    }

};