/**
 * TypeScript Interfaces and Types for Sportify App
 */

// Sport Type
export type SportType = 'Football' | 'Cricket';

// Match Status Type
export type MatchStatus = 'Live' | 'Upcoming' | 'Completed';

// Player Position Type (Football)
export type FootballPosition = 'Forward' | 'Midfielder' | 'Defender' | 'Goalkeeper';

// Player Position Type (Cricket)
export type CricketPosition = 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicket-keeper';

// Combined Player Position Type
export type PlayerPosition = FootballPosition | CricketPosition;

// Recent Form Type
export type FormResult = 'W' | 'L' | 'D';

/**
 * Match Statistics Interface
 */
export interface MatchStatistics {
  // Football stats
  possession?: [number, number];
  shots?: [number, number];
  corners?: [number, number];
  // Cricket stats
  overs?: string;
  runRate?: string;
  wickets?: [number, number];
}

/**
 * Match Lineup Interface
 */
export interface MatchLineup {
  home: string[];
  away: string[];
}

/**
 * Match Interface
 */
export interface Match {
  id: string;
  sport: SportType;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  homeScore: number | string; // String for cricket scores like "250/6"
  awayScore: number | string;
  status: MatchStatus;
  date: string;
  time: string;
  venue: string;
  league: string;
  statistics: MatchStatistics;
  lineup: MatchLineup;
}

/**
 * Player Statistics Interface
 */
export interface PlayerStatistics {
  // Football stats
  goals?: number;
  assists?: number;
  matches?: number;
  // Cricket stats
  runs?: number;
  wickets?: number;
  average?: number;
  strikeRate?: number;
}

/**
 * Player Interface
 */
export interface Player {
  id: string;
  sport: SportType;
  name: string;
  team: string;
  position: PlayerPosition;
  image: string;
  jerseyNumber: number;
  age: number;
  nationality: string;
  height: string;
  weight: string;
  rating: number;
  statistics: PlayerStatistics;
  recentForm: FormResult[];
}

/**
 * User Interface
 */
export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  memberSince?: string;
}

/**
 * Auth State Interface
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

/**
 * Matches State Interface
 */
export interface MatchesState {
  matches: Match[];
  selectedSport: SportType | 'All';
  loading: boolean;
  error: string | null;
}

/**
 * Players State Interface
 */
export interface PlayersState {
  players: Player[];
  selectedSport: SportType | 'All';
  loading: boolean;
  error: string | null;
}

/**
 * Favorites State Interface
 */
export interface FavoritesState {
  favoriteMatches: string[];
  favoritePlayers: string[];
}

/**
 * Theme State Interface
 */
export interface ThemeState {
  isDarkMode: boolean;
}

/**
 * Login Credentials Interface
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Register Credentials Interface
 */
export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * API Error Response Interface
 */
export interface ApiError {
  message: string;
  status?: number;
}

/**
 * Navigation Types
 */

// Auth Stack Param List
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

// Home Stack Param List
export type HomeStackParamList = {
  HomeMain: undefined;
  MatchDetails: { matchId: string };
};

// Players Stack Param List
export type PlayersStackParamList = {
  PlayersMain: undefined;
  PlayerDetails: { playerId: string };
};

// Favorites Stack Param List
export type FavoritesStackParamList = {
  FavoritesMain: undefined;
  MatchDetails: { matchId: string };
  PlayerDetails: { playerId: string };
};

// Profile Stack Param List
export type ProfileStackParamList = {
  ProfileMain: undefined;
};

// Bottom Tab Param List
export type BottomTabParamList = {
  Home: undefined;
  Players: undefined;
  Favorites: undefined;
  Profile: undefined;
};

// Root Stack Param List
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};
