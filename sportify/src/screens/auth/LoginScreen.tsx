/**
 * Login Screen
 * User login with email and password using Formik and Yup validation
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
import { loginValidationSchema, loginInitialValues } from '../../utils/validation';
import { loginUser, clearError } from '../../redux/slices/authSlice';
import { AppDispatch, RootState } from '../../redux/store';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { spacing, fontSize, fontWeight } from '../../constants/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../constants/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (error) {
      Alert.alert('Login Failed', error, [
        { text: 'OK', onPress: () => dispatch(clearError()) },
      ]);
    }
  }, [error]);

  const handleLogin = async (values: typeof loginInitialValues) => {
    try {
      await dispatch(loginUser(values)).unwrap();
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
          <Feather name="activity" size={60} color={colors.primary} />
          <Text style={[styles.title, { color: colors.text }]}>Sportify</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Your Sports Companion
          </Text>
        </View>

        <Formik
          initialValues={loginInitialValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleLogin}
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
                placeholder="Enter your password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={errors.password}
                touched={touched.password}
                secureTextEntry
                leftIcon="lock"
              />

              <Button
                title="Login"
                onPress={handleSubmit}
                loading={loading}
                fullWidth
                style={styles.loginButton}
              />

              <View style={styles.divider}>
                <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                <Text style={[styles.dividerText, { color: colors.textSecondary }]}>
                  OR
                </Text>
                <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={styles.registerContainer}
              >
                <Text style={[styles.registerText, { color: colors.textSecondary }]}>
                  Don't have an account?{' '}
                  <Text style={{ color: colors.primary, fontWeight: fontWeight.semibold }}>
                    Sign Up
                  </Text>
                </Text>
              </TouchableOpacity>

              {/* Demo credentials hint */}
              <View style={[styles.hintContainer, { backgroundColor: colors.surface }]}>
                <Feather name="info" size={16} color={colors.info} />
                <Text style={[styles.hintText, { color: colors.textSecondary }]}>
                  Demo: Use any email and password (min 6 chars with a number)
                </Text>
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
    justifyContent: 'center',
    padding: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: fontSize.huge,
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
  loginButton: {
    marginTop: spacing.md,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: spacing.md,
    fontSize: fontSize.sm,
  },
  registerContainer: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  registerText: {
    fontSize: fontSize.md,
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 8,
    marginTop: spacing.xl,
  },
  hintText: {
    fontSize: fontSize.sm,
    marginLeft: spacing.sm,
    flex: 1,
  },
});

export default LoginScreen;
