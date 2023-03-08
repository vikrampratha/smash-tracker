import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Picker } from '@react-native-picker/picker';
import { Picker } from "react-native";
import { apiEndpoint } from "../Env";

const PlayerPicker = (props) => {

    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState("all");

    let header = apiEndpoint() + '/player/others/';
    let id = '' + props.id;

    useEffect(() => {
        axios({
            method: 'get',
            url: header + id,
        }).then((response) => {
            setPlayers(response.data);
        });
    }, []);

    return (
        <Picker
            selectedValue={selectedPlayer}
            style={props.style}
            itemStyle={props.itemStyle}
            onValueChange={(itemValue) => {setSelectedPlayer(itemValue); props.onUpdate({picker: 'playerpicker', val: itemValue});}}>
                <Picker.Item label="All" value="all" />
                {players.map((item, index) => {
                    return (<Picker.Item label={item.username} value={item.username} key={index}/>)
                })}
        </Picker>
    );
};

export default PlayerPicker;


