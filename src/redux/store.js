import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/auth-slice';

import {
  FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE,
  REGISTER, REHYDRATE
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userApi } from './auth/auth-operations';
import filter from './reducer';

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['token'],
};
export const store = configureStore({
  reducer: {
    auth: persistReducer(userPersistConfig, authSlice),
    filter,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    userApi.middleware,
  ],
});
export const persistor = persistStore(store);