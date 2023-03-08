import React, { useState, useEffect } from "react";
import axios from "axios";
import { ScrollView } from "react-native";
import { Avatar, ListItem } from "@rneui/themed";
import Images from "../Images";
import { apiEndpoint } from "../Env";

const FighterSelector = (props) => {

    const [fighters, setFighters] = useState([]);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        axios({
            method: 'get',
            url: apiEndpoint() + 'fighter',
        }).then((response) => {
            setFighters(response.data);
        });
    }, []);



    return (
        <ScrollView>
            <ListItem.Accordion
                content={
                    <ListItem.Content>
                        <ListItem.Title>Fighter</ListItem.Title>
                        <ListItem.Subtitle>Tap to expand</ListItem.Subtitle>
                    </ListItem.Content>
                }
                isExpanded={expanded}
                onPress={() => setExpanded(!expanded)}
            >
                <ScrollView>
                {
                    fighters.map((fighter, index) => (
                        <ListItem key={index} onPress={() => props.onSelect(fighter["name"])} bottomDivider>
                            <Avatar source={Images[fighter["name"]]} />
                            <ListItem.Content>
                                <ListItem.Title>{fighter["name"]}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
                </ScrollView>
            </ListItem.Accordion>
        </ScrollView>
    );
};

export default FighterSelector;