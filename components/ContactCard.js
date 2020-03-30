import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { addOutgoingRequest } from '../redux/actions/actions';

function ContactCard({ userInfo }) {
    const { name } = userInfo;
    const phone = userInfo.phoneNumbers[0]; // Todo: Parse this

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
        if (!outgoingRequests.includes(phone)) {
            await _requestFriend();
            dispatch(addOutgoingRequest(phone));
        }
    }

    /*
     * To be called once firebase already checked for duplicates
     */
    function _requestFriend() {
        firebase.database().ref('+16025554181/outgoingRequests')
            .set([
                ...outgoingRequests,
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
                <TouchableOpacity onPress={_handleInviteFriend}>
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