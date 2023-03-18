import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import UsersScreen from "../screens/UsersScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState(-1);
    return (
        <Stack.Navigator>
            {
                (loggedIn == false) ? 
                    (
                        <>
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{title: 'Login',}}
                            initialParams={{setLoggedIn, setUserId}} />
                        <Stack.Screen
                            name="Register"
                            component={RegisterScreen}
                            options={{title: 'Register',}} />
                        </>
                    ) : 
                    (
                        <Stack.Screen 
                            name="Home" 
                            component={HomeScreen}
                            initialParams={{userId: userId}} 
                            options={{ headerShown: false }} />                      
                    )
            }
            {/* <Stack.Screen name="Users" component={UsersScreen} />
            <Stack.Screen name="Home" component={HomeScreen} 
                // options={{ headerShown: false }}
            /> */}
        </Stack.Navigator>
    );
};

export default AppNavigator;