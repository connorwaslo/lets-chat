import React, { useState } from 'react';
import { View, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Layout, Input, Button, Text } from '@ui-kitten/components';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setPhone } from '../../redux/actions/actions';

function LogIn({ navigation }) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
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
            <KeyboardAvoidingView>
                <Layout style={{ paddingTop: '30%', paddingHorizontal: 15 }}>
                    <Input
                        label='Email'
                        placeholder='leo@dicaprio.com'
                        keyboardType='email-address'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.margin}
                    />
                    <Input
                        label='Password'
                        placeholder='********'
                        secureTextEntry={true}
                        value={pass}
                        onChangeText={text => setPass(text)}
                        style={styles.margin}
                    />

                    <Button status='primary' onPress={handleLogIn} style={styles.margin}>Log In</Button>

                    <Text category='s1' style={{ textAlign: 'center', marginVertical: 20 }}>Don't have an account?</Text>

                    <Button status='primary' onPress={() => navigation.navigate('Sign Up')} style={styles.margin}>
                        Sign Up
                    </Button>
                </Layout>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    margin: {
        marginVertical: 5
    }
});

export default LogIn;