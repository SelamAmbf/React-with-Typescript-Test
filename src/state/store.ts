
import { createStore, combineReducers } from 'redux';
import { productsReducer} from './reducers/productReducer';
import { storesReducer } from './reducers/productReducer';

const rootReducer = combineReducers({
  product: productsReducer,
  store: storesReducer
});

const store = createStore(rootReducer);

export default store;