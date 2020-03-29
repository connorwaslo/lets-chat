import React, { useEffect, useState } from 'react';
import * as Contacts from 'expo-contacts';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { FlatList, SafeAreaView } from 'react-native';
import UserCard from '../components/UserCard';

function InviteContacts() {
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
                        status: 'ready',
                        phoneNumbers: contact.phoneNumbers.map(num => {
                            return num.digits;
                        })
                    });
                });

                setContacts(allContacts);
            }

            setLoading(false);
        })();
    }, []);

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

export default InviteContacts;