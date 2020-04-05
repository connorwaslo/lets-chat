import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setPhone } from '../../redux/actions/actions';

function LogIn({ navigation }) {
    const [email, setEmail] = useState('test@gmail.com');
    const [phone, setPhoneNum] = useState('+16233266838');
    const [pass, setPass] = useState('password');
    const dispatch = useDispatch();

    function handleLogIn() {
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(() => {
                // Pull profile data on login
                dispatch(setPhone(phone));

                navigation.navigate('Loading');
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
                placeholder='Phone Number*'
                onChangeText={text => setPhoneNum(text)}
                value={phone}
                keyboardType='phone-pad'
                textContentType='telephoneNumber'
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