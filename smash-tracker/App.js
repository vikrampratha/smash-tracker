// import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';

import StatsScreen from './components/StatsScreen';
import GamesScreen from "./components/GamesScreen";
import AddGameScreen from "./components/AddGameScreen";
import AppNavigator from "./components/AppNavigator";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Tab.Navigator>
        <Tab.Screen name = "Stats" component={StatsScreen} />
        <Tab.Screen name = "Games" component={GamesScreen} />
        <Tab.Screen name = "AddGame" component={AddGameScreen} />
      </Tab.Navigator> */}
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
