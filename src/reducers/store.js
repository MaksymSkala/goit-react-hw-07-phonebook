import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './contactsSlice';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;