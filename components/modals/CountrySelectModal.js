import React from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';
import { FlatList, Modal, TouchableOpacity } from 'react-native';
import { data } from '../../data/countries';
import CountryCode from '../CountryCode';

function CountrySelectModal({ visible, selectCountry, hideModal }) {
    return (
        <Modal animationType='slide' transparent={false} visible={visible}>
            <Layout style={{ flex: 1, marginTop: 50 }}>
                <Layout style={{ flex: 7 }}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => <CountryCode item={item} selectCountry={selectCountry}/>}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </Layout>
                <Layout style={{ flex: 1, justifyContent: 'center' }}>
                    <Button onPress={hideModal} status='danger'>
                        Cancel
                    </Button>
                </Layout>
            </Layout>
        </Modal>
    )
}

export default CountrySelectModal;