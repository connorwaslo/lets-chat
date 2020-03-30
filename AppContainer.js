import React from 'react';
import Loading from './views/Loading';
import InviteContacts from './views/InviteContacts';
import Friends from './views/Friends';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

function AppContainer() {
    const { loading } = useSelector(state => ({
        loading: state.loading
    }));

    const Stack = createStackNavigator();

    if (loading) {
        return <Loading/>
    }

    return (
        <NavigationContainer style={styles.container}>
            <Stack.Navigator>
                <Stack.Screen name='Invite Friends' component={InviteContacts}/>
                <Stack.Screen name='Friends' component={Friends}/>
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