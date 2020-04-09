import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import ContactCard from '../components/ContactCard';
import { useSelector } from 'react-redux';
import DrawerHeader from '../components/DrawerHeader';
import { Input } from 'galio-framework';

function InviteContacts({ navigation }) {
    const [validContacts, setValidContacts] = useState([]);
    const { contacts } = useSelector(state => ({
        contacts: state.contacts
    }));

    useEffect(() => {
        setValidContacts(contacts);
    }, []);

    function filterContacts(search) {
        // No search, return all contacts
        if (search === '') return setValidContacts(contacts);

        setValidContacts(contacts.filter(contact => contact.name.includes(search)));
    }

    return (
        <DrawerHeader navigation={navigation} title='Invite Contacts'>
            <View style={{ alignItems: 'center' }} style={{ paddingHorizontal: 5 }}>
                <Input rounded placeholder='Search for contacts...' onChangeText={text => filterContacts(text)}
                       right icon='search' family='Ionicons' iconSize={14} iconColor='black'/>
            </View>
            <FlatList
                data={validContacts}
                renderItem={({ item }) => <ContactCard userInfo={item}/>}
                keyExtractor={(item, index) => index.toString()}
            />
        </DrawerHeader>
    )
}

export default InviteContacts;