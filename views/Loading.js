import React, { useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    setContacts,
    setOutgoingRequests,
    setName,
    setIncomingRequests, setFriends
} from '../redux/actions/actions';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import * as Contacts from 'expo-contacts';
import * as RootNavigation from '../utils/RootNavigation';

function Loading() {
    const { phone } = useSelector(state => ({
        phone: state.phone
    }));
    const dispatch = useDispatch();
    let contacts = [];
    let allFriends = [];

    useEffect(() => {
        _loadUserData();
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
                let incomingRequests = (snapshot.val() && snapshot.val().incomingRequests) || [];
                let outgoingRequests = (snapshot.val() && snapshot.val().outgoingRequests) || [];
                let friends = (snapshot.val() && snapshot.val().friends) || [];

                console.log('Firebase friends:', friends);

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

                dispatch(setName(name));
                dispatch(setIncomingRequests(incomingRequests));
                dispatch(setOutgoingRequests(outgoingRequests));
                allFriends = friendContacts;
            })
            .catch(error => {
                console.log('Could not load user data:', error.message);
            });
    }

    async function _getFriends() {
        console.log('allFriends', allFriends);
        let updatedFriends = [];
        allFriends.forEach(async friend => {
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

                    console.log('newFriend:', newFriend);
                    updatedFriends.push(newFriend);

                    // Just update redux every iteration
                    console.log('Updated friends:', updatedFriends);
                    dispatch(setFriends(updatedFriends));
                })
                .catch(error => {
                    console.log('Could not find friend', phone, error.message);
                });

            // Todo: not even sure if i need this but we'll leave it until I do better bug testing
            if (prevLength === updatedFriends.length) {
                updatedFriends.push({
                    name: friend.name,
                    status: 'unknown',
                    phone: friend.phone
                });
            }
        });
    }

    async function _loadUserData() {
        await _getContacts();
        await _getFirebase();
        await _getFriends();

        RootNavigation.navigate('App');
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Loading...</Text>
        </View>
    )
}

export default Loading;