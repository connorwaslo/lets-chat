import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setPhone } from '../../redux/actions/actions';

function LogIn({ navigation }) {
    const [email, setEmail] = useState('connorwaslo29@gmail.com');
    const [pass, setPass] = useState('password');
    const dispatch = useDispatch();

    function handleLogIn() {
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(() => {
                const uid = firebase.auth().currentUser.uid;

                // Get user phone number
                firebase.database().ref('accounts/' + uid).once('value')
                    .then(snapshot => {
                        const phone = (snapshot.val() && snapshot.val().phone) || 'ERROR_NO_PHONE';

                        dispatch(setPhone(phone));

                        // Todo: May consider resetting state for this component so it's blank on sign out
                        navigation.navigate('Loading');
                    })
                    .catch(error => {
                        console.log('Could not get user phone number on log in', error.message);
                    });
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
                keyboardType='email-address'
                textContentType='emailAddress'
                style={styles.textInput}
            />
            <TextInput
                placeholder='Password*'
                onChangeText={text => setPass(text)}
                value={pass}
                secureTextEntry={true}
                textContentType='password'
                style={styles.textInput}
            />

            <TouchableOpacity onPress={handleLogIn}>
                <View style={{ marginHorizontal: 5, marginVertical: 10, padding: 10, backgroundColor: 'lightblue' }}>
                    <Text style={{ textAlign: 'center' }}>Log In</Text>
                </View>
            </TouchableOpacity>

            <Text style={{ textAlign: 'center' }}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
                <View style={{ marginHorizontal: 5, marginVertical: 10, padding: 10, backgroundColor: 'lightblue' }}>
                    <Text style={{ textAlign: 'center' }}>Sign Up</Text>
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