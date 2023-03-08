import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Picker } from '@react-native-picker/picker';
import { Picker } from "react-native";
import { apiEndpoint } from "../Env";

const UserPicker = (props) => {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(-1);

    useEffect(() => {
        axios({
            method: 'get',
            url: apiEndpoint() + '/player',
        }).then((response) => {
            setUsers(response.data);
            setSelectedUser(response.data[0].id);
            props.onUpdate(response.data[0].id);
        });
    }, []);

    return (
        <Picker
            selectedValue={selectedUser}
            style={props.style}
            itemStyle={props.itemStyle}
            onValueChange={(itemValue) => {setSelectedUser(itemValue); props.onUpdate(itemValue);}}>
                {users.map((item, index) => {
                    return (<Picker.Item label={item.username} value={item.id} key={index}/>)
                })}
        </Picker>
    );
};

export default UserPicker;