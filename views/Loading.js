import React from 'react';
import { View, Image, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { setFriendRequests, setName } from '../redux/actions/actions';
import firebase from 'firebase/app';
import 'firebase/database';

function Loading({ navigation }) {
    const dispatch = useDispatch();

    async function _loadUserData() {
        // Todo: Check if the user is logged in first
        // We'll just use placeholder data for now
        console.log('Loaded splash screen...');
        await firebase.database().ref('+16025554181/').once('value')
            .then(snapshot => {
                let name = (snapshot.val() && snapshot.val().name) || 'No Name';
                let friendRequests = (snapshot.val() && snapshot.val().friendRequests) || [];

                console.log('Name:', name);
                console.log('Friend Requests:', friendRequests);

                dispatch(setName(name));
                dispatch(setFriendRequests(friendRequests));
                setTimeout(() => {
                    console.log('Trying to navigate to invite friends');
                    navigation.navigate('Invite Friends');
                }, 1500);
            })
            .catch(error => {
                console.log('Could not load user data:', error.message);
            });
    }

    return (
        <View style={{ flex: 1 }}>
            <Text>Loading...</Text>
            <Image
                source={require('../assets/splash.png')}
                onLoad={_loadUserData}
            />
        </View>
    )
}

export default Loading;