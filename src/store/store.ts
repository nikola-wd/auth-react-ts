import { configureStore } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/query';
import authSliceReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([]),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// setupListeners(store.dispatch);
