import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import todoReducer from './TodoSlice'
import authReducer from './LoginSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  todos:todoReducer,
});

const persistConfig = {
  key: "root", // Change the key to "root" or any other suitable key
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // Use persistedReducer as the reducer
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware({
    serializableCheck:false,
  })
  
});

export default store;
