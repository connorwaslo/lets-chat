import React from 'react';
import Loading from './views/Loading';
import InviteContacts from './views/InviteContacts';
import Friends from './views/Friends';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import FriendRequests from './views/FriendRequests';
import SignUp from './views/auth/SignUp';
import LogIn from './views/auth/LogIn';

function AppContainer() {
    const { loading, name } = useSelector(state => ({
        loading: state.loading,
        name: name
    }));

    const Stack = createStackNavigator();
    const Drawer = createDrawerNavigator();

    if (loading) {
        return <Loading/>
    }

    // Todo: If not authenticated render the auth stack
    function AuthStack() {
        return (
            <Stack.Navigator>
                <Stack.Screen name='Sign Up' component={SignUp}/>
                <Stack.Screen name='Log In' component={LogIn}/>
            </Stack.Navigator>
        )
    }

    function AppDrawer() {
        return (
            <Drawer.Navigator>
                <Drawer.Screen name='Invite Friends' component={InviteContacts}/>
                <Drawer.Screen name='Friend Requests' component={FriendRequests}/>
                <Drawer.Screen name='Friends' component={Friends}/>
            </Drawer.Navigator>
        )
    }

    return (
        <NavigationContainer style={styles.container}>
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