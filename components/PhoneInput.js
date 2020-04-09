import React, { useState } from 'react';
import { Modal, FlatList, TouchableOpacity } from 'react-native';
import { Layout, Input, Button, Text } from '@ui-kitten/components';
import { data } from '../data/countries';

const defaultCountry = data.filter(obj => obj.name === 'United States')[0];

function PhoneInput({ onChangeText }) {
    const [country, setCountry] = useState(defaultCountry);
    const [modalVisible, setModalVisible] = useState(false);

    const countryData = data;

    const showModal = () => setModalVisible(true);
    const hideModal = () => {
        setModalVisible(false);
        // Todo: Focus on phone input ref
    };

    async function selectCountry(country) {
        console.log('Change country');
        const countryData = await data;

        try {
            const curCountry = await countryData.filter(
                obj => obj.name === country
            )[0];

            setCountry(curCountry);
            console.log(curCountry.dial_code);
            await hideModal();
        } catch (err) {
            console.log('Error pressing country:', err);
        }
    }

    function handleChangeText(text) {
        onChangeText(country.dial_code + text);
    }

    return (
        <Layout style={{ padding: 10, flexDirection: 'row' }}>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onTouchStart={showModal}>
                <Text>{country.flag} {country.dial_code}</Text>
            </Layout>
            <Layout style={{ flex: 8 }}>
                <Input
                    placeholder='1234567890'
                    type='phone-pad'
                    onChangeText={text => handleChangeText(text)}/>

                <Modal animationType='slide' transparent={false} visible={modalVisible}>
                    <Layout style={{ flex: 1, marginTop: 50 }}>
                        <Layout style={{ flex: 7 }}>
                            <FlatList
                                data={countryData}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => selectCountry(item.name)}
                                    >
                                        <Layout
                                            style={{ flex: 1, flexDirection: 'row', paddingVertical: 15, paddingHorizontal: 20,
                                                marginHorizontal: 15, marginVertical: 5, borderColor: 'lightgrey',
                                                borderWidth: 1, borderRadius: 4 }}>
                                            <Text category='h6'>{item.flag} {item.name} ({item.dial_code})</Text>
                                        </Layout>
                                    </TouchableOpacity>
                                )}
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
            </Layout>
        </Layout>
    )
}

export default PhoneInput;