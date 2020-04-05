import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
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

    function handleAccept() {
        // Do nothing if already a friend...
        // Todo Change this to check all friends objects
        if (friends.includes(phoneNumber)) {
            alert('This person is already your friend... not sure how we got here.');
            return;
        }

        // Update redux
        let newRequests = incomingRequests;
        newRequests = newRequests.filter(item => item !== phoneNumber);

        // Todo: May need to use uid here instead
        dispatch(addFriend({
            name: name,
            status: 'ready', // Todo: Should be user's specific status
            phone: phoneNumber
        }));

        // Remove from incomingRequests in firebase and add to friends
        firebase.database().ref(phone + '/incomingRequests').set(newRequests)
            .then(() => {
                let friendNums = [];
                friends.forEach(item => {
                    friendNums.push(item.phone);
                });

                // If successfully saved new incomingRequests in firebase then add to friends
                firebase.database().ref(phone + '/friends').set(friendNums)
                    .catch(error => console.log('Error saving friends', error.message));
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
            .catch(error => {
                console.log('Could not set incomingRequests on friend accept', error.message);
            });
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'lightblue', padding: 10, margin: 5 }}>
            <Text style={{ textAlign: 'center', fontSize: 18 }}>{name}  |  {phoneNumber}</Text>
            <TouchableOpacity onPress={handleAccept}>
                <View style={{ padding: 10, marginVertical: 5, backgroundColor: 'lightgreen' }}>
                    <Text style={{ textAlign: 'center' }}>Accept</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeny}>
                <View style={{ padding: 10, marginVertical: 5, backgroundColor: 'red' }}>
                    <Text style={{ textAlign: 'center' }}>Deny</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default RequestCard;