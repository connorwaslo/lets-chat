import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InviteContacts from './views/InviteContacts';
import Friends from './views/Friends';
import config from './apis/firebase';
import firebase from 'firebase/app';

firebase.initializeApp(config);

const Stack = createStackNavigator();

export default function App() {
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
