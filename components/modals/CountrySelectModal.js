import React, { useState } from 'react';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { FlatList, KeyboardAvoidingView, Modal, TouchableOpacity } from 'react-native';
import { data } from '../../data/countries';
import CountryCode from '../CountryCode';

function CountrySelectModal({ visible, selectCountry, hideModal }) {
    const [search, setSearch] = useState('');

    const countries = data.filter(country => country.name.includes(search));

    return (
        <Modal animationType='slide' transparent={false} visible={visible}>
            <Layout style={{ flex: 1, marginTop: 50 }}>
                <Layout style={{ flex: 1, justifyContent: 'center', marginHorizontal: 15 }}>
                    <Input
                        placeholder='Search for your country...'
                        size='large'
                        autoCorrect={false}
                        onChangeText={text => setSearch(text)}/>
                </Layout>
                <Layout style={{ flex: 7 }}>
                    <FlatList
                        data={countries}
                        renderItem={({ item }) => <CountryCode item={item} selectCountry={selectCountry}/>}
                        keyExtractor={(item, index) => index.toString()}
                        keyboardShouldPersistTaps='always'
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