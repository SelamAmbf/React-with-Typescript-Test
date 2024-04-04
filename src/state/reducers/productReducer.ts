// import { ACTION_STORE,STORE_STATE,PRODUCT_STATE } from "../actions/actionStore";
// import { STORE_ActionType,PRODUCT_ActionType } from "../actionType/action-types";


// const initialState = { 
//     storestate: [],
//     storenamestate:[],
// };
// const initialStates = {
//     productstate: [],
//     productnamestate:[],
//   }
// export const storesReducer = (state: STORE_STATE = initialState, action: ACTION_STORE) => {
//   switch (action.type) {
//     case STORE_ActionType.ADD_STORE:
//       return {
//         ...state, // return to state
//         store: [...state.storestate, action.payload],// 
//     }

//     case STORE_ActionType.UPDATE_STORE:

//       return {
//         ...state,
//         storestate: state.storestate.map((stores) => 
//          {//@ts-ignore
//             return stores.id == action.payload[1].id ? action.payload[1] : stores;
//         }
//       ),
//     };
//     case STORE_ActionType.DELETE_STORE:
//       return {
//         ...state,
//         storestate: state.storestate
//         .filter(
//             (
//                 stores //@ts-ignore
//             ) => stores.id != action.payload
//           ),
//         };
//     case STORE_ActionType.SEARCH_STORE:
//                 return {
//                   ...state,
//                   STORE_ActionType: action.payload,
//                 };
//     default:
//       return state;
//   }
// };
// export const productsReducer = (state: PRODUCT_STATE = initialStates, action: ACTION_STORE) => {
//     switch (action.type) {
//       case PRODUCT_ActionType.ADD_PRODUCT:
//         return {
//           ...state, 
//           product: [...state.productstate, action.payload],
//       }
  
//       case PRODUCT_ActionType.UPDATE_PRODUCT:
  
//         return {
//           ...state,
//           productstate: state.productstate.map((products) => 
//            {//@ts-ignore
//               return products.id == action.payload[1].id ? action.payload[1] : products;
//           }
//         ),
//       };
//       case PRODUCT_ActionType.DELETE_PRODUCT:
//         return {
//           ...state,
//           productstate: state.productstate
//           .filter(
//               (
//                   products //@ts-ignore
//               ) => products.id != action.payload
//             ),
//           };
//       case PRODUCT_ActionType.SEARCH_PRODUCT:
//                   return {
//                     ...state,
//                     PRODUCT_ActionType: action.payload,
//                   };
//       default:
//         return state;
//     }
//   };
