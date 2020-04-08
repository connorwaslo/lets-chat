import React from 'react';
import Loading from './views/Loading';
import InviteContacts from './views/InviteContacts';
import Friends from './views/Friends';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { navigationRef } from './utils/RootNavigation';
import { StyleSheet } from 'react-native';
import FriendRequests from './views/FriendRequests';
import SignUp from './views/auth/SignUp';
import LogIn from './views/auth/LogIn';
import Status from './views/auth/Status';
import { Ionicons } from '@expo/vector-icons';
import Profile from './views/Profile';

function AppContainer() {
    const Stack = createStackNavigator();
    const Drawer = createDrawerNavigator();

    // Todo: If not authenticated render the auth stack
    function AuthStack() {
        return (
            <Stack.Navigator>
                <Stack.Screen name='Log In' component={LogIn}/>
                <Stack.Screen name='Sign Up' component={SignUp}/>
                <Stack.Screen name='Status' component={Status}/>
                <Stack.Screen name='Loading' component={Loading}
                              options={{ cardStack: { gesturesEnabled: false }, headerShown: false }}/>
            </Stack.Navigator>
        )
    }

    function AppDrawer() {
        return (
            <Drawer.Navigator>
                <Drawer.Screen
                    name='Friends'
                    component={Friends}
                    options={{ drawerIcon: ({ focused, color, size }) => <Ionicons color={color} size={size} name='ios-videocam'/>}}/>
                <Drawer.Screen
                    name='Invite Friends'
                    component={InviteContacts}
                    options={{ drawerIcon: ({ focused, color, size }) => <Ionicons color={color} size={size} name='ios-person-add'/>}}/>
                <Drawer.Screen
                    name='Friend Requests'
                    component={FriendRequests}
                    options={{ drawerIcon: ({ focused, color, size }) => <Ionicons color={color} size={size} name='ios-paper-plane'/>}}/>
                <Drawer.Screen
                    name='Profile'
                    component={Profile}
                    options={{ drawerIcon: ({ focused, color, size }) => <Ionicons color={color} size={size} name='ios-contact'/>}}/>
            </Drawer.Navigator>
        )
    }

    return (
        <NavigationContainer ref={navigationRef} style={styles.container}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Auth' component={AuthStack}/>
                <Stack.Screen name='App' component={AppDrawer}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AppContainer;