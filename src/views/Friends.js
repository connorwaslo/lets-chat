import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View, Text } from 'react-native';
import * as Contacts from 'expo-contacts';
import UserCard from '../components/UserCard';

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

                data.forEach(contact => {
                    if (!contact.phoneNumbers) return;
                    // console.log('Adding', contact.name);

                    let newContact = {
                        name: contact.name,
                        phoneNumbers: contact.phoneNumbers.map(num => {
                            return num.digits;
                        })
                    };

                    // Push new contact to state
                    setContacts(contacts => contacts.concat(newContact));
                });
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