import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { StyleSheet, Text, View } from 'react-native';
import AddGameScreen from '../components/AddGameScreen';
import GamesScreen from '../components/GamesScreen';
import StatsScreen from '../components/StatsScreen';
import { TabNavContext } from '../context/TabNavContext';

const Tab = createBottomTabNavigator();

const HomeScreen = ( {route} ) => {

    const {userId} = route.params;

    return (
        <TabNavContext.Provider value={userId}>
            <Tab.Navigator initialRouteName='Games'>
                {/* <Tab.Screen name = "Stats" component={StatsScreen} options={{ headerShown: false }} /> */}
                <Tab.Screen name = "Games" component={GamesScreen} options={{ headerShown: false }} />
                <Tab.Screen name = "AddGame" component={AddGameScreen} options={{ headerShown: false }} />
            </Tab.Navigator>
        </TabNavContext.Provider>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});