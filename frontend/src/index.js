import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import store from './redux/store';
import Routing from './components/router';
import './scss/global.scss';
import 'typeface-lato';

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider placement="top-center" autoDismiss>
      <Routing />
    </ToastProvider>
  </Provider>,
  document.getElementById('root'),
);
