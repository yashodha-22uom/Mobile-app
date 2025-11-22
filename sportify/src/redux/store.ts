/**
 * Redux Store Configuration
 * Configures Redux Toolkit store with all slices
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import matchesReducer from './slices/matchesSlice';
import playersReducer from './slices/playersSlice';
import favoritesReducer from './slices/favoritesSlice';
import themeReducer from './slices/themeSlice';

/**
 * Configure Redux store
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    matches: matchesReducer,
    players: playersReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
