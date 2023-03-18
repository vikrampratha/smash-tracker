import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Alert, Pressable, Image, Switch } from 'react-native';
import FighterOptions from './FighterOptions';
import FighterSelector from './FighterSelector';
import OpponentSelector from './OpponentSelector';
import PlayerPicker from './PlayerPicker';
import { TabNavContext } from '../context/TabNavContext';
import Images from "../Images";
import OpponentPicker from './OpponentPicker';
import { ButtonGroup } from 'react-native-elements';

import {apiEndpoint} from "../Env";

export default function AddGameScreen() {

    const userId = React.useContext(TabNavContext);
    const [selectedFighter1, setSelectedFighter1] = useState({"id": 3, "name": "Bayonetta", "icon": "Bayonetta"});
    const [selectedFighter2, setSelectedFighter2] = useState({"id": 3, "name": "Bayonetta", "icon": "Bayonetta"});

    const [opponent, setOpponent] = useState({"id": -1, "username": ""});
    const [outcome, setOutcome] = useState(1);

    const [isF2, setIsF2] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(0);
    const [selectedOutcome, setSelectedOutcome] = useState(0);
    
    const toggleSwitch = () => {
        setIsF2(previousState => !previousState);
    }

    const promptUser = () => {
        console.log("prompt user");
    }

    const updateFighter = (fighter) => {
        if (selectedPlayer == 1) setSelectedFighter2(fighter);
        else setSelectedFighter1(fighter);
    }

    const updateOpponent = (opponent) => {
        // console.log(opponent);
        setOpponent(opponent);
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
            url: apiEndpoint() + '/game',
            data: {
                "player1Id": userId,
                "player2Id": opponent.id,
                "fighter1Id": selectedFighter1.id,
                "fighter2Id": selectedFighter2.id,
                "outcome": selectedOutcome,
                "date": new Date().getTime()
            }
        }).then((response) => {
            console.log(response.data);
        }).catch((response) => {
            console.log(response.data);
        });
    } 

    return (
        <View style={styles.add_game_screen_container}>
            <View style={styles.opponent_select_container}>
                <Text style={styles.section_text}>{'Select Opponent'}</Text>
                <OpponentPicker id={'' + userId} onSelect={(opponent) => updateOpponent(opponent)}/>
            </View>
            <View style={styles.fighter_select_container}>
                <View style={styles.fighter_switch_container}>
                    {/* <Text style={styles.text}>{isF2 ? 'P2 Fighter Select' : 'P1 Fighter Select'}</Text> */}
                    <Text style={styles.section_text}>{'Select Fighters'}</Text>
                    {/* <Switch 
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={isF2 ? '#f5dd4b' : '#f4f3f4'}
                        // ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isF2}
                    /> */}
                    <View style={styles.matchup_display_container}>
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
                </View>
                    <ButtonGroup 
                        buttons={['P1', 'P2']}
                        selectedIndex={selectedPlayer}
                        onPress={(value) => {setSelectedPlayer(value);}}
                        containerStyle={{ marginBottom: 20 }}
                    />
                </View>
                
                <View style={styles.fighter_options_container}>
                    <FighterOptions num="P1" onSelect={(fighter) => updateFighter(fighter)} />  
                </View>
            </View>
            
            <View style={styles.outcome_select_container}>
                <Text style={styles.section_text}>{'Select Outcome'}</Text>
                <ButtonGroup 
                    buttons={['Lose', 'Win']}
                    selectedIndex={selectedOutcome}
                    onPress={(value) => {setSelectedOutcome(value);}}
                    // containerStyle={{ marginBottom: 20 }}
                />
            </View>
            <Button 
                style={styles.button}
                title="Add Game"
                onPress={addGame}
            />
            {/* <View style={styles.add_game_container}>
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
            </View> */}
        </View>           
    );
}

const styles = StyleSheet.create({
    add_game_screen_container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'lightblue',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-evenly',
        padding: 2,
    },
    opponent_select_container: {
        flex: .3,
        flexDirection: 'column',
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // alignContent: 'center',
        // justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 2,
        marginVertical: 2,
    },
    outcome_select_container: {
        flex: .4,
        flexDirection: 'column',
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // alignContent: 'center',
        // justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 2,
        marginVertical: 2,
    },
    fighter_select_container: {
        flex: 2,
        flexDirection: 'column',
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        alignContent: 'center',
        borderColor: 'black',
        borderWidth: 2,
        marginVertical: 2,
    },
    fighter_switch_container: {
        // flex: 1,
        flexDirection: 'column',
        // backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'space-around',
    },
    fighter_options_container: {
        flex: 1,
        // flexDirection: 'row',
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'space-between',
    },
    matchup_display_container: {
        flex: 1,
        // flexDirection: 'row',
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        marginVertical: 2,
    },
    add_game_container: {
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
        flex: 1,
        // alignItems: 'flex-end',
        // justifyContent: 'center',
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
    text: {
        // flex: .2,
        // fontFamily: 'AppleColorEmoji',
        fontSize: 20,
        textAlign: 'center',
    },
    versus_group: {
        flex: 1,
        flexDirection: 'row',
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