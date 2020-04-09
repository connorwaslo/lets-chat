import React from 'react';
import { StyleSheet, Linking } from 'react-native';
import { Button, Card, Modal, Text } from '@ui-kitten/components';

function BusyFriendModal({ visible, hideModal, name, phone }) {
    function handleCall() {
        hideModal();
        Linking.openURL(`facetime:${phone}`);
    }

    return (
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={hideModal}
        >
            <Card disabled={true} style={{ marginHorizontal: 15 }}>
                <Text category='h2' style={{ textAlign: 'center' }}>You sure?</Text>
                <Text category='s1' style={{ textAlign: 'center', marginVertical: 15 }}>
                    {name} said they were busy. You can still call them if you want.
                </Text>

                <Button status='primary' onPress={handleCall}>
                    Call
                </Button>
            </Card>
        </Modal>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
});

export default BusyFriendModal;