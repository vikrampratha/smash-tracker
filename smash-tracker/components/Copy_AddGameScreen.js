import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Alert, Pressable, Image } from 'react-native';
import FighterOptions from './FighterOptions';
import FighterSelector from './FighterSelector';
import OpponentSelector from './OpponentSelector';
import PlayerPicker from './PlayerPicker';
import { TabNavContext } from './TabNavContext';
import Images from "../Images";

export default function AddGameScreen() {

    const userId = React.useContext(TabNavContext);
    const [selectedFighter1, setSelectedFighter1] = useState({"id": 3, "name": "Bayonetta", "icon": "Bayonetta"});
    const [selectedFighter2, setSelectedFighter2] = useState({"id": 3, "name": "Bayonetta", "icon": "Bayonetta"});

    const [opponent, setOpponent] = useState({"id": -1, "username": ""});
    const [outcome, setOutcome] = useState(1);

    const promptUser = () => {
        console.log("prompt user");
    }

    const updateFighter1 = (fighter) => {
        setSelectedFighter1(fighter);
        console.log(fighter);
    }

    const updateFighter2 = (fighter) => {
        setSelectedFighter2(fighter);
        console.log(fighter);
    }

    const updateOpponent = (opponent) => {
        setOpponent(opponent);
        console.log(opponent);
    }

    const addGame = () => {
        console.log("pressed");
        console.log(selectedFighter1.name);
        console.log(selectedFighter2.name);
        if (opponent.username === "" ||
            selectedFighter1.name === "" ||
            selectedFighter2.name === "") {
                console.log("invalid");
                alert("invalid");
                return;
        }
        axios({
            method: 'post',
            url: 'http://MSI:8080/game',
            data: {
                "player1Id": userId,
                "player2Id": opponent.id,
                "fighter1Id": selectedFighter1.id,
                "fighter2Id": selectedFighter2.id,
                "outcome": outcome,
                "date": new Date().getTime()
            }
        }).then((response) => {
            console.log(response.data);
        }).catch((response) => {
            console.log(response.data);
        });
    } 

    return (
        <View style={styles.container}>
            {/* <View style={styles.fighter_selectors}>
                    <FighterSelector onSelect={(fighter) => updateFighter1(fighter)}/>
                    <FighterSelector onSelect={(fighter) => updateFighter2(fighter)}/>
                </View> */}
            <View style={styles.opponent_group}>
                <OpponentSelector id={'' + userId} onSelect={(opponent) => updateOpponent(opponent)}/>
            </View>
            {/* <View style={styles.fighter_selector_group}>
                <FighterOptions style={styles.fighter_selector} num="P1" onSelect={(fighter) => updateFighter1(fighter)} />
                <FighterOptions style={styles.fighter_selector} num="P2" onSelect={(fighter) => updateFighter2(fighter)} />
            </View>
            <View style={styles.label_group}>
                <Text style={styles.text}>{selectedFighter1.name}</Text>
                <Text style={styles.text}> vs </Text>
                <Text style={styles.text}>{selectedFighter2.name}</Text>
            </View> */}
            <View style={styles.versus_group}>
                <Pressable
                    onPress={() => promptUser()}>
                    <Image 
                        source={Images[selectedFighter1.name]} 
                        style={styles.fighter} 
                    />
                </Pressable>
                <Text style={styles.text}>VS</Text>
                <Pressable
                    onPress={() => promptUser()}>
                    <Image 
                        source={Images[selectedFighter2.name]} 
                        style={styles.fighter} 
                    />
                </Pressable>
            </View>
            <View style={styles.button_group}>
            <Picker
                style={styles.picker} 
                selectedValue={outcome}
                onValueChange={(o) => setOutcome(o)}
            >
                <Picker.Item label="Win" value={1} />
                <Picker.Item label="Lose" value={0} />
            </Picker>
            <Button 
                style={styles.button}
                title="Add Game"
                onPress={addGame}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'space-between',
    },
    opponent_group: {
        flex: .2,
        // flexDirection: 'row',
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    fighter_selector_group: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'space-around',
    },
    fighter_selector: {
        flex: .5,
        flexDirection: 'column',
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    label_group: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    fighter_label: {
        flex: 1,
        // flexDirection: 'row',
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    button_group: {
        flex: .2,
        // flexDirection: 'column',
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        // justifyContent: 'space-evenly',
        flexDirection: 'row',
        // alignContent: 'center',
        justifyContent: 'space-evenly',
    },
    picker: {
        // height: 100, 
        // width: 100,
        flex: .5,
    },
    button: {
        // height: 100, 
        // width: 100,
        flex: .5,
        // alignItems: 'flex-end',
        // justifyContent: 'center',
    },
    text: {
        // flex: .2,
        fontFamily: 'AppleColorEmoji',
        fontSize: 20,
        textAlign: 'center',
    },
    versus_group: {
        flex: .6,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    fighter: {
        // flex: .5,
        // aspectRatio: 1,
        // flexDirection: 'column',
        // alignContent: 'center',
        width: '100px',
        height: '100px',
    },
});