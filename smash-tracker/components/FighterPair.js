import { Image } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import Images from "../Images";


const FighterPair = (props) => {
    return (
        <View style={styles.layout}>
            <Image source={Images[props.fighter1]} style={styles.img}></Image>
            <Image source={Images[props.fighter2]} style={styles.img}></Image>
        </View>
    );
};

export default FighterPair;

const styles = StyleSheet.create({
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
        marginBottom: 16,
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
});