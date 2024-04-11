import { PRODUCT_ActionType } from "../actionType/action-types";
import { ACTION_PRODUCT, PRODUCT_STATE } from "../actions/actionProduct";

const initialState = {
    productstate: [],
    //total:0
};

export const PRODUCT_REDUCER = (
    state: PRODUCT_STATE = initialState,
    action : ACTION_PRODUCT
) => {
    switch (action.type) {
        case PRODUCT_ActionType.ADD_PRODUCT:
            return {
                ...state,
                productstate: [...state.productstate, action.payload],
            };
        case PRODUCT_ActionType.SEARCH_PRODUCT:
            return {
                  ...state,
                  productstate: action.payload,
                };
        case PRODUCT_ActionType.VIEW_PRODUCT:
            return {
                
                  ...state,
                  productstate: action.payload[0],
                  //total:action.payload[1]
                };
        case PRODUCT_ActionType.UPDATE_PRODUCT:
            return {
                 ...state,
                 productstate: state.productstate.map((product) =>
                {//@ts-ignore
                    return product.id == action.payload[1].id ? action.payload[1] : product;
                }
                ),
                };
        case PRODUCT_ActionType.DELETE_PRODUCT:
                return {
                    ...state,
                    productstate: state.productstate.filter(
                        (
                            product //@ts-ignore
                        ) => product.id != action.payload
                      ),
                    };
        default:
            return state;
                
    }

};