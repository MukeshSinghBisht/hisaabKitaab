import React from 'react';
import { View, Text, Button } from 'react-native';

const SignUpScreen = ({ navigation }) => (
  <View>
    <Text>Sign Up Screen</Text>
    {/* Add your sign-up UI components here */}
    <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
  </View>
);

export default SignUpScreen;