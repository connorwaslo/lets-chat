import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/database';

function ContactCard({ userInfo }) {
    const { name } = userInfo;
    const phone = userInfo.phoneNumbers[0]; // Todo: Parse this

    /*
     * This function is responsible for:
     * - Adding contact to database if they don't exist already
     * - Prepping a "share" text message to individuals who don't have accounts (if user accepts)
     */
    function _handleInviteFriend(reqPhone) {
        // Check if already sent request
        // Todo: Phone number replaced by current user phone number
        firebase.database().ref('+16025554181/friendRequests/').once('value')
            .then(snapshot => {
                if (snapshot.val()) {
                    // console.log('No friend request sent yet');
                    let pendingReqs = [];
                    for (const index in snapshot.val()) {
                        console.log(snapshot.val()[index]);
                        pendingReqs.push(snapshot.val()[index]);
                    }

                    if (!pendingReqs.includes(phone)) {
                        _requestFriend(pendingReqs);
                    }
                }
            })
            .catch(error => {
                console.log('Something went wrong checking if friend request already exists:', error.message);
            });
    }

    /*
     * To be called once firebase already checked for duplicates
     */
    function _requestFriend(pendingReqs) {
        firebase.database().ref('+16025554181/friendRequests')
            .set([
                ...pendingReqs,
                phone
            ])
            .catch(error => {
                console.log('Something went wrong requesting friend', error.message);
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Text style={styles.contact}>{name}{'\n'}{phone}</Text>
            </View>
            <View style={styles.right}>
                <TouchableOpacity onPress={() => _handleInviteFriend()}>
                    <View style={styles.addButton}>
                        <Text>+</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        padding: 15,
        backgroundColor: '#C9C9C9'
    },
    left: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    contact: {
        paddingLeft: 10
    },
    addButton: {
        marginRight: 10,
        padding: 15,
        backgroundColor: '#60d688',
        borderRadius: 10
    }
})

export default ContactCard;