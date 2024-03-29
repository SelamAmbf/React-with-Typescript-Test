
import { createStore, combineReducers } from 'redux';
import { productReducer } from './reducers/productReducer';

const rootReducer = combineReducers({
  product: productReducer
});

const state = createStore(rootReducer);

export default state;