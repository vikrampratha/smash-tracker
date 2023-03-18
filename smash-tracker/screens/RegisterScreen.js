import { Button } from '@rneui/themed';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { apiEndpoint } from '../Env';


const RegisterScreen = ( {navigation, route} ) => {

    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [messageText, setMessageText] = useState("");
    const [isError, setIsError] = useState(true);

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
            setPassword2("");
            setMessageText("");
            setIsError(true);
        });
        return unsubscribe;
    }, [navigation]);

    const register = () => {
        if (username === "" || password === "" || password2 === "") {
            setMessageText("Fill all required fields.")
        }
        else {
            let isValidUsername = true;
            users.forEach(element => {
                if (element.username === username) {
                    isValidUsername = false;
                }   
            });
            if (!isValidUsername) {
                setMessageText("Username already exists.");
            }
            else if (password !== password2) {
                setMessageText("Passwords must match.");
            }
            else {
                axios({
                    method: 'post',
                    url: apiEndpoint() + '/player',
                    data: {
                        "username": username,
                        "password": password
                    }
                }).then((response) => {
                    console.log(response.data);
                }).catch((response) => {
                    console.log(response.data);
                });
                setIsError(false);
                setMessageText("Registration successful!")
                console.log("success! new user: ", username, " pass: ", password);
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.login_container}>
                <Text style={styles.login_text}>Register</Text>
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
                <Text style={styles.label_text}>Repeat Password:</Text>
                <TextInput 
                    style={styles.text_input} 
                    onChangeText={setPassword2} 
                    // placeholder="password"
                    secureTextEntry={true} 
                />
                <Button
                    title="Register"
                    disabled={!isError}
                    onPress={() => register()}
                />
                <Text 
                    style={[(isError) ? styles.error : styles.success, styles.message_text]}>
                    {messageText}
                </Text>
            </View>
        </View>
    );
};

export default RegisterScreen;

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
    message_text: {
        fontSize: 14,
        // fontWeight: '500',
        paddingVertical: 10,
    },
    error: {
        color: 'darkred',
    },
    success: {
        color: 'darkseagreen',
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
        borderColor: 'black',
        width: 250,
        borderWidth: 2,
        marginVertical: 2,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
});