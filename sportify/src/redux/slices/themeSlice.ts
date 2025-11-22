/**
 * Theme Slice - Redux Toolkit
 * Manages dark/light theme state
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ThemeState } from '../../constants/types';
import { saveThemePreference, getThemePreference } from '../../services/storageService';

// Initial state
const initialState: ThemeState = {
  isDarkMode: false,
};

/**
 * Async thunk to load theme from storage
 */
export const loadTheme = createAsyncThunk(
  'theme/loadTheme',
  async () => {
    const isDark = await getThemePreference();
    return isDark !== null ? isDark : false;
  }
);

/**
 * Async thunk to save theme to storage
 */
export const saveTheme = createAsyncThunk(
  'theme/saveTheme',
  async (isDark: boolean) => {
    await saveThemePreference(isDark);
    return isDark;
  }
);

/**
 * Theme slice
 */
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      // Save to storage asynchronously
      saveThemePreference(state.isDarkMode);
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
      // Save to storage asynchronously
      saveThemePreference(state.isDarkMode);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTheme.fulfilled, (state, action) => {
        state.isDarkMode = action.payload;
      })
      .addCase(saveTheme.fulfilled, (state, action) => {
        state.isDarkMode = action.payload;
      });
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
