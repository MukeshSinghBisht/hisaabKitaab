import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreateItemForm from './src/price/create'; // Import the CreateItemForm component
import {HomeScreen} from './src/price/home/home';
import {ItemsListingScreen} from './src/price/list';
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    rowGap: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tabText: {
    margin: 15,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}>
            <Text
              style={[styles.tabText, {color: isFocused ? '#673ab7' : '#222'}]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
      {/* New "Create Item" button */}
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('CreateItem')}
        style={styles.tabButton}>
        <Text style={styles.tabText}>Create Item</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Items Listing" component={ItemsListingScreen} />
        <Tab.Screen name="Create Item" component={CreateItemForm} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
