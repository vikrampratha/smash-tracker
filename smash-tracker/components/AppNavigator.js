import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "./HomeScreen";
import UsersScreen from "./UsersScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Users" component={UsersScreen} />
            <Stack.Screen name="Home" component={HomeScreen} 
                // options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;