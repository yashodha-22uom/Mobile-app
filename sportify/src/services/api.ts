/**
 * API Service for Sportify App
 * Handles all HTTP requests using Axios
 */

import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { getAuthToken } from './storageService';

// Base API URL - using DummyJSON for mock data
const BASE_URL = 'https://dummyjson.com';

/**
 * Create Axios instance with default configuration
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * Adds authentication token to requests
 */
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles common response errors
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle specific error cases
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const message = error.response.data || error.message;

      switch (status) {
        case 400:
          return Promise.reject({
            message: 'Bad request. Please check your input.',
            status,
          });
        case 401:
          return Promise.reject({
            message: 'Unauthorized. Please login again.',
            status,
          });
        case 403:
          return Promise.reject({
            message: 'Access forbidden.',
            status,
          });
        case 404:
          return Promise.reject({
            message: 'Resource not found.',
            status,
          });
        case 500:
          return Promise.reject({
            message: 'Server error. Please try again later.',
            status,
          });
        default:
          return Promise.reject({
            message: typeof message === 'string' ? message : 'An error occurred',
            status,
          });
      }
    } else if (error.request) {
      // Request made but no response received
      return Promise.reject({
        message: 'Network error. Please check your connection.',
        status: 0,
      });
    } else {
      // Something else happened
      return Promise.reject({
        message: error.message || 'An unexpected error occurred',
        status: 0,
      });
    }
  }
);

/**
 * Generic GET request
 */
export const get = async <T>(url: string, params?: any): Promise<T> => {
  try {
    const response = await apiClient.get<T>(url, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Generic POST request
 */
export const post = async <T>(
  url: string,
  data?: any,
  config?: any
): Promise<T> => {
  try {
    const response = await apiClient.post<T>(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Generic PUT request
 */
export const put = async <T>(url: string, data?: any): Promise<T> => {
  try {
    const response = await apiClient.put<T>(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Generic DELETE request
 */
export const del = async <T>(url: string): Promise<T> => {
  try {
    const response = await apiClient.delete<T>(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Export the API client for custom usage
 */
export default apiClient;
