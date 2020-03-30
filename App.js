import React from 'react';
import { StyleSheet } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { userReducer } from './redux/reducers/reducer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InviteContacts from './views/InviteContacts';
import Friends from './views/Friends';
import config from './apis/firebase';
import firebase from 'firebase/app';
import 'firebase/database';
import Loading from './views/Loading';

firebase.initializeApp(config);

const store = createStore(userReducer);

const Stack = createStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer style={styles.container}>
                <Stack.Navigator>
                    <Stack.Screen name='Loading' component={Loading} options={{ headerMode: 'none' }}/>
                    <Stack.Screen name='Invite Friends' component={InviteContacts}/>
                    <Stack.Screen name='Friends' component={Friends}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
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
