import React from 'react';
import Loading from './views/Loading';
import InviteContacts from './views/InviteContacts';
import Friends from './views/Friends';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { navigationRef } from './utils/RootNavigation';
import { Icon } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import FriendRequests from './views/FriendRequests';
import SignUp from './views/auth/SignUp';
import LogIn from './views/auth/LogIn';
import Status from './views/auth/Status';
// import { Ionicons } from '@expo/vector-icons';
import Profile from './views/Profile';

function AppContainer() {
    const Stack = createStackNavigator();
    const Drawer = createDrawerNavigator();

    // Todo: If not authenticated render the auth stack
    function AuthStack() {
        return (
            <Stack.Navigator>
                <Stack.Screen name='Log In' component={LogIn} options={{cardStyle: { backgroundColor: '#FFF' }}}/>
                <Stack.Screen name='Sign Up' component={SignUp} options={{cardStyle: { backgroundColor: '#FFF' }}}/>
                <Stack.Screen name='Status' component={Status} options={{cardStyle: { backgroundColor: '#FFF' }}}/>
                <Stack.Screen name='Loading' component={Loading}
                              options={{ cardStack: { gesturesEnabled: false }, headerShown: false,
                                         cardStyle: { backgroundColor: '#FFF' }}}/>
            </Stack.Navigator>
        )
    }

    function AppDrawer() {
        return (
            <Drawer.Navigator>
                <Drawer.Screen
                    name='Friends'
                    component={Friends}
                    options={{ drawerIcon: ({ focused, color, size }) => (
                            <Icon fill={color} style={{ width: size, height: size }} pack='eva' name='video-outline'/>
                        )}}/>
                <Drawer.Screen
                    name='Invite Friends'
                    component={InviteContacts}
                    options={{ drawerIcon: ({ focused, color, size }) => (
                            <Icon fill={color} style={{ width: size, height: size }} name='person-add-outline'/>
                        )}}/>
                <Drawer.Screen
                    name='Friend Requests'
                    component={FriendRequests}
                    options={{ drawerIcon: ({ focused, color, size }) => (
                            <Icon fill={color} style={{ width: size, height: size }} name='email-outline'/>
                        )}}/>
                <Drawer.Screen
                    name='Profile'
                    component={Profile}
                    options={{ drawerIcon: ({ focused, color, size }) => (
                            <Icon fill={color} style={{ width: size, height: size }} name='person-outline'/>
                        )}}/>
            </Drawer.Navigator>
        )
    }

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Auth' component={AuthStack}/>
                <Stack.Screen name='App' component={AppDrawer}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppContainer;