import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Friends from './src/views/Friends';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer style={styles.container}>
            <Stack.Navigator>
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
