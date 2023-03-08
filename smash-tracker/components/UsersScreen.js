import { Button } from '@rneui/themed';
import axios from 'axios';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import UserPicker from './UserPicker';
import UserSelector from './UserSelector';
import { apiEndpoint } from '../Env';


const UsersScreen = ( {navigation} ) => {

    const [userId, setUserId] = useState(-1);
    const [text, setText] = useState("");

    const updateUser = (id) => {
        setUserId(id);
        // console.log(userId);
    }

    const addUser = () => {
        console.log("pressed " + text);
        if (text === "") {
            console.log("invalid");
            alert("invalid");
            return;
        }
        axios({
            method: 'post',
            url: apiEndpoint() + '/player',
            data: {
                "username": text
            }
        }).then((response) => {
            setText("");
            console.log(response.data);
        }).catch((response) => {
            console.log(response.data);
        });
    } 

    return (
        <View style={styles.container}>
            {/* <UserSelector onSelect={(id) => updateUser(id)}/> */}
            <View style={styles.user_select_container}>
                <Text style={styles.section_text}>Choose User</Text>
                <UserPicker style={styles.picker} onUpdate={(id) => updateUser(id)}/>
                <Button
                    title="GO"
                    disabled={userId == -1}
                    onPress={() => navigation.navigate("Home", { userId: userId })}
                />
            </View>
            <View style={styles.user_add_container}>
                <Text style={styles.section_text}>Add User</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={setText}
                    value={text}
                />
                <Button
                    title="ADD"
                    disabled={text == ""}
                    onPress={addUser}
                />
            </View>
        </View>
    );
};

export default UsersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'lightblue',
        alignItems: 'center',
        alignContent: 'center',
        // justifyContent: 'center',
        justifyContent: 'space-evenly',
        padding: 2,
    },
    user_select_container: {
        // flex: .3,
        flexDirection: 'column',
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // alignContent: 'center',
        // justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 2,
        marginVertical: 2,
    },
    user_add_container: {
        // flex: .3,
        flexDirection: 'column',
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // alignContent: 'center',
        // justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 2,
        marginVertical: 2,
    },
    section_text: {
        // flex: .2,
        // fontFamily: 'AppleColorEmoji',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'black',
        textAlign: 'center',
    },
    picker: {
        // height: 100, 
        // width: 100,
        // flex: .25, 
        // fontFamily: 'AppleColorEmoji',
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        flex: .5,
        fontSize: 15,
        color: 'black',
        alignContent: 'stretch',
        // backgroundColor: 'light_blue'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});