import React from 'react';
import DrawerHeader from '../components/DrawerHeader';
import { useSelector } from 'react-redux';
import { FlatList, View, Text } from 'react-native';

// Incoming requests
function FriendRequests({ navigation }) {
    const { incomingRequests } = useSelector(state => ({
        incomingRequests: state.incomingRequests
    }));

    return (
        <DrawerHeader navigation={navigation}>
            <FlatList
                data={incomingRequests}
                renderItem={({ item }) => (
                    <View style={{ flex: 1, backgroundColor: 'lightblue', padding: 10, margin: 5 }}>
                        <Text style={{ textAlign: 'center' }}>{item}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </DrawerHeader>
    )
}

export default FriendRequests;