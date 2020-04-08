import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'galio-framework';
import { useDispatch, useSelector } from 'react-redux';
import { resetApp, setStatus } from '../redux/actions/actions';
import DrawerHeader from '../components/DrawerHeader';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

function Profile({ navigation }) {
    const { name, phone, status } = useSelector(state => ({
        name: state.name,
        phone: state.phone,
        status: state.status
    }));
    const dispatch = useDispatch();

    function setUserStatus(newStatus) {
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
            <Text style={styles.header}>Phone Number</Text>
            <Text style={styles.text}>{phone}</Text>

            <Text style={styles.header}>Status</Text>
            <Text style={styles.text}>{status.toUpperCase()}</Text>

            <View style={{ flex: 1, alignItems: 'center' }}>
                <Button
                    round uppercase color={status === 'ready' ? 'success' : '#BDBDBD'}
                    shadowless
                    onPress={() => setUserStatus('ready')}
                    style={styles.statusButton}>Ready</Button>
                <Button
                    round uppercase color={status === 'busy' ? 'warning' : '#BDBDBD'}
                    shadowless
                    onPress={() => setUserStatus('busy')}
                    style={styles.statusButton}>Busy</Button>
            </View>
            <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                <Button
                    round uppercase color='error' shadowless
                    onPress={handleSignout}
                >
                    Sign Out
                </Button>
            </View>
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
        marginTop: 10,
        marginBottom: 30
    },
    statusButton: {
        margin: 10
    }
});

export default Profile;