import React from 'react';
import { View, Text } from 'react-native';

function UserCard({ userInfo }) {
    console.log('Trying to show:', userInfo);
    return (
        <View>
            <Text>{userInfo.name}  |  {userInfo.phoneNumbers[0]}</Text>
        </View>
    )
}

export default UserCard;