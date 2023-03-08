import React, { useState, useEffect } from "react";
import axios from "axios";
import { Picker } from '@react-native-picker/picker';
import { FlatList, Pressable, StyleSheet, View, Text } from "react-native";
import { Divider } from "react-native-elements";
import { apiEndpoint } from "../Env";

const OpponentSelector = (props) => {

    const [opponents, setOpponents] = useState([]);
    const [selectedOpponent, setSelectedOpponent] = useState(-1);

    let base = apiEndpoint() + '/player/others/';
    let id = '' + props.id;

    useEffect(() => {
        axios({
            method: 'get',
            url: base + id,
        }).then((response) => {
            setOpponents(response.data);
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
        <Pressable
            onPress={() => {setSelectedOpponent(index); props.onSelect(item);}}>
            <Text 
                style={[styles.text, (index == selectedOpponent) ? styles.gray : styles.white]}
            >
                {item.username}
            </Text>
        </Pressable>
    );

    return (
        <View style={styles.flex1}>
            <FlatList
                ListHeaderComponent={header}
                data={opponents}
                renderItem={({item, index}) => renderItem(item, index)}
                keyExtractor={ (item) => item.id }
                numColumns={1}
            />
        </View>
    );
};

export default OpponentSelector;

const styles = StyleSheet.create({
    flex1: {
        flex: 1,
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