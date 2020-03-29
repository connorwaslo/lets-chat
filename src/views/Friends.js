import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View, Text } from 'react-native';
import * as Contacts from 'expo-contacts';
import UserCard from '../components/UserCard';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

function Friends() {
    const [loading, setLoading] = useState(true);
    const [contacts, setContacts] = useState([]);

    // Todo: Check and see if these numbers exist as users before rendering them
    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers]
                });

                let allContacts = [];
                // Looking through every contact literally took a minute and a half
                data.slice(0, 5).forEach(contact => {
                    if (!contact.phoneNumbers) return;

                    // Add contact to list of all contacts - will be parsed later
                    allContacts.push({
                        name: contact.name,
                        phoneNumbers: contact.phoneNumbers.map(num => {
                            return num.digits;
                        })
                    });
                });

                allContacts.push({
                    name: 'Test Contact',
                    phoneNumbers: [
                        '+16026514181'
                    ]
                });


                // Check if contacts exists in the firebase database
                let userContacts = [];
                await (async () => {
                    // Apparently foreach does not support await - the more ya know
                    // For..in loop doesn't give key b/c no keys in this array - just indices
                    for (const i in allContacts) {
                        // Todo check each of the phone numbers
                        await firebase.database().ref(allContacts[i].phoneNumbers[0]).once('value')
                            .then(snapshot => {
                                if (snapshot.val()) {
                                    userContacts.push(allContacts[i]);
                                    console.log('Found contact!', allContacts[i].name);
                                }
                            })
                            .catch(error => {
                                console.log('Something went wrong looking for phone #s:', error.message);
                            });
                    }
                })();

                setContacts(userContacts);
            }

            setLoading(false);
        })();
    }, []);

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
                data={contacts}
                renderItem={({ item }) => <UserCard userInfo={item}/>}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    )
}

export default Friends;