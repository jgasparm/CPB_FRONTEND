import { configureStore } from "@reduxjs/toolkit";
import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './features';

import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const storageConfig = {
    key: 'root',
    storage,
}

const myPersistReducer = persistReducer(storageConfig, rootReducer)

const middlewares = [thunk];

const store = createStore(
    myPersistReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

export default store;