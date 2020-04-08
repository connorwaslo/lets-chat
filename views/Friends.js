import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import FriendCard from '../components/FriendCard';
import { useDispatch, useSelector } from 'react-redux';
import DrawerHeader from '../components/DrawerHeader';
import firebase from 'firebase/app';
import 'firebase/database';
import { setContacts, setFriends } from '../redux/actions/actions';

function Friends({ navigation }) {
    const { phone, friends, contacts } = useSelector(state => ({
        phone: state.phone,
        friends: state.friends,
        contacts: state.contacts
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        let friendsListener = firebase.database().ref(phone + '/friends').on('value', snapshot => {
            if (snapshot) {
                let dbFriends = snapshot.val() || [];
                // console.log('Friends:', friends);
                let friendNums = friends.map(friend => friend.phone);

                // console.log(dbFriends.length, friendNums.length);
                if (dbFriends.length !== friendNums) {
                    let friendContacts = friends;

                    // Get dbFriends - friendNums
                    // Expect the length to be 1
                    let newFriends = dbFriends.filter(num => !friendNums.includes(num));
                    if (newFriends.length === 0) {
                        return;
                    }

                    let addFriend = {};

                    // Store contacts that do not include new friend
                    // This is so that when accepting a friend request it removes that friend from the "invite" view
                    let updatedContacts = contacts;

                    // Get contact for new friend
                    contacts.forEach(contact => {
                        contact.phoneNumbers.forEach(num => {
                            if (newFriends.includes(num)) {
                                addFriend.name = contact.name;
                                addFriend.phone = num;

                                newFriends = newFriends.filter(indiv => indiv !== num);
                                updatedContacts = updatedContacts.filter(contact => !contact.phoneNumbers.includes(num));
                            }
                        })
                    });

                    // Remove friend from contacts listed in "Invite" view
                    dispatch(setContacts(updatedContacts));

                    // If for whatever reason there are remaining numbers in newFriends...
                    if (newFriends.length > 0) {
                        addFriend.name = 'Not a Contact';
                        addFriend.phone = newFriends[0];
                    }

                    // Get status for this phone number
                    firebase.database().ref(addFriend.phone + '/profile').once('value')
                        .then(snapshot => {
                            addFriend.status = (snapshot.val() && snapshot.val().status) || 'error';
                            friendContacts.push(addFriend);

                            dispatch(setFriends(friendContacts));
                        })
                }
            }
        });

        return () => {
            // Unsubscribe
            friendsListener();
        }
    }, []);

    return (
        <DrawerHeader navigation={navigation} title='Friends'>
            <FlatList
                data={friends}
                renderItem={({ item }) => <FriendCard userInfo={item}/>}
                keyExtractor={(item, index) => index.toString()}
            />
        </DrawerHeader>
    )
}

export default Friends;