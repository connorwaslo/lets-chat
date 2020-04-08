import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    setContacts,
    setOutgoingRequests,
    setName,
    setIncomingRequests, setFriends, setStatus
} from '../redux/actions/actions';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import * as Contacts from 'expo-contacts';

function Loading({ navigation }) {
    const [loading, setLoading] = useState(true);
    const { phone } = useSelector(state => ({
        phone: state.phone
    }));
    const dispatch = useDispatch();
    let contacts = [];

    // When finally done loading, navigate away
    if (!loading) {
        navigation.navigate('App');
    }

    useEffect(() => {
        console.log('Phone:', phone);
        _loadUserData();

        return () => console.log('Unmounting');
    }, []);

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
            contacts = allContacts; // This is to use as cross-reference for firebase
        }
    }

    async function _getFirebase() {
        await firebase.database().ref(phone).once('value')
            .then(snapshot => {
                let name = (snapshot.val() && snapshot.val().profile.name) || 'No Name';
                let status = (snapshot.val() && snapshot.val().profile.status) || 'busy';
                let incomingRequests = (snapshot.val() && snapshot.val().incomingRequests) || [];
                let outgoingRequests = (snapshot.val() && snapshot.val().outgoingRequests) || [];
                let friends = (snapshot.val() && snapshot.val().friends) || [];

                let updatedContacts = contacts;

                // Convert friends from phone numbers to full contacts
                // This only adds friends that can be found in your contacts
                let friendContacts = [];
                contacts.forEach(contact => {
                    contact.phoneNumbers.forEach(num => {
                        if (friends.includes(num)) {
                            friendContacts.push({
                                name: contact.name,
                                status: contact.status,
                                phone: num
                            });

                            friends = friends.filter(indiv => indiv !== num);
                            updatedContacts = updatedContacts.filter(contact => !contact.phoneNumbers.includes(num));
                        }
                    })
                });

                // Add the remaining ones with name unknown
                friends.forEach(num => {
                    friendContacts.push({
                        name: 'Not a Contact',
                        status: 'ready',
                        phone: num
                    });
                });

                dispatch(setContacts(updatedContacts));

                dispatch(setName(name));
                dispatch(setStatus(status));
                dispatch(setIncomingRequests(incomingRequests));
                dispatch(setOutgoingRequests(outgoingRequests));
                _getFriends(friendContacts).finally(() => {
                    setLoading(false);
                });
            })
            .catch(error => {
                console.log('Could not load user data:', error.message);
            });
    }

    async function _getFriends(allFriends) {
        let updatedFriends = [];
        // allFriends.forEach(async friend => {
        for (let i = 0; i < allFriends.length; i++) {
            let friend = allFriends[i];
            let phone = friend.phone;

            const prevLength = updatedFriends.length;
            const path = phone + '/profile';
            await firebase.database().ref(path).once('value')
                .then(snapshot => {
                    let status = (snapshot.val() && snapshot.val().status) || 'unknown';

                    let newFriend = {
                        name: friend.name,
                        status: status,
                        phone: phone
                    };

                    updatedFriends.push(newFriend);

                    // Just update redux every iteration
                    dispatch(setFriends(updatedFriends));
                })
                .catch(error => {
                    console.log('Could not find friend', phone, error.message);
                });

            // Todo: not even sure if i need this but we'll leave it until I do better bug testing
            /*if (prevLength === updatedFriends.length) {
                updatedFriends.push({
                    name: friend.name,
                    status: 'unknown',
                    phone: friend.phone
                });
            }*/
        }

        console.log('Done getting friends');
    }

    async function _loadUserData() {
        await _getContacts();
        await _getFirebase();
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Loading...</Text>
        </View>
    )
}

export default Loading;