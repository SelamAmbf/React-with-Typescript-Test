import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store/configureStore';
import { BrowserRouter } from 'react-router-dom';
import { browserHistory } from './components/UserManagement/browserHistory';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <Provider store={configureStore(browserHistory)}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}