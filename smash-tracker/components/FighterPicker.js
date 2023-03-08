import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Picker } from '@react-native-picker/picker';
import { Picker } from "react-native";
import { apiEndpoint } from "../Env";

const FighterPicker = (props) => {

    const [fighters, setFighters] = useState([]);
    const [selectedFighter, setSelectedFighter] = useState("all");

    useEffect(() => {
        axios({
            method: 'get',
            url: apiEndpoint() + '/fighter',
        }).then((response) => {
            setFighters(response.data);
        });
    }, []);

    return (
        <Picker
            selectedValue={selectedFighter}
            style={props.style}
            itemStyle={props.itemStyle}
            onValueChange={(itemValue) => {setSelectedFighter(itemValue); props.onUpdate({picker: 'fighterpicker', val: itemValue, id: props.id});}}>
                <Picker.Item label="All" value="all" />
                {fighters.map((item, index) => {
                    return (<Picker.Item label={item.name} value={item.name} key={index}/>)
                })}
        </Picker>
    );
};

export default FighterPicker;