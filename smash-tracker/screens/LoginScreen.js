import { Button } from '@rneui/themed';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { apiEndpoint } from '../Env';


const LoginScreen = ( {navigation, route} ) => {

    const [users, setUsers] = useState([]);
    // const [userId, setUserId] = useState(-1);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");
    const { setLoggedIn, setUserId } = route.params;

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            axios({
                method: 'get',
                url: apiEndpoint() + '/player',
            }).then((response) => {
                setUsers(response.data);
            });
            setUsername("");
            setPassword("");
            setErrorText("");
        });
        return unsubscribe; 
    }, []);

    const login = () => {
        let isValidUsername = false;
        let isCorrectPassword = false;
        let userId = -1;
        users.forEach(element => {
            // console.log("element: ", element.username);
            // console.log("user id: ", element.id);
            if (element.username === username) {
                isValidUsername = true;
                isCorrectPassword = (element.password === password)
                userId = element.id;
            }   
        });
        if (isValidUsername && isCorrectPassword) {
            // console.log("logged in user id: ", userId);
            setUserId(userId);
            setLoggedIn(true);
        }
        else if (!isValidUsername) {
            setErrorText("Username not found.");
        }
        else if (!isCorrectPassword) {
            setErrorText("Incorrect password.");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SmashTracker</Text>
            <Text style={styles.subtitle}>by Vikram Pratha</Text>
            <View style={styles.login_container}>
                <Text style={styles.login_text}>Login</Text>
                <Text style={styles.label_text}>Username:</Text>
                <TextInput 
                    style={styles.text_input} 
                    onChangeText={setUsername} 
                    // placeholder="username" 
                />
                <Text style={styles.label_text}>Password:</Text>
                <TextInput 
                    style={styles.text_input} 
                    onChangeText={setPassword} 
                    // placeholder="password"
                    secureTextEntry={true} 
                />
                <Button
                    title="Log In"
                    onPress={() => login()}
                />
                <Text style={styles.error_text}>{errorText}</Text>
                <Text style={styles.link_text}>Forgot password?</Text>
            </View>
            <View style={styles.register_container}>
                <Text style={styles.label_text}>New to SmashTracker?</Text>
                <Pressable onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.link_text}>Register</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: 'lightblue',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        // justifyContent: 'space-evenly',
        // padding: 2,
    },
    title: {
        fontSize: 60,
        fontWeight: '500',
        color: '#333',
        // marginBottom: 10,
    },
    subtitle: {
        fontSize: 24,
        fontWeight: '350',
        color: '#333',
        marginBottom: 30,
        // paddingVertical: 5,
    },
    login_container: {
        // flex: .3,
        flexDirection: 'column',
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // alignContent: 'center',
        // justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 2,
        marginVertical: 2,
        paddingHorizontal: 25,
        paddingVertical: 10,
    },
    login_text: {
        fontSize: 28,
        fontWeight: '500',
        color: '#333',
        marginBottom: 10,
    },
    link_text: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        paddingVertical: 5,
        // marginBottom: 30,
    },
    error_text: {
        fontSize: 14,
        // fontWeight: '500',
        color: 'darkred',
        paddingVertical: 10,
    },
    label_text: {
        fontSize: 16,
        fontWeight: '350',
        color: '#333',
        paddingVertical: 5,
    },
    text_input: {
        height: 40,
        margin: 12,
        borderWidth: 2,
        padding: 10,
    },
    register_container: {
        // flex: .3,
        flexDirection: 'row',
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // alignContent: 'center',
        justifyContent: 'space-between',
        // borderColor: 'black',
        // borderWidth: 2,
        width: 250,
        marginVertical: 2,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
});