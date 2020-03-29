import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as Contacts from 'expo-contacts';

function Friends() {
    let contacts = [];

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers]
                });

                data.forEach(contact => {
                    if (!contact.phoneNumbers) return;
                    console.log('Adding', contact.name);

                    let newContact = {
                        name: contact.name,
                        phoneNumbers: contact.phoneNumbers.map(num => {
                            return num.digits;
                        })
                    };

                    // Push new contact to state
                    contacts.push(newContact);
                });
            }
        })();
    }, []);

    return (
        <View>
            <Text>Friends</Text>
        </View>
    )
}

export default Friends;