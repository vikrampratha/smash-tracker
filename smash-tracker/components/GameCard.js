import { Text, Image, StyleSheet } from "react-native";
// import { Card } from "react-native-elements";
import { Card } from '@rneui/themed';
import FighterPair from "./FighterPair";
import Images from "../Images";

const GameCard = (props) => {
    return (
        <Card containerStyle={[((props.game.outcome == 1) ? styles.win : styles.loss), 
                                // {flex: 1/props.numCols}
                            ]}>
            <Card.Title>vs. {props.game.player2}</Card.Title>
            <Card.Divider></Card.Divider>
            <FighterPair fighter1={props.game.fighter1} fighter2={props.game.fighter2}></FighterPair>
            {/* <Text>Outcome: {props.game.outcome}</Text>
            <Text>Date: {props.game.date}</Text> */}
        </Card>
    );
};

export default GameCard;

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        marginBottom: 16,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    img: {
        width: 25,
        height: 25,
    },
    win: {
        backgroundColor: 'lightgreen',
    },
    loss: {
        backgroundColor: 'lightcoral',
    },
    loss: {
        backgroundColor: 'lightcoral',
    },
});