import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsReducer, { fetchContacts } from './contactsSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, contactsReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    thunk: true,
    serializableCheck: false,
  }),
});

const persistor = persistStore(store);

// Виклик асинхронної операції для завантаження контактів при старті додатку
store.dispatch(fetchContacts());

export { store, persistor };