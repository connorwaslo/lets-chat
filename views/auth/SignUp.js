import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';

function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');

    function validatePassword() {
        // Password parameters here
        return true;
    }

    function handleSignUp() {
        if (validatePassword()) {
            firebase.auth().createUserWithEmailAndPassword(email, pass)
                .then(() => {
                    // Todo: Go to screens where user can set their status
                    // Todo: Implement auth stack

                    navigation.navigate('Invite Friends');
                })
                .catch(error => {
                    alert(error.message);

                    console.log('Could not create user with email and pass:', error.message);
                })
        } else {
            alert('Password must match confirm password');
        }
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
                placeholder='Phone Number*'
                onChangeText={text => setPhone(text)}
                value={phone}
                style={styles.textInput}
            />
            <TextInput
                placeholder='Password*'
                onChangeText={text => setPass(text)}
                value={pass}
                style={styles.textInput}
            />
            <TouchableOpacity onPress={handleSignUp}>
                <View style={{ marginHorizontal: 5, marginVertical: 10, padding: 10, backgroundColor: 'lightblue' }}>
                    <Text style={{ textAlign: 'center' }}>Sign Up</Text>
                </View>
            </TouchableOpacity>

            <Text style={{ textAlign: 'center' }}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Log In')}>
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

export default SignUp;