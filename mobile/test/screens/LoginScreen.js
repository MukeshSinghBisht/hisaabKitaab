import React from 'react';
import { View, Text, Button } from 'react-native';

const LoginScreen = ({ navigation }) => (
  <View>
    <Text>Login Screen</Text>
    {/* Add your login UI components here */}
    <Button title="Go to Sign Up" onPress={() => navigation.navigate('SignUp')} />
  </View>
);

export default LoginScreen;
