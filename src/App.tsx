import Store from './components/Product';
import { Provider } from 'react-redux';
import  store  from './redux/store';

function App() {
  return (
    <Provider store={store}>
    <><div className="App">
      <h4>Please insert information about store</h4>
    </div>
    <div>
      <Store />
      </div></></Provider>
  );
}
export default App;
