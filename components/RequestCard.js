import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Card } from '@ui-kitten/components';
import firebase from 'firebase/app';
import 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { addFriend, denyFriend } from '../redux/actions/actions';

function RequestCard({ item }) {
    const { name, phoneNumber } = item;
    const { incomingRequests, friends, phone } = useSelector(state => ({
        incomingRequests: state.incomingRequests,
        friends: state.friends,
        phone: state.phone
    }));
    const dispatch = useDispatch();

    async function handleAccept() {
        // Do nothing if already a friend...
        // Todo Change this to check all friends objects
        if (friends.includes(phoneNumber)) {
            alert('This person is already your friend... not sure how we got here.');
            return;
        }

        // Update redux
        let newRequests = incomingRequests;
        newRequests = newRequests.filter(item => item !== phoneNumber);

        // Get new friend's status
        let status = '';
        await firebase.database().ref(phoneNumber + '/profile').once('value')
            .then(snapshot => {
                status = (snapshot.val() && snapshot.val().status) || 'busy';
            })
            .catch(error => {
                alert(error.message);

                console.log('Error getting new friend status', error.message);
            });

        dispatch(addFriend({
            name: name,
            status: status,
            phone: phoneNumber
        }));

        // Remove from incomingRequests in firebase and add to friends
        firebase.database().ref(phone + '/incomingRequests').set(newRequests)
            .then(() => {
                let friendNums = [];

                // Redux has already been updated by now, so friends includes new friend as well
                friends.forEach(_item => {
                    friendNums.push(_item.phone);
                });

                // If successfully saved new incomingRequests in firebase then add to friends
                firebase.database().ref(phone + '/friends').set(friendNums)
                    .then(() => {
                        // Update new friend's friends list as well
                        const path = phoneNumber + '/friends';

                        // Read their current friends list to append to
                        firebase.database().ref(path).once('value')
                            .then(snapshot => {
                                let distFriends = snapshot.val();
                                if (!distFriends) {
                                    firebase.database().ref(path).set([
                                        phone
                                    ]).catch(error => {
                                        console.log('!distFriends, Could not save friend\'s friends', error.message);
                                    });
                                } else {
                                    firebase.database().ref(path).set([
                                        ...distFriends,
                                        phone
                                    ]).catch(error => {
                                        console.log('Could not save friend\'s friends', error.message);
                                    });
                                }

                                // Remove other friend's outgoing Requests too
                                firebase.database().ref(phoneNumber + '/outgoingRequests').once('value')
                                    .then(snapshot => {
                                        let outgoing = snapshot.val();
                                        outgoing = outgoing.filter(req => req !== phone);

                                        firebase.database().ref(phoneNumber + '/outgoingRequests')
                                            .set(outgoing)
                                            .catch(error => console.log('Could not remove from outgoing', error.message));
                                    })
                                    .catch(error => {
                                        console.log('Accept, remove outgoing error:', error.message);
                                    })
                            })

                        // Set their list with new phone number too
                    })
                    .catch(error => {
                        console.log('Error saving friends', error.message)
                    });
            })
            .catch(error => {
                console.log('Could not set incomingRequests on friend accept', error.message);
            });
    }

    function handleDeny() {
        let newRequests = incomingRequests;
        newRequests = newRequests.filter(item => item !== phoneNumber);

        dispatch(denyFriend(phoneNumber));

        // Remove that request from firebase
        firebase.database().ref(phone + '/incomingRequests').set(newRequests)
            .then(() => {
                // Remove other friend's outgoing Requests too
                firebase.database().ref(phoneNumber + '/outgoingRequests').once('value')
                    .then(snapshot => {
                        let outgoing = snapshot.val();
                        outgoing = outgoing.filter(req => req !== phone);

                        firebase.database().ref(phoneNumber + '/outgoingRequests')
                            .set(outgoing)
                            .catch(error => console.log('Could not remove from outgoing', error.message));
                    })
            })
            .catch(error => {
                console.log('Could not set incomingRequests on friend deny', error.message);
            });
    }

    return (
        <Card status='primary' style={{ flex: 1, padding: 10, margin: 5 }}>
            <Text category='h2' style={{ textAlign: 'center' }}>{name}</Text>
            <Text category='h6' style={{ textAlign: 'center' }}>{phoneNumber}</Text>
            <Button status='success' onPress={handleAccept} style={styles.button}>
                Accept
            </Button>
            <Button status='danger' onPress={handleDeny} style={styles.button}>
                Deny
            </Button>
        </Card>
    )
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 5
    }
});

export default RequestCard;