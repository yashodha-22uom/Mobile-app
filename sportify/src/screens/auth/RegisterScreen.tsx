/**
 * Register Screen
 * User registration with username, email, password, and confirm password
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { registerValidationSchema, registerInitialValues } from '../../utils/validation';
import { registerUser, clearError } from '../../redux/slices/authSlice';
import { AppDispatch, RootState } from '../../redux/store';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { spacing, fontSize, fontWeight } from '../../constants/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../constants/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (error) {
      Alert.alert('Registration Failed', error, [
        { text: 'OK', onPress: () => dispatch(clearError()) },
      ]);
    }
  }, [error]);

  const handleRegister = async (values: typeof registerInitialValues) => {
    try {
      await dispatch(registerUser(values)).unwrap();
      // Navigation is handled by AppNavigator based on auth state
    } catch (err) {
      // Error is handled by the effect above
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={24} color={colors.text} />
          </TouchableOpacity>
          
          <Feather name="user-plus" size={50} color={colors.primary} />
          <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Join Sportify today
          </Text>
        </View>

        <Formik
          initialValues={registerInitialValues}
          validationSchema={registerValidationSchema}
          onSubmit={handleRegister}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formContainer}>
              <Input
                label="Username"
                placeholder="Choose a username"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                error={errors.username}
                touched={touched.username}
                autoCapitalize="none"
                leftIcon="user"
              />

              <Input
                label="Email"
                placeholder="Enter your email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={errors.email}
                touched={touched.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                leftIcon="mail"
              />

              <Input
                label="Password"
                placeholder="Create a password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={errors.password}
                touched={touched.password}
                secureTextEntry
                leftIcon="lock"
              />

              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                secureTextEntry
                leftIcon="lock"
              />

              <Button
                title="Sign Up"
                onPress={handleSubmit}
                loading={loading}
                fullWidth
                style={styles.registerButton}
              />

              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.loginContainer}
              >
                <Text style={[styles.loginText, { color: colors.textSecondary }]}>
                  Already have an account?{' '}
                  <Text style={{ color: colors.primary, fontWeight: fontWeight.semibold }}>
                    Login
                  </Text>
                </Text>
              </TouchableOpacity>

              {/* Requirements hint */}
              <View style={[styles.hintContainer, { backgroundColor: colors.surface }]}>
                <Feather name="info" size={16} color={colors.info} />
                <View style={styles.hintTextContainer}>
                  <Text style={[styles.hintText, { color: colors.textSecondary }]}>
                    Password requirements:
                  </Text>
                  <Text style={[styles.hintText, { color: colors.textSecondary }]}>
                    • At least 6 characters
                  </Text>
                  <Text style={[styles.hintText, { color: colors.textSecondary }]}>
                    • Contains at least one number
                  </Text>
                  <Text style={[styles.hintText, { color: colors.textSecondary }]}>
                    • Contains at least one letter
                  </Text>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.xl,
    paddingTop: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: spacing.sm,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    marginTop: spacing.md,
  },
  subtitle: {
    fontSize: fontSize.md,
    marginTop: spacing.xs,
  },
  formContainer: {
    width: '100%',
  },
  registerButton: {
    marginTop: spacing.md,
  },
  loginContainer: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  loginText: {
    fontSize: fontSize.md,
  },
  hintContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: 8,
    marginTop: spacing.lg,
  },
  hintTextContainer: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  hintText: {
    fontSize: fontSize.sm,
    marginBottom: spacing.xs,
  },
});

export default RegisterScreen;
