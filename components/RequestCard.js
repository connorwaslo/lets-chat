import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

function RequestCard({ item }) {
    const { name, phone } = item;

    return (
        <View style={{ flex: 1, backgroundColor: 'lightblue', padding: 10, margin: 5 }}>
            <Text style={{ textAlign: 'center' }}>{name}  |  {phone}</Text>
            <TouchableOpacity onPress={() => {}}>
                <Text>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
                <Text>Deny</Text>
            </TouchableOpacity>
        </View>
    )
}

export default RequestCard;