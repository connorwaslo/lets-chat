import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Layout, Input, Text, Button } from '@ui-kitten/components';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setName, setPhone } from '../../redux/actions/actions';
import PhoneInput from '../../components/PhoneInput';

function SignUp({ navigation }) {
    const [name, setNameState] = useState('');
    const [email, setEmail] = useState('');
    const [countryCode, setCountryCode] = useState('+1');
    const [phone, setPhoneNum] = useState('');
    const [pass, setPass] = useState('');
    const dispatch = useDispatch();

    // Make sure that the user's information is valid and unique
    async function validateAccount() {
        let validPassword = true;
        let validPhoneNum = () => {
            // Assume that country code is accurate because choices are given to user
            // All digits. 10 Digits.
            let isNum = /^\d+$/.test(phone);
            return isNum && phone.length === 10;
        };
        let phoneExists = false;

        // See if phone number exists in firebase
        const fullPhone = countryCode + phone;
        await firebase.database().ref('accounts/').once('value')
            .then(snapshot => {
                let allAccounts = snapshot.val();
                if (!allAccounts) {
                    phoneExists = false;
                } else {
                    for (const item in allAccounts) {
                        let existingNum = Object.keys(allAccounts[item])[0];

                        // Check and see if the phone numbers match
                        if (fullPhone === existingNum) {
                            alert('This phone number is already in use.');
                            phoneExists = true;
                            break;
                        }
                    }
                }
            })
            .catch(error => {
                alert(error.message);

                console.log('Could not validate phone number', error.message);
            });

        return validPassword && validPhoneNum && !phoneExists;
    }

    function handleSignUp() {
        const fullPhone = countryCode + phone;
        validateAccount().then(result => {
            if (result) {
                firebase.auth().createUserWithEmailAndPassword(email, pass)
                    .then(() => {
                        const uid = firebase.auth().currentUser.uid;
                        // Store profile data in Firebase
                        firebase.database().ref(fullPhone + '/profile').set({
                            name: name
                        }).then(() => {
                            // Save phone number as created account
                            firebase.database().ref('accounts/' + uid).set({
                                fullPhone: fullPhone
                            }).then(() => {
                                // Save data in redux
                                dispatch(setName(name));
                                dispatch(setPhone(fullPhone));

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
            <Layout style={{ paddingTop: '20%', paddingHorizontal: 15 }}>
                <Input
                    label='Name'
                    placeholder='Amy Adams'
                    value={name}
                    onChangeText={text => setNameState(text)}
                    style={styles.margin}
                />
                <Input
                    label='Email'
                    placeholder='amy@adams.com'
                    keyboardType='email-address'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.margin}
                />
                <PhoneInput onChangeText={setPhoneNum} setCountryCode={setCountryCode}/>
                <Input
                    label='Password'
                    placeholder='********'
                    secureTextEntry={true}
                    value={pass}
                    onChangeText={text => setPass(text)}
                    style={styles.margin}
                />

                <Button status='primary' onPress={handleSignUp} style={styles.margin}>Sign Up</Button>
            </Layout>
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
    },
    margin: {
        marginVertical: 5
    }
});

export default SignUp;