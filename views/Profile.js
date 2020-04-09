import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Layout } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { resetApp, setStatus } from '../redux/actions/actions';
import DrawerHeader from '../components/DrawerHeader';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

function Profile({ navigation }) {
    const [buttonStatus, setButtonStatus] = useState('');
    const { name, phone, status } = useSelector(state => ({
        name: state.name,
        phone: state.phone,
        status: state.status
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        setButtonStatus(status);
    }, []);

    function setUserStatus(newStatus) {
        setButtonStatus(newStatus);
        if (newStatus !== status) {
            dispatch(setStatus(newStatus));
            // Todo: set status in firebase
            firebase.database().ref(phone + '/profile')
                .update({
                    status: newStatus
                })
                .catch(error => {
                    console.log('Could not save new status in firebase', error.message);
                })
        }
    }

    function handleSignout() {
        dispatch(resetApp());

        firebase.auth().signOut().then(() => {
            navigation.navigate('Log In');
        }).catch(error => {
            alert('Could not sign you out ' + error.message);

            console.log('Could not sign user out', error.message);
        })
    }

    return (
        <DrawerHeader navigation={navigation} title={name}>
            <Layout style={{ flex: 1, padding: 15 }}>
                <View style={{ marginBottom: 15 }}>
                    <Text category='h3' style={styles.text}>Phone Number</Text>
                    <Text category='s1' style={styles.text}>{phone}</Text>
                </View>

                <View style={{ marginBottom: 15 }}>
                    <Text category='h3' style={styles.text}>Status</Text>
                    <Text category='s1' style={styles.text}>{status.toUpperCase()}</Text>
                </View>

                <View style={{ flex: 5, alignItems: 'center' }}>
                    <Button
                        status={buttonStatus === 'ready' ? 'success' : 'basic'}
                        onPress={() => setUserStatus('ready')}
                        style={styles.button}>Ready</Button>
                    <Button
                        status={buttonStatus === 'busy' ? 'warning' : 'basic'}
                        shadowless
                        onPress={() => setUserStatus('busy')}
                        style={styles.button}>Busy</Button>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Button
                        status='danger'
                        onPress={handleSignout}
                        style={styles.button}
                    >
                        Sign Out
                    </Button>
                </View>
            </Layout>
        </DrawerHeader>
    )
}

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },
    text: {
        textAlign: 'center',
        marginTop: 5
    },
    button: {
        margin: 10,
        width: '100%'
    }
});

export default Profile;