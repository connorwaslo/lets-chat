import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Linking, View, Text, StyleSheet } from 'react-native';
import { Layout, Button } from '@ui-kitten/components';
import { updateFriendStatus } from '../redux/actions/actions';
import { useDispatch } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/database';
import BusyFriendModal from './modals/BusyFriendModal';

function FriendCard({ userInfo }) {
    const [modalVisible, setModalVisible] = useState(false);
    const { name, status } = userInfo;
    const phone = userInfo.phone;
    const dispatch = useDispatch();

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    useEffect(() => {
        let friendListener = firebase.database().ref(phone + '/profile').on('value', snapshot => {
            if (snapshot) {
                let status = (snapshot.val() && snapshot.val().status) || 'error';

                dispatch(updateFriendStatus({
                    name: name,
                    phone: phone,
                    status: status
                }));
            }
        });

        return () => {
            // Unsubscribe from friendListener on unmount
            friendListener();
        };
    }, []);

    function renderButton() {
        if (status === 'ready') {
            return (
                <Button status='primary' onPress={() => Linking.openURL(`facetime:${phone}`)} style={styles.button}>
                    Call
                </Button>
            )
        }

        // Todo: Open Modal asking if you're sure you want to call them
        return (
            <Button status='warning' onPress={showModal} style={styles.button}>
                Busy
            </Button>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Text style={styles.contact}>{name}</Text>
            </View>
            <Layout style={styles.right}>
                {renderButton()}
                <BusyFriendModal visible={modalVisible} hideModal={hideModal} name={name} phone={phone}/>
            </Layout>
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
        justifyContent: 'flex-end',
        backgroundColor: 'transparent'
    },
    contact: {
        paddingLeft: 10,
        fontSize: 22
    },
    button: {
        width: '50%'
    }
});

export default FriendCard;