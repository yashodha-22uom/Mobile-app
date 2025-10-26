/**
 * Favorites Slice - Redux Toolkit
 * Manages user favorites (matches and players)
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FavoritesState } from '../../constants/types';
import { saveFavorites, getFavorites } from '../../services/storageService';

// Initial state
const initialState: FavoritesState = {
  favoriteMatches: [],
  favoritePlayers: [],
};

/**
 * Async thunk to load favorites from storage
 */
export const loadFavoritesFromStorage = createAsyncThunk(
  'favorites/loadFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const favorites = await getFavorites();
      return favorites || { favoriteMatches: [], favoritePlayers: [] };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to load favorites');
    }
  }
);

/**
 * Async thunk to save favorites to storage
 */
export const saveFavoritesToStorage = createAsyncThunk(
  'favorites/saveFavorites',
  async (favorites: FavoritesState, { rejectWithValue }) => {
    try {
      await saveFavorites(favorites);
      return favorites;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to save favorites');
    }
  }
);

/**
 * Favorites slice
 */
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavoriteMatch: (state, action: PayloadAction<string>) => {
      if (!state.favoriteMatches.includes(action.payload)) {
        state.favoriteMatches.push(action.payload);
        // Save to storage asynchronously
        saveFavorites({
          favoriteMatches: state.favoriteMatches,
          favoritePlayers: state.favoritePlayers,
        });
      }
    },
    removeFavoriteMatch: (state, action: PayloadAction<string>) => {
      state.favoriteMatches = state.favoriteMatches.filter(
        (id) => id !== action.payload
      );
      // Save to storage asynchronously
      saveFavorites({
        favoriteMatches: state.favoriteMatches,
        favoritePlayers: state.favoritePlayers,
      });
    },
    addFavoritePlayer: (state, action: PayloadAction<string>) => {
      if (!state.favoritePlayers.includes(action.payload)) {
        state.favoritePlayers.push(action.payload);
        // Save to storage asynchronously
        saveFavorites({
          favoriteMatches: state.favoriteMatches,
          favoritePlayers: state.favoritePlayers,
        });
      }
    },
    removeFavoritePlayer: (state, action: PayloadAction<string>) => {
      state.favoritePlayers = state.favoritePlayers.filter(
        (id) => id !== action.payload
      );
      // Save to storage asynchronously
      saveFavorites({
        favoriteMatches: state.favoriteMatches,
        favoritePlayers: state.favoritePlayers,
      });
    },
    toggleFavoriteMatch: (state, action: PayloadAction<string>) => {
      if (state.favoriteMatches.includes(action.payload)) {
        state.favoriteMatches = state.favoriteMatches.filter(
          (id) => id !== action.payload
        );
      } else {
        state.favoriteMatches.push(action.payload);
      }
      // Save to storage asynchronously
      saveFavorites({
        favoriteMatches: state.favoriteMatches,
        favoritePlayers: state.favoritePlayers,
      });
    },
    toggleFavoritePlayer: (state, action: PayloadAction<string>) => {
      if (state.favoritePlayers.includes(action.payload)) {
        state.favoritePlayers = state.favoritePlayers.filter(
          (id) => id !== action.payload
        );
      } else {
        state.favoritePlayers.push(action.payload);
      }
      // Save to storage asynchronously
      saveFavorites({
        favoriteMatches: state.favoriteMatches,
        favoritePlayers: state.favoritePlayers,
      });
    },
    clearAllFavorites: (state) => {
      state.favoriteMatches = [];
      state.favoritePlayers = [];
      // Save to storage asynchronously
      saveFavorites({
        favoriteMatches: [],
        favoritePlayers: [],
      });
    },
    clearFavoriteMatches: (state) => {
      state.favoriteMatches = [];
      // Save to storage asynchronously
      saveFavorites({
        favoriteMatches: [],
        favoritePlayers: state.favoritePlayers,
      });
    },
    clearFavoritePlayers: (state) => {
      state.favoritePlayers = [];
      // Save to storage asynchronously
      saveFavorites({
        favoriteMatches: state.favoriteMatches,
        favoritePlayers: [],
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavoritesFromStorage.fulfilled, (state, action) => {
        state.favoriteMatches = action.payload.favoriteMatches;
        state.favoritePlayers = action.payload.favoritePlayers;
      })
      .addCase(saveFavoritesToStorage.fulfilled, (state, action) => {
        state.favoriteMatches = action.payload.favoriteMatches;
        state.favoritePlayers = action.payload.favoritePlayers;
      });
  },
});

export const {
  addFavoriteMatch,
  removeFavoriteMatch,
  addFavoritePlayer,
  removeFavoritePlayer,
  toggleFavoriteMatch,
  toggleFavoritePlayer,
  clearAllFavorites,
  clearFavoriteMatches,
  clearFavoritePlayers,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
