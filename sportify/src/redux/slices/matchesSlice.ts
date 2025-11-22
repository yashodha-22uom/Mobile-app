/**
 * Matches Slice - Redux Toolkit
 * Manages matches data state
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MatchesState, Match } from '../../constants/types';
import { mockMatches } from '../../data/mockMatches';
import { delay } from '../../utils/helpers';

// Initial state
const initialState: MatchesState = {
  matches: [],
  selectedSport: 'All',
  loading: false,
  error: null,
};

/**
 * Async thunk to fetch all matches
 */
export const fetchMatches = createAsyncThunk(
  'matches/fetchMatches',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call with delay
      await delay(800);
      
      // In production, this would be an API call:
      // const response = await api.get('/matches');
      // return response.data;
      
      return mockMatches;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch matches');
    }
  }
);

/**
 * Async thunk to fetch match details by ID
 */
export const fetchMatchDetails = createAsyncThunk(
  'matches/fetchMatchDetails',
  async (matchId: string, { rejectWithValue }) => {
    try {
      // Simulate API call with delay
      await delay(500);
      
      // Find match by ID from mock data
      const match = mockMatches.find((m) => m.id === matchId);
      
      if (!match) {
        return rejectWithValue('Match not found');
      }
      
      return match;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch match details');
    }
  }
);

/**
 * Async thunk to refresh matches (pull-to-refresh)
 */
export const refreshMatches = createAsyncThunk(
  'matches/refreshMatches',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call with delay
      await delay(1000);
      
      return mockMatches;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to refresh matches');
    }
  }
);

/**
 * Matches slice
 */
const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    setMatches: (state, action: PayloadAction<Match[]>) => {
      state.matches = action.payload;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateMatch: (state, action: PayloadAction<Match>) => {
      const index = state.matches.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.matches[index] = action.payload;
      }
    },
    setSportFilter: (state, action: PayloadAction<'All' | 'Football' | 'Cricket'>) => {
      state.selectedSport = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Matches
      .addCase(fetchMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.matches = action.payload;
        state.error = null;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch Match Details
      .addCase(fetchMatchDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatchDetails.fulfilled, (state, action) => {
        state.loading = false;
        // Update match in the list if it exists
        const index = state.matches.findIndex((m) => m.id === action.payload.id);
        if (index !== -1) {
          state.matches[index] = action.payload;
        } else {
          state.matches.push(action.payload);
        }
        state.error = null;
      })
      .addCase(fetchMatchDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Refresh Matches
      .addCase(refreshMatches.pending, (state) => {
        state.error = null;
      })
      .addCase(refreshMatches.fulfilled, (state, action) => {
        state.matches = action.payload;
        state.error = null;
      })
      .addCase(refreshMatches.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setMatches, setLoading, setError, clearError, updateMatch, setSportFilter } = matchesSlice.actions;
export default matchesSlice.reducer;
