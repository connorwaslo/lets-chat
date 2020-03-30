import React from 'react';
import { View, Image, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { setAppLoading, setContacts, setFriendRequests, setName } from '../redux/actions/actions';
import firebase from 'firebase/app';
import 'firebase/database';
import * as Contacts from 'expo-contacts';

function Loading({ navigation }) {
    const dispatch = useDispatch();

    async function _getFirebase() {
        firebase.database().ref('+16025554181/').once('value')
            .then(snapshot => {
                let name = (snapshot.val() && snapshot.val().name) || 'No Name';
                let friendRequests = (snapshot.val() && snapshot.val().friendRequests) || [];

                console.log('Name:', name);
                console.log('Friend Requests:', friendRequests);

                dispatch(setName(name));
                dispatch(setFriendRequests(friendRequests));
            })
            .catch(error => {
                console.log('Could not load user data:', error.message);
            });
    }

    async function _getContacts() {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers]
            });

            let allContacts = [];
            // Looking through every contact literally took a minute and a half
            data.forEach(contact => {
                if (!contact.phoneNumbers) return;

                // Add contact to list of all contacts - will be parsed later
                allContacts.push({
                    name: contact.name,
                    status: 'ready',
                    phoneNumbers: contact.phoneNumbers.map(num => {
                        return num.digits;
                    })
                });
            });

            dispatch(setContacts(allContacts));
        }
    }

    async function _loadUserData() {
        // Todo: Check if the user is logged in first
        // We'll just use placeholder data for now
        console.log('Loaded splash screen...');
        await _getFirebase();
        await _getContacts();

        dispatch(setAppLoading(false));
    }

    return (
        <View style={{ flex: 1 }}>
            <Text>Loading...</Text>
            <Image
                source={require('../assets/splash.png')}
                onLoad={_loadUserData}
            />
        </View>
    )
}

export default Loading;