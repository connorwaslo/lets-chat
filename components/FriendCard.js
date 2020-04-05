import React, { useEffect } from 'react';
import { TouchableOpacity, Linking, View, Text, StyleSheet } from 'react-native';
import { updateFriendStatus } from '../redux/actions/actions';
import { useDispatch } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/database';

function FriendCard({ userInfo }) {
    const { name, status } = userInfo;
    const phone = userInfo.phone;
    const dispatch = useDispatch();

    useEffect(() => {
        firebase.database().ref(phone + '/profile').on('value', snapshot => {
            let status = (snapshot.val() && snapshot.val().status) || 'error';

            console.log(phone, '=', status);
            dispatch(updateFriendStatus({
                name: name,
                phone: phone,
                status: status
            }));
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Text style={styles.contact}>{name}</Text>
            </View>
            <View style={styles.right}>
                <TouchableOpacity onPress={() => Linking.openURL(`facetime:${phone}`)}>
                    <View style={status === 'ready' ? styles.readyButton : styles.busyButton}>
                        <Text>Call</Text>
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
        backgroundColor: '#E0E0E0'
    },
    left: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    contact: {
        paddingLeft: 10,
        fontSize: 22
    },
    readyButton: {
        marginRight: 10,
        padding: 15,
        backgroundColor: '#60d688',
        borderRadius: 10
    },
    busyButton: {
        marginRight: 10,
        padding: 15,
        backgroundColor: '#FF7B2E',
        borderRadius: 10
    }
})

export default FriendCard;