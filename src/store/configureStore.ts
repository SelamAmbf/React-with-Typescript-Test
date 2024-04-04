import { AllStates, reducers } from ".";
import { combineReducers, createStore } from "redux";

export default function configureStore(
    initialState?: AllStates
){
    const rootReducer = combineReducers({
        ...reducers,
    });
    return createStore(
        rootReducer,
        initialState
    );
}