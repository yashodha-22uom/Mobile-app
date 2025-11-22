/**
 * Auth Navigator
 * Stack navigator for authentication screens
 */

import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../constants/types';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
