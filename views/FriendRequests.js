import React, { useState } from 'react';
import DrawerHeader from '../components/DrawerHeader';
import { useSelector } from 'react-redux';
import { FlatList, View, Text } from 'react-native';
import RequestCard from '../components/RequestCard';

// Incoming requests
function FriendRequests({ navigation }) {
    const [requests, setRequests] = useState([]);
    const { incomingRequests, contacts } = useSelector(state => ({
        incomingRequests: state.incomingRequests,
        contacts: state.contacts
    }));

    if (requests.length > 0 && !incomingRequests) {
        setRequests([]);
    }

    if (incomingRequests == null) {
        return (
            <DrawerHeader navigation={navigation}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center' }}>
                        No requests right now!
                    </Text>
                </View>
            </DrawerHeader>
        )
    }

    if (requests.length !== incomingRequests.length) {
        convertRequests();
    }

    function convertRequests() {
        // Look through contacts and if the phone number exists, add the whole contact
        let numbers = incomingRequests;
        let curRequests = [];
        contacts.forEach(contact => {
            // Check if this contact is any of the requests
            contact.phoneNumbers.forEach(num => {
                if (numbers.includes(num)) {
                    curRequests.push({
                        name: contact.name,
                        status: contact.status,
                        phone: num
                    });
                    numbers = numbers.filter(item => item !== num); // Remove it from list
                }
            })
        });

        // Add whatever numbers are left with the name "Unknown"
        numbers.forEach(num => {
            curRequests.push({
                name: 'Unknown',
                status: 'Unknown',
                phone: num
            });
        });
        numbers = [];

        setRequests(curRequests);
    }

    return (
        <DrawerHeader navigation={navigation}>
            <FlatList
                data={requests}
                renderItem={({ item }) => <RequestCard item={item}/>}
                keyExtractor={(item, index) => index.toString()}
            />
        </DrawerHeader>
    )
}

export default FriendRequests;