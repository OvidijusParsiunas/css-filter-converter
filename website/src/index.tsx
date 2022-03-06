import { Provider } from 'react-redux';
import { store } from './state/store';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
