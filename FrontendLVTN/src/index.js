import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import App from './App';
import { AuthContextProvider } from './context/authContext';
import { Provider } from "react-redux";
import { store, persistor } from './components/redux/store';
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
        <PersistGate loading={"loading"} persistor={persistor}>
          <App />       
        </PersistGate>
      </Provider>
    </AuthContextProvider>
  </React.StrictMode>
);