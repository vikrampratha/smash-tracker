import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, StyleSheet } from "react-native";
// import { Picker } from '@react-native-picker/picker';
import { Picker } from "react-native";
import { apiEndpoint } from "../Env";

const OpponentPicker = (props) => {
    const [opponents, setOpponents] = useState([]);
    const [selectedOpponent, setSelectedOpponent] = useState("");

    let base = apiEndpoint() + '/player/others/';
    let id = '' + props.id;

    useEffect(() => {
        axios({
            method: 'get',
            url: base + id,
        }).then((response) => {
            setOpponents(response.data);
            setSelectedOpponent(response.data[0].username);
            props.onSelect(response.data[0]);
        });
    }, []);

    /* useEffect(() => {
        console.log(selectedOpponent);
        // props.onSelect(selectedOpponent);
    }, [selectedOpponent]); */

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectedOpponent}
                style={props.style}
                onValueChange={(itemValue, itemIndex) => {
                    // console.log(itemValue, itemIndex); 
                    setSelectedOpponent(itemValue); 
                    props.onSelect({id: opponents[itemIndex].id, username: itemValue});
                }}
            >
                {opponents.map((item, index) => {
                        return (<Picker.Item label={item.username} value={item.username} key={index}/>)
                })}
            </Picker>
        </View>
    );
};

export default OpponentPicker;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingTop: 40,
    alignItems: "center",
    margin: 2,
  }
});