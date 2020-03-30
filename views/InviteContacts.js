import React from 'react';
import { FlatList } from 'react-native';
import ContactCard from '../components/ContactCard';
import { useSelector } from 'react-redux';
import DrawerHeader from '../components/DrawerHeader';

function InviteContacts({ navigation }) {
    const { contacts } = useSelector(state => ({
        contacts: state.contacts
    }));

    return (
        <DrawerHeader navigation={navigation}>
            <FlatList
                data={contacts}
                renderItem={({ item }) => <ContactCard userInfo={item}/>}
                keyExtractor={(item, index) => index.toString()}
            />
        </DrawerHeader>
    )
}

export default InviteContacts;