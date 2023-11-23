import VoiceExtended from '../Voice';
import * as React from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity} from 'react-native';
export function HomeScreen({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e6ffe6',
      }}>
      {/* <Text style={{marginTop: 200, fontSize: 20, fontWeight: "bold"}}>Ask me</Text> */}
      <VoiceExtended />
      {/* <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        /> */}
    </View>
  );
}
