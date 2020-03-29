import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View, Text } from 'react-native';
import UserCard from '../components/UserCard';

function Friends() {
    const [loading, setLoading] = useState(false);
    const [friends, setFriends] = useState([{
        name: 'Test Contact',
        status: 'ready',
        phoneNumbers: [
            '+16025554181'
        ]
    }]);

    if (loading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <SafeAreaView>
            <FlatList
                data={friends}
                renderItem={({ item }) => <UserCard userInfo={item}/>}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    )
}

export default Friends;