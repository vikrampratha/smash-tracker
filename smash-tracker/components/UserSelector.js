import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Text, View, StyleSheet, Pressable, FlatList } from "react-native";
import { Divider } from "react-native-elements";
import { apiEndpoint } from "../Env";

const UserSelector = (props) => {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(-1);

    useEffect(() => {
        axios({
            method: 'get',
            url: apiEndpoint() + '/player/',
        }).then((response) => {
            setUsers(response.data);
        });
    }, []);

    const header = () => {
        return (
            <View>
                <Text style={styles.text}>Select Opponent</Text>
                <Divider orientation="vertical" />
            </View>
        );
    };

    const renderItem = (item, index) => (
        <Pressable onPress={() => {setSelectedUser(index); props.onSelect(item.id);}} >
            <Text style={[styles.text, (index == selectedUser) ? styles.gray : styles.white]} >
                {item.username}
            </Text>
        </Pressable>
    );

    return (
        <View style={styles.user_selector_container}>
            <FlatList
                ListHeaderComponent={header}
                data={users}
                renderItem={({item, index}) => renderItem(item, index)}
                keyExtractor={ (item) => item.id }
                numColumns={1}
            />
        </View>
    );
};

export default UserSelector;

const styles = StyleSheet.create({
    user_selector_container: {
        marginTop: '10px',
        marginBottom: '10px',
    },
    layout: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        flex: 1,
        backgroundColor: 'black',
      },
    title: {
        fontSize: 32,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    img: {
        flex: 1,
        aspectRatio: 1,
        width: '100%',
        height: 50,
    },
    gray: {
        backgroundColor: 'gray',
    },
    white: {
        backgroundColor: '#fff',
    },
    text: {
        fontFamily: 'AppleColorEmoji',
        fontSize: 20,
        textAlign: 'center',
    }
});