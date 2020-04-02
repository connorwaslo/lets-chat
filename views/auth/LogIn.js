import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';

function LogIn({ navigation }) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    function handleLogIn() {
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(() => {
                navigation.navigate('App');
            })
            .catch(error => {
                alert(error.message);

                console.log('Cannot log in with email and pass:', error.message);
            })
    }

    return (
        <SafeAreaView>
            <TextInput
                placeholder='Email*'
                onChangeText={text => setEmail(text)}
                value={email}
                style={styles.textInput}
            />
            <TextInput
                placeholder='Password*'
                onChangeText={text => setPass(text)}
                value={pass}
                style={styles.textInput}
            />

            <TouchableOpacity onPress={handleLogIn}>
                <View style={{ marginHorizontal: 5, marginVertical: 10, padding: 10, backgroundColor: 'lightblue' }}>
                    <Text style={{ textAlign: 'center' }}>Log In</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textInput: {
        padding: 7.5,
        marginHorizontal: 5,
        marginVertical: 20,
        borderBottomWidth: 2,
        borderColor: 'darkgrey',
    }
});

export default LogIn;