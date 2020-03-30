import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import ContactCard from '../components/ContactCard';
import { useSelector } from 'react-redux';

function InviteContacts({ navigation }) {
    const { contacts } = useSelector(state => ({
        contacts: state.contacts
    }));

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