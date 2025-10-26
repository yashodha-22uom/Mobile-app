/**
 * Authentication Service for Sportify App
 * Handles login, register, and auth-related API calls
 */

import { post } from './api';
import { LoginCredentials, RegisterCredentials, User } from '../constants/types';

/**
 * Login Response Interface
 */
interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

/**
 * Login user with email and password
 * @param credentials - Email and password
 * @returns User data and auth token
 */
export const login = async (credentials: LoginCredentials): Promise<{
  user: User;
  token: string;
}> => {
  try {
    // DummyJSON auth endpoint
    // Use credentials: username: "emilys", password: "emilyspass"
    const response = await post<LoginResponse>('/auth/login', {
      username: credentials.email.split('@')[0], // Use email prefix as username
      password: credentials.password,
      expiresInMins: 30,
    });

    // Transform response to match our User interface
    const user: User = {
      id: response.id.toString(),
      username: response.username,
      email: response.email || `${response.username}@sportify.com`,
      firstName: response.firstName,
      lastName: response.lastName,
      memberSince: new Date().toISOString(),
    };

    return {
      user,
      token: response.token,
    };
  } catch (error: any) {
    // Handle API errors
    if (error.status === 400) {
      throw new Error('Invalid credentials. Please check your email and password.');
    }
    throw new Error(error.message || 'Login failed. Please try again.');
  }
};

/**
 * Register new user
 * @param credentials - Username, email, password, confirmPassword
 * @returns User data and auth token
 */
export const register = async (credentials: RegisterCredentials): Promise<{
  user: User;
  token: string;
}> => {
  try {
    // Since DummyJSON doesn't have a real register endpoint,
    // we'll simulate it by creating a mock response
    // In production, this would call a real register API

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Create mock user
    const user: User = {
      id: Date.now().toString(),
      username: credentials.username,
      email: credentials.email,
      memberSince: new Date().toISOString(),
    };

    // Create mock token
    const token = `mock_token_${Date.now()}`;

    return {
      user,
      token,
    };
  } catch (error: any) {
    throw new Error(error.message || 'Registration failed. Please try again.');
  }
};

/**
 * Validate auth token
 * @param token - Auth token
 * @returns Boolean indicating if token is valid
 */
export const validateToken = async (token: string): Promise<boolean> => {
  try {
    // In production, this would call an API to validate the token
    // For now, we'll just check if token exists
    return !!token;
  } catch (error) {
    return false;
  }
};

/**
 * Get current user profile
 * @returns User data
 */
export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await post<any>('/auth/me');
    
    const user: User = {
      id: response.id.toString(),
      username: response.username,
      email: response.email || `${response.username}@sportify.com`,
      firstName: response.firstName,
      lastName: response.lastName,
      memberSince: new Date().toISOString(),
    };

    return user;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch user profile.');
  }
};

/**
 * Logout user
 * Clears session on server side
 */
export const logout = async (): Promise<void> => {
  try {
    // In production, this would call an API to invalidate the token
    // For now, we'll just resolve immediately
    return Promise.resolve();
  } catch (error: any) {
    throw new Error(error.message || 'Logout failed.');
  }
};
