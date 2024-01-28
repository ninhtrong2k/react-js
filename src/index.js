import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'nprogress/nprogress.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';  /// Điều hướng
import Layout from './Layout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* ///Khi nào load hết data mới chạy PersistGate */}
    <PersistGate loading={null} persistor={persistor}>  
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
