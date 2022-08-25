import { configureStore } from '@reduxjs/toolkit';
import { contactApi } from './operations';
import reducers from './reducer';

export const store = configureStore({
  reducer: {
    contacts: reducers,
    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    contactApi.middleware,
  ],
});