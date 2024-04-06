import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { thunk } from 'redux-thunk';
import { connectRouter, routerMiddleware } from "connected-react-router";
import { History } from "history";
import { AllStates, reducers } from ".";
import { StoreEnhancer } from 'redux';


export default function configureStore(
    history: History,
    initialState?: AllStates
){
    const middleware = [thunk, routerMiddleware(history)];
    const rootReducer = combineReducers({
        ...reducers,
        router: connectRouter(history),
    });
    const enhancers: StoreEnhancer[] = [];
    const windowIfDefined = typeof window === "undefined" ? null : (window as any);
    if (typeof windowIfDefined !== 'undefined' && typeof windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__ === 'function') {
        enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__() as StoreEnhancer);
      }
    return createStore(
        rootReducer,
        //@ts-ignore
        initialState,
        //@ts-ignore
        compose(applyMiddleware(...middleware), ...enhancers)
    );
}