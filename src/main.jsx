import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import Store from './Redux/Store.js';
import { UserContextProvider } from './Context/UserProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <Provider store={Store}>
        <App />
      </Provider>
    </UserContextProvider>
  </React.StrictMode>
);
