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

function AppContainer() {
    const { loading } = useSelector(state => ({
        loading: state.loading
    }));

    // const Stack = createStackNavigator();
    const Drawer = createDrawerNavigator();

    if (loading) {
        return <Loading/>
    }

    return (
        <NavigationContainer style={styles.container}>
            <Drawer.Navigator>
                <Drawer.Screen name='Invite Friends' component={InviteContacts}/>
                <Drawer.Screen name='Friend Requests' component={FriendRequests}/>
                <Drawer.Screen name='Friends' component={Friends}/>
            </Drawer.Navigator>
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