import React from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { addOutgoingRequest } from '../redux/actions/actions';
import { Card, Text, Button } from '@ui-kitten/components';

function ContactCard({ userInfo }) {
    const { name } = userInfo;
    const phoneNum = userInfo.phoneNumbers[0]; // Todo: Parse this
    const { phone } = useSelector(state => ({
        phone: state.phone
    }));

    const dispatch = useDispatch();
    const { outgoingRequests } = useSelector(state => ({
        outgoingRequests: state.outgoingRequests
    }));

    /*
     * This function is responsible for:
     * - Adding contact to database if they don't exist already
     * - Prepping a "share" text message to individuals who don't have accounts (if user accepts)
     */
    async function _handleInviteFriend() {
        // Check if already sent request
        if (!outgoingRequests.includes(phoneNum)) {
            await _requestFriend();
            dispatch(addOutgoingRequest(phoneNum));
        }
    }

    /*
     * To be called once firebase already checked for duplicates
     */
    function _requestFriend() {
        firebase.database().ref(phone + '/outgoingRequests')
            .set([
                ...outgoingRequests,
                phoneNum
            ])
            .then(() => {
                const path = phoneNum + '/incomingRequests';
                firebase.database().ref(path).once('value')
                    .then(snapshot => {
                        let incReqs = snapshot.val();
                        if (!incReqs) {
                            firebase.database().ref(path).set([
                                phone
                            ]).catch(error => console.log('Could not set first inc req:', error.message));
                        } else {
                            firebase.database().ref(path).set([
                                ...incReqs,
                                phone
                            ]).catch(error => console.log('Could not update inc reqs:', error.message));
                        }
                    })
                    .catch(error => {
                        console.log('Error setting incoming request to your friend:', error.message);
                    })
            })
            .catch(error => {
                console.log('Something went wrong requesting friend', error.message);
            })
    }

    return (
        <Card style={styles.container}>
            <Text category='h6' style={styles.text}>{name}</Text>
            <Text category='s1' style={styles.text}>{phoneNum}</Text>
            <Button status='success' onPress={_handleInviteFriend} style={{ width: '100%', marginTop: 10 }}>
                Invite
            </Button>
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 5,
        backgroundColor: '#F2F2F2'
    },
    text: {
        textAlign: 'center',
        marginVertical: 5
    }
});

export default ContactCard;