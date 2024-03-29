import { ActionType } from "../constant/action-types";
// import { Action } from "../actions/productActions";

const initialState = {
    products: [{
        storeName: '',
        country: '',
        city: '',
        location: '',
        area: ''
    },
],
};
export const productReducer = (state = initialState,{type, payload}:any) =>{
    switch (type) {
        case ActionType.ADD:
            return state;
        // case ActionType.UPDATE:
        //     return state;
        
        default:
           return state;
    }
    
}
//state: any = initialState, action: productActions): any