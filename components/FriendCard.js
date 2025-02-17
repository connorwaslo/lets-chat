import React, { useEffect, useState } from 'react';
import { Linking, View, StyleSheet } from 'react-native';
import { Layout, Button, Card, Text } from '@ui-kitten/components';
import { updateFriendStatus } from '../redux/actions/actions';
import { useDispatch } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/database';
import BusyFriendModal from './modals/BusyFriendModal';
import FriendInfoModal from './modals/FriendInfoModal';

function FriendCard({ userInfo }) {
    const [busyModalVisible, setBusyModal] = useState(false);
    const [infoModalVisible, setInfoModal] = useState(false);
    const { name, status } = userInfo;
    const phone = userInfo.phone;
    const dispatch = useDispatch();

    const showBusyModal = () => setBusyModal(true);
    const hideBusyModal = () => setBusyModal(false);

    const showInfoModal = () => setInfoModal(true);
    const hideInfoModal = () => setInfoModal(false);

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

        return (
            <Button status='warning' onPress={showBusyModal} style={styles.button}>
                Busy
            </Button>
        )
    }

    return (
        <Card onPress={showInfoModal} style={{ padding: 0, margin: 5, backgroundColor: '#F2F2F2' }}>
            <View style={styles.container}>
                <View style={styles.left}>
                    <Text category='h4' style={styles.contact}>{name}</Text>
                </View>
                <Layout style={styles.right}>
                    {renderButton()}
                    <BusyFriendModal visible={busyModalVisible} hideModal={hideBusyModal} name={name} phone={phone}/>
                </Layout>
            </View>
            <FriendInfoModal visible={infoModalVisible} hideModal={hideInfoModal} name={name} phone={phone} status={status}/>
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // margin: 5,
        padding: 15
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
        paddingLeft: 10
    },
    button: {
        width: '50%',
        height: '50%'
    }
});

export default FriendCard;