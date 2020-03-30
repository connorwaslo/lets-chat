import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { AppLoading } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InviteContacts from './views/InviteContacts';
import Friends from './views/Friends';
import config from './apis/firebase';
import firebase from 'firebase/app';
import 'firebase/database';

firebase.initializeApp(config);

const Stack = createStackNavigator();

export default function App() {
    const [loading, setLoading] = useState(true);

    async function _loadUserData() {
        // Todo: Check if the user is logged in first
        // We'll just use placeholder data for now
        await firebase.database().ref('+16025554181/').once('value')
            .then(snapshot => {
                let name = (snapshot.val() && snapshot.val().name) || 'No Name';
                let friendRequests = (snapshot.val() && snapshot.val().friendRequests) || [];

                console.log('Name:', name);
                console.log('Friend Requests:', friendRequests);
            })
    }

    if (loading) {
        // console.log('Loading...');
        return (
            <AppLoading
                startAsync={_loadUserData}
                onFinish={() => setLoading(false)}
                onError={() => console.log('Could not load...')}
            />
        )
    }

    return (
        <NavigationContainer style={styles.container}>
            <Stack.Navigator>
                <Stack.Screen name='Invite Friends' component={InviteContacts}/>
                <Stack.Screen name='Friends' component={Friends}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
