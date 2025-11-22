/**
 * Validation Schemas using Yup for Sportify App
 */

import * as Yup from 'yup';

/**
 * Login Validation Schema
 */
export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required')
    .trim()
    .lowercase(),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
    .matches(/[0-9]/, 'Password must contain at least one number'),
});

/**
 * Register Validation Schema
 */
export const registerValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .required('Username is required')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    )
    .trim(),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required')
    .trim()
    .lowercase(),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

/**
 * Edit Profile Validation Schema (Optional)
 */
export const editProfileValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .required('Username is required')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    )
    .trim(),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required')
    .trim()
    .lowercase(),
});

/**
 * Initial Form Values
 */

export const loginInitialValues = {
  email: '',
  password: '',
};

export const registerInitialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const editProfileInitialValues = {
  username: '',
  email: '',
};
