import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text } from 'react-native';
import ContactCard from '../components/ContactCard';
import * as Contacts from 'expo-contacts';

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

                setContacts(allContacts);
            }

            setLoading(false);
        })();
    }, []);

    if (loading) {
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView>
            <FlatList
                data={contacts}
                renderItem={({ item }) => <ContactCard userInfo={item}/>}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    )
}

export default InviteContacts;