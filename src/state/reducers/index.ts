import { combineReducers } from "redux";
import { productsReducer, storesReducer } from "./productReducer";

const reducers = combineReducers({
    allProducts:productsReducer,
    allStores:storesReducer,
})
export default reducers