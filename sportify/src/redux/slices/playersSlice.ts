/**
 * Players Slice - Redux Toolkit
 * Manages players data state
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { PlayersState, Player } from '../../constants/types';
import { mockPlayers } from '../../data/mockPlayers';
import { delay } from '../../utils/helpers';

// Initial state
const initialState: PlayersState = {
  players: [],
  selectedSport: 'All',
  loading: false,
  error: null,
};

/**
 * Async thunk to fetch all players
 */
export const fetchPlayers = createAsyncThunk(
  'players/fetchPlayers',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call with delay
      await delay(800);
      
      // In production, this would be an API call:
      // const response = await api.get('/players');
      // return response.data;
      
      return mockPlayers;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch players');
    }
  }
);

/**
 * Async thunk to fetch player details by ID
 */
export const fetchPlayerDetails = createAsyncThunk(
  'players/fetchPlayerDetails',
  async (playerId: string, { rejectWithValue }) => {
    try {
      // Simulate API call with delay
      await delay(500);
      
      // Find player by ID from mock data
      const player = mockPlayers.find((p) => p.id === playerId);
      
      if (!player) {
        return rejectWithValue('Player not found');
      }
      
      return player;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch player details');
    }
  }
);

/**
 * Async thunk to search players by name
 */
export const searchPlayers = createAsyncThunk(
  'players/searchPlayers',
  async (query: string, { rejectWithValue }) => {
    try {
      // Simulate API call with delay
      await delay(300);
      
      // Filter players by name (case-insensitive)
      const filtered = mockPlayers.filter((player) =>
        player.name.toLowerCase().includes(query.toLowerCase())
      );
      
      return filtered;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to search players');
    }
  }
);

/**
 * Async thunk to filter players by position
 */
export const filterPlayersByPosition = createAsyncThunk(
  'players/filterPlayersByPosition',
  async (position: string, { rejectWithValue }) => {
    try {
      // Simulate API call with delay
      await delay(300);
      
      if (position === 'All') {
        return mockPlayers;
      }
      
      // Filter players by position
      const filtered = mockPlayers.filter((player) => player.position === position);
      
      return filtered;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to filter players');
    }
  }
);

/**
 * Players slice
 */
const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<Player[]>) => {
      state.players = action.payload;
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
    updatePlayer: (state, action: PayloadAction<Player>) => {
      const index = state.players.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.players[index] = action.payload;
      }
    },
    setSportFilter: (state, action: PayloadAction<'All' | 'Football' | 'Cricket'>) => {
      state.selectedSport = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Players
      .addCase(fetchPlayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.loading = false;
        state.players = action.payload;
        state.error = null;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch Player Details
      .addCase(fetchPlayerDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayerDetails.fulfilled, (state, action) => {
        state.loading = false;
        // Update player in the list if it exists
        const index = state.players.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.players[index] = action.payload;
        } else {
          state.players.push(action.payload);
        }
        state.error = null;
      })
      .addCase(fetchPlayerDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Search Players
      .addCase(searchPlayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPlayers.fulfilled, (state, action) => {
        state.loading = false;
        state.players = action.payload;
        state.error = null;
      })
      .addCase(searchPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Filter Players by Position
      .addCase(filterPlayersByPosition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterPlayersByPosition.fulfilled, (state, action) => {
        state.loading = false;
        state.players = action.payload;
        state.error = null;
      })
      .addCase(filterPlayersByPosition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPlayers, setLoading, setError, clearError, updatePlayer, setSportFilter } = playersSlice.actions;
export default playersSlice.reducer;
