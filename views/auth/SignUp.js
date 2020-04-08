import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setName, setPhone } from '../../redux/actions/actions';

function SignUp({ navigation }) {
    const [name, setNameState] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhoneNum] = useState('');
    const [pass, setPass] = useState('');
    const dispatch = useDispatch();

    // Make sure that the user's information is valid and unique
    async function validateAccount() {
        let validPassword = true;
        let validPhoneNum = true;

        // See if phone number exists in firebase
        await firebase.database().ref('accounts/').once('value')
            .then(snapshot => {
                let allAccounts = snapshot.val();
                if (!allAccounts) {
                    validPhoneNum = true;
                } else {
                    for (const item in allAccounts) {
                        let existingNum = Object.keys(allAccounts[item])[0];

                        // Check and see if the phone numbers match
                        if (phone === existingNum) {
                            alert('This phone number is already in use.');
                            validPhoneNum = false;
                            break;
                        }
                    }
                }
            })
            .catch(error => {
                alert(error.message);

                console.log('Could not validate phone number', error.message);
            });

        return validPassword && validPhoneNum;
    }

    function handleSignUp() {
        validateAccount().then(result => {
            if (result) {
                firebase.auth().createUserWithEmailAndPassword(email, pass)
                    .then(() => {
                        const uid = firebase.auth().currentUser.uid;
                        // Store profile data in Firebase
                        firebase.database().ref(phone + '/profile').set({
                            name: name
                        }).then(() => {
                            // Save phone number as created account
                            firebase.database().ref('accounts/' + uid).set({
                                phone: phone
                            }).then(() => {
                                // Save data in redux
                                dispatch(setName(name));
                                dispatch(setPhone(phone));

                                navigation.navigate('Status');
                            }).catch(error => {
                                alert(error.message);

                                console.log('Could add account to accounts/ in firebase', error.message);
                            })
                        }).catch(error => {
                            alert(error.message);

                            console.log('There was a problem saving your account data', error.message);
                        });
                    })
                    .catch(error => {
                        alert(error.message);

                        console.log('Could not create user with email and pass:', error.message);
                    })
            }
        });
    }

    return (
        <SafeAreaView>
            <TextInput
                placeholder='Name*'
                onChangeText={text => setNameState(text)}
                value={name}
                style={styles.textInput}
            />
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
            <TouchableOpacity onPress={handleSignUp}>
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

export default SignUp;