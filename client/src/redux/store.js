import {configureStore , combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import {persistReducer , persistStore , FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,} from 'redux-persist'
import storage from 'redux-persist/lib/storage';


const rootReducer = combineReducers({user : userReducer});

const persistConfig = {
    key: 'root',
    version : 1,
    storage
};

const persistedReducer = persistReducer(persistConfig , rootReducer);



export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});

export const persistor = persistStore(store);

