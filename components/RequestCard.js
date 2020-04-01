import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { addFriend, setIncomingRequests } from '../redux/actions/actions';

function RequestCard({ item }) {
    const { name, phone } = item;
    const { incomingRequests, friends } = useSelector(state => ({
        incomingRequests: state.incomingRequests,
        friends: state.friends
    }));
    const dispatch = useDispatch();

    function handleAccept() {
        // Do nothing if already a friend...
        if (friends.includes(phone)) {
            alert('This person is already your friend... not sure how we got here.');
            return;
        }

        // Update redux
        let newRequests = incomingRequests;
        newRequests = newRequests.filter(item => item !== phone);

        // Todo: May need to use uid here instead
        dispatch(addFriend(phone));

        // Remove from incomingRequests in firebase and add to friends
        // Todo: Change hardcoded phone number to be current user
        // Todo: Make sure not already a friend
        firebase.database().ref('+16025554181/incomingRequests').set(newRequests)
            .then(() => {
                // If successfully saved new incomingRequests in firebase then add to friends
                firebase.database().ref('+16025554181/friends').set(friends)
                    .then(() => {})
                    .catch(error => console.log('Error saving friends', error.message));
            })
            .catch(error => {
                console.log('Could not set incomingRequests on friend accept', error.message);
            });
    }

    function handleDeny() {
        console.log('Lol that guys sucks');
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'lightblue', padding: 10, margin: 5 }}>
            <Text style={{ textAlign: 'center', fontSize: 18 }}>{name}  |  {phone}</Text>
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