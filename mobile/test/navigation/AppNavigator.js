import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screen components here
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import PriceScreen from '../screens/PriceScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator>
    {/* Define your screens here */}
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="Price" component={PriceScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
