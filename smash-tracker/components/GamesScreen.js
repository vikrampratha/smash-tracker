import { StyleSheet, Text, View, Button, ScrollView, Image, FlatList } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
import { Picker } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import GameCard from './GameCard';
import PlayerPicker from './PlayerPicker';
import Images from '../Images';
import { useIsFocused } from '@react-navigation/native';
import { TabNavContext } from './TabNavContext';
import FighterSelector from './FighterSelector';
import FighterPicker from './FighterPicker';
import { ProgressBar } from 'react-native-web';
import { LinearProgress } from 'react-native-elements';
import { apiEndpoint } from '../Env';

export default function GamesScreen() {

    const userId = React.useContext(TabNavContext);

    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState(games);

    const [winRate, setWinRate] = useState(0);

    // filter criteria
    const [selectedOutcome, setSelectedOutcome] = useState("all");
    const [selectedOpponent, setSelectedOpponent] = useState("all");
    const [selectedFighter1, setSelectedFighter1] = useState("all");
    const [selectedFighter2, setSelectedFighter2] = useState("all");

    const focused = useIsFocused();

/*     const filterWins = (itemValue) => {
        if (itemValue !== "all") {
            let result = [];
            result = games.filter((data) => {
                return (itemValue === "win") ? data.outcome == 1 : data.outcome == 0;
            });
            setFilteredGames(result);
        }
        else {
            setFilteredGames(games);
        }
    } */

    const setPickerState = (src) => {
        if (src.picker === "playerpicker") {
            setSelectedOpponent(src.val);
        }
        else if (src.picker === "outcomepicker") {
            setSelectedOutcome(src.val);
        }
        else if (src.picker === "fighterpicker") {
            (src.id === "1") ? setSelectedFighter1(src.val) : setSelectedFighter2(src.val);
        }
    }

    const updateWinRate = (filteredGames) => {      
        let gamesWon = filteredGames.filter((item) => {return item.outcome == "1";});
        let wins = gamesWon.length;
        let total = filteredGames.length;
        (total == 0) ? setWinRate(0) : setWinRate(wins/total);
    }

    const filterGames = () => {
        let result = games;
        result = games.filter((item) => {
            return ((selectedOutcome === "all" || selectedOutcome == item.outcome) && 
                    (selectedOpponent === "all" || selectedOpponent === item.player2) &&
                    (selectedFighter1 === "all" || selectedFighter1 === item.fighter1) &&
                    (selectedFighter2 === "all" || selectedFighter2 === item.fighter2));
        });
        setFilteredGames(result);
        updateWinRate(result);
        // console.log(winRate);
    }

    useEffect(() => {
        axios({
            method: 'get',
            url: apiEndpoint() + '/game/player/' + userId + '/clean',
        }).then((response) => {
            // console.log(response.data);
            setGames(response.data);
            // setFilteredGames(response.data);
            // filterGames();
            // updateWinRate(response.data);
        });
    }, [focused]);
    
    useEffect(() => {
        /* let result = games;
        result = games.filter((item) => {
            return ((selectedOutcome === "all" || selectedOutcome == item.outcome) && 
                    (selectedOpponent === "all" || selectedOpponent === item.player2) &&
                    (selectedFighter1 === "all" || selectedFighter1 === item.fighter1) &&
                    (selectedFighter2 === "all" || selectedFighter2 === item.fighter2));
        });
        setFilteredGames(result);
        updateWinRate(result); */
        filterGames();
    }, [selectedOpponent, selectedOutcome, selectedFighter1, selectedFighter2, games])

    const renderItem = (item, index) => (
        <GameCard numCols={1} key={index} game={item} />
    );
    
    return (
        <View style={styles.container}>
            <View style={styles.top_container}>
                <View style={styles.filter_container}>
                    <Text style={styles.section_text}>{'Filters'}</Text>
                    <View style={styles.filter_group}>
                        <View style={styles.filter_and_label}>
                            <Text style={styles.filter_label}>Outcome: </Text>
                            <Picker 
                                selectedValue={selectedOutcome}
                                style={styles.picker}
                                onValueChange={(itemValue) => setPickerState({picker: 'outcomepicker', val: itemValue})}>
                                    <Picker.Item label="All" value="all" />
                                    <Picker.Item label="Wins Only" value="1" />
                                    <Picker.Item label="Losses Only" value="0" />
                            </Picker>
                        </View>
                        <View style={styles.filter_and_label}>
                            <Text style={styles.filter_label}>Opponent: </Text>
                            <PlayerPicker style={styles.picker} itemStyle={styles.picker_item} id={'' + userId} onUpdate={(src) => setPickerState(src)} />
                        </View>
                        <View style={styles.filter_and_label}>
                            <Text style={styles.filter_label}>Fighter (P1): </Text>
                            <FighterPicker style={styles.picker} itemStyle={styles.picker_item} id='1' onUpdate={(src) => setPickerState(src)} />
                        </View>
                        <View style={styles.filter_and_label}>
                            <Text style={styles.filter_label}>Fighter (P2): </Text>
                            <FighterPicker style={styles.picker} itemStyle={styles.picker_item} id='2' onUpdate={(src) => setPickerState(src)} />
                        </View>
                    </View>
                </View>
                <View style={styles.win_rate_container}>
                    <Text style={styles.section_text}>{'Win Rate'}</Text>
                    <LinearProgress 
                        style={styles.win_rate_lin_progress} 
                        value={winRate}
                        variant="determinate"
                        color='green'
                        trackColor='red'
                    />
                    <Text style={styles.win_rate_text}>{(winRate*100).toFixed(1) + '%'}</Text>
                </View>
            </View>
            <View style={styles.games_container}>
                <Text style={styles.section_text}>{'Games'}</Text>
                <FlatList
                    data={filteredGames}
                    renderItem={({item, index}) => renderItem(item, index)}
                    keyExtractor={ (item) => item.id }
                    numColumns={2}
                    style={styles.game_list}
                    contentContainerStyle={{alignItems: 'baseline'}}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        // marginBottom: 16,
    },
    container: {
      flex: 1,
      backgroundColor: 'lightblue',
      alignItems: 'center',
      // justifyContent: 'center',
    },
    top_container: {
        // flex: 1,
        // alignItems: 'stretch',
        // alignSelf: 'stretch',
        flexDirection: 'row',
        padding: 2,
        // alignContent: 'space-around',
    },
    filter_container: {
        alignContent: 'center',
        borderColor: 'black',
        borderWidth: 2,
        marginVertical: 2,
        marginHorizontal: 2,
        // flex: 6,
        // justifyContent: 'center',
    },
    img: {
        width: 25,
        height: 25,
    },
    filter_group: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        // alignItems: 'stretch',
        // justifyContent: 'center',
    },
    filter_and_label: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        // alignItems: 'stretch',
        // justifyContent: 'center',
    },
    filter_label: {
        flex: .5,
        // flexDirection: 'row',
        backgroundColor: '#fff',
        // alignItems: 'stretch',
        // justifyContent: 'center',
        // fontFamily: 'AppleColorEmoji',
        fontSize: 15,
        // color: 'white',
        // backgroundColor: 'black',
        // textAlign: 'center',
    },
    picker: {
        // height: 100, 
        // width: 100,
        // flex: .25, 
        // fontFamily: 'AppleColorEmoji',
        flex: .5,
        fontSize: 15,
        color: 'black',
        alignContent: 'stretch',
        // backgroundColor: 'light_blue'
    },
    games_container: {
        flex: 1,
        alignContent: 'center',
        borderColor: 'black',
        borderWidth: 2,
        marginVertical: 2,
    },
    win_rate_container: {
        // flex: 7,
        // alignContent: 'space_between',
        // alignItems: 'center',
        flexDirection: 'column',
        // alignItems: 'space_between',
        borderColor: 'black',
        borderWidth: 2,
        marginVertical: 2,
        marginHorizontal: 2,
        // width: "200%"
        // transform: [{ rotate: '90deg'}]
        // justifyContent: 'space_between',
    },
    win_rate_lin_progress: {
        marginVertical: 20,
        height: 20,
        // width: "200%",
        alignItems: 'stretch',
        flex: 1,
        // transform: [{ rotate: '90deg'}]
        // color: "primary"
    },
    game_list: {
        // height: 100, 
        // width: 100,
        flexWrap: 'wrap',
        alignContent: 'space-between',
        // alignItems: 'center'
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
        fontFamily: 'AppleColorEmoji',
        fontSize: 15,
        // color: 'white',
        // backgroundColor: 'black',
        textAlign: 'center',
    },
    win_rate_text: {
        // flex: .2,
        // fontFamily: 'AppleColorEmoji',
        fontSize: 20,
        // color: 'white',
        // backgroundColor: 'black',
        textAlign: 'center',
    },
    picker_item: {
        // flex: .2,
        fontFamily: 'AppleColorEmoji',
        fontSize: 15,
        color: 'blue',
        // backgroundColor: 'black',
        // textAlign: 'center',
    },
});