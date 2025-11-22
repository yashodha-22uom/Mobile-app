/**
 * Storage Service for AsyncStorage with Encryption
 * Handles persistent storage for auth tokens, favorites, and theme preferences
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage Keys
const STORAGE_KEYS = {
  AUTH_TOKEN: '@sportify_auth_token',
  FAVORITES: '@sportify_favorites',
  THEME: '@sportify_theme',
  USER: '@sportify_user',
  REGISTERED_USERS: '@sportify_registered_users',
};

/**
 * Simple encryption/decryption using base64 encoding
 * React Native compatible - no Buffer usage
 */
const encrypt = async (text: string): Promise<string> => {
  try {
    // Use btoa for base64 encoding (available in React Native)
    const encoded = btoa(unescape(encodeURIComponent(text)));
    return encoded;
  } catch (error) {
    console.error('Encryption error:', error);
    return text;
  }
};

const decrypt = async (encryptedText: string): Promise<string> => {
  try {
    // Use atob for base64 decoding (available in React Native)
    const decoded = decodeURIComponent(escape(atob(encryptedText)));
    return decoded;
  } catch (error) {
    // If decryption fails, return the original text
    // This handles cases where data wasn't encrypted or is corrupted
    // Don't log here - let the caller handle it
    return encryptedText;
  }
};

/**
 * Clear all storage (useful for fixing corrupted data)
 */
export const clearAllStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
    console.log('All storage cleared successfully');
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};

/**
 * Save auth token securely
 */
export const saveAuthToken = async (token: string): Promise<void> => {
  try {
    const encrypted = await encrypt(token);
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, encrypted);
  } catch (error) {
    console.error('Error saving auth token:', error);
    throw new Error('Failed to save auth token');
  }
};

/**
 * Retrieve auth token
 */
export const getAuthToken = async (): Promise<string | null> => {
  try {
    const encrypted = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (encrypted) {
      try {
        const decrypted = await decrypt(encrypted);
        // If decryption returns the same value, it might be corrupted
        // Clear it and return null
        if (decrypted === encrypted) {
          await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
          console.log('Cleared corrupted auth token');
          return null;
        }
        return decrypted;
      } catch (decryptError) {
        // If decryption fails, clear the corrupted data
        await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        console.log('Cleared corrupted auth token after decryption error');
        return null;
      }
    }
    return null;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

/**
 * Remove auth token
 */
export const removeAuthToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error('Error removing auth token:', error);
    throw new Error('Failed to remove auth token');
  }
};

/**
 * Save user data
 */
export const saveUser = async (user: any): Promise<void> => {
  try {
    const userData = JSON.stringify(user);
    await AsyncStorage.setItem(STORAGE_KEYS.USER, userData);
  } catch (error) {
    console.error('Error saving user:', error);
    throw new Error('Failed to save user data');
  }
};

/**
 * Get user data
 */
export const getUser = async (): Promise<any | null> => {
  try {
    const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

/**
 * Remove user data
 */
export const removeUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
  } catch (error) {
    console.error('Error removing user:', error);
    throw new Error('Failed to remove user data');
  }
};

/**
 * Save favorites to storage
 */
export const saveFavorites = async (favorites: {
  favoriteMatches: string[];
  favoritePlayers: string[];
}): Promise<void> => {
  try {
    const favoritesData = JSON.stringify(favorites);
    await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, favoritesData);
  } catch (error) {
    console.error('Error saving favorites:', error);
    throw new Error('Failed to save favorites');
  }
};

/**
 * Retrieve favorites from storage
 */
export const getFavorites = async (): Promise<{
  favoriteMatches: string[];
  favoritePlayers: string[];
} | null> => {
  try {
    const favoritesData = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (favoritesData) {
      return JSON.parse(favoritesData);
    }
    return null;
  } catch (error) {
    console.error('Error getting favorites:', error);
    return null;
  }
};

/**
 * Save theme preference
 */
export const saveThemePreference = async (isDark: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(isDark));
  } catch (error) {
    console.error('Error saving theme preference:', error);
    throw new Error('Failed to save theme preference');
  }
};

/**
 * Retrieve theme preference
 */
export const getThemePreference = async (): Promise<boolean | null> => {
  try {
    const themeData = await AsyncStorage.getItem(STORAGE_KEYS.THEME);
    if (themeData !== null) {
      return JSON.parse(themeData);
    }
    return null;
  } catch (error) {
    console.error('Error getting theme preference:', error);
    return null;
  }
};

/**
 * Remove specific items on logout
 */
export const clearAuthData = async (): Promise<void> => {
  try {
    await removeAuthToken();
    await removeUser();
  } catch (error) {
    console.error('Error clearing auth data:', error);
    throw new Error('Failed to clear auth data');
  }
};

/**
 * Save registered user credentials (for local authentication)
 */
export const saveRegisteredUser = async (credentials: { email: string; password: string; username: string }): Promise<void> => {
  try {
    const existingUsers = await getRegisteredUsers();
    const newUser = {
      email: credentials.email.toLowerCase(),
      password: await encrypt(credentials.password),
      username: credentials.username,
      registeredAt: new Date().toISOString(),
    };
    
    const updatedUsers = [...existingUsers, newUser];
    await AsyncStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(updatedUsers));
  } catch (error) {
    console.error('Error saving registered user:', error);
    throw new Error('Failed to save user credentials');
  }
};

/**
 * Get all registered users
 */
export const getRegisteredUsers = async (): Promise<any[]> => {
  try {
    const usersData = await AsyncStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
    if (usersData) {
      return JSON.parse(usersData);
    }
    return [];
  } catch (error) {
    console.error('Error getting registered users:', error);
    return [];
  }
};

/**
 * Verify user credentials
 */
export const verifyCredentials = async (email: string, password: string): Promise<any | null> => {
  try {
    const users = await getRegisteredUsers();
    const user = users.find((u) => u.email === email.toLowerCase());
    
    if (user) {
      const decryptedPassword = await decrypt(user.password);
      if (decryptedPassword === password) {
        return user;
      }
    }
    return null;
  } catch (error) {
    console.error('Error verifying credentials:', error);
    return null;
  }
};

