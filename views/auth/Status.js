import React, { useState } from 'react';
import { SafeAreaView, Text, View, Picker, TouchableOpacity } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/database';
import { useSelector } from 'react-redux';

function Status({ navigation }) {
    const [selected, setSelected] = useState('ready');
    const { phone } = useSelector(state => ({
        phone: state.phone
    }));

    function handleSubmit() {
        // Todo: Pull phone number from redux
        firebase.database().ref('+16025554181/profile').update({
            status: selected
        }).then(() => {
            navigation.navigate('App');
        }).catch(error => {
            alert(error.message);

            console.log('Could not set status info:', error.message);
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Are you looking to chat with friends now?</Text>
            <Picker
                selectedValue={selected}
                onValueChange={itemValue => setSelected(itemValue)}
                style={{ flex: 1, height: 50, width: '80%'}}
            >
                <Picker.Item label='ready' value='ready'/>
                <Picker.Item label='busy' value='busy'/>
            </Picker>

            <TouchableOpacity onPress={handleSubmit}>
                <View style={{ padding: 10, margin: 5, backgroundColor: 'lightblue' }}>
                    <Text>Submit</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Status;