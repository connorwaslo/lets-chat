import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Modal, Text } from '@ui-kitten/components';

function FriendInfoModal({ visible, hideModal, name, phone, status }) {
    const countryCode = phone.substring(0, phone.length - 10);
    const phoneNumber = phone.substr(phone.length - 10);

    return (
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={hideModal}
        >
            <Card disabled={true} style={{ marginHorizontal: 15 }}>
                <Text category='h1' style={{ textAlign: 'center' }}>{name}</Text>
                <Text category='h5' style={{ textAlign: 'center', marginTop: 20, marginBottom: 40 }}>
                    {countryCode} {phoneNumber}
                </Text>
                <Text category='s1' style={{ textAlign: 'center', marginBottom: 10 }}>STATUS</Text>
                <Text
                    category='h5'
                    status={status === 'ready' ? 'primary' : 'warning'}
                    style={{ textAlign: 'center', marginBottom: 20 }}>{status.toUpperCase()}</Text>
            </Card>
        </Modal>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
});

export default FriendInfoModal;