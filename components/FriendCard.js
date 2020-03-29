import React from 'react';
import { TouchableOpacity, Linking, View, Text } from 'react-native';

function FriendCard({ userInfo }) {
    const { name, status } = userInfo;
    const phone = userInfo.phoneNumbers[0].replace('+', '');  // Should replace +1 country code with 1

    return (
        <TouchableOpacity onPress={() => Linking.openURL(`facetime:${phone}`)}>
            <View style={{ margin: 5, padding: 15, backgroundColor: '#C9C9C9'}}>
                <Text>{name}  |  {phone}  |  {status}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default FriendCard;