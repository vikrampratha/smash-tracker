import React, { useState, useEffect } from "react";
import axios from "axios";
import { FlatList, Image, Pressable, StyleSheet, View, Text } from "react-native";
// import { Avatar, ListItem } from "@rneui/themed";
import Images from "../Images";
import { Divider } from "react-native-elements";

import {apiEndpoint} from "../Env";

const FighterOptions = (props) => {

    //blah
    const [fighters, setFighters] = useState([]);
    const [selectedFighter, setSelectedFighter] = useState(-1);

    useEffect(() => {
        axios({
            method: 'get',
            url: apiEndpoint() + '/fighter',
        }).then((response) => {
            setFighters(response.data);
        });
    }, []);

    const header = () => {
        return (
            <View>
                <Text style={styles.text}>{props.num} Fighter Select</Text>
                <Divider orientation="vertical" />
            </View>
        );
    };

    const renderItem = (item, index) => (
        <Pressable
            onPress={() => {setSelectedFighter(index); props.onSelect(item);}}>
            <Image 
                source={Images[item.name]} 
                style={styles.img}
                // style={[styles.img, (index == selectedFighter) ? styles.black : styles.white]}
            />
        </Pressable>
    );

    return (
        <View style={styles.fighter_options_container}>
            <FlatList
                // ListHeaderComponent={header}
                data={fighters}
                renderItem={({item, index}) => renderItem(item, index)}
                keyExtractor={ (item) => item.id }
                numColumns={4}
            />
        </View>
    );
};

export default FighterOptions;

const styles = StyleSheet.create({
    fighter_options_container: {
        flex: 1,
    },
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
    black: {
        backgroundColor: 'black',
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