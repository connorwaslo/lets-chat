import React, { useEffect, useState } from 'react';
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

    useEffect(() => {
        console.log('Incoming:', incomingRequests);
    }, []);

    if (requests.length > 0 && !incomingRequests) {
        setRequests([]);
    }

    if (incomingRequests.length === 0) {
        return (
            <DrawerHeader navigation={navigation} title='Friend Requests'>
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

    // Todo: This should be done on loading for friends
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
                        phoneNumber: num
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
                phoneNumber: num
            });
        });
        numbers = [];

        setRequests(curRequests);
    }

    return (
        <DrawerHeader navigation={navigation} title='Friend Requests'>
            <FlatList
                data={requests}
                renderItem={({ item }) => <RequestCard item={item}/>}
                keyExtractor={(item, index) => index.toString()}
            />
        </DrawerHeader>
    )
}

export default FriendRequests;