import StoreForm from './components/createStore';
import { Provider } from 'react-redux';
import  store  from './state/store';

function App() {
  return (
    <Provider store={store}>
    <><div className="App">
      <h4>Please insert information about store</h4>
    </div>
    <div>
      <StoreForm />
      </div></></Provider>
  );
}
export default App;
