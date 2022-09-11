import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux';
import  store  from './app/store';
import { persistor } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store={store}>        
        <PersistGate loading={null} persistor={persistor}>
                <App />
        </PersistGate>
   </Provider>
)