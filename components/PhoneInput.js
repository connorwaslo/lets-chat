import React, { useState } from 'react';
import { Modal, FlatList, TouchableOpacity } from 'react-native';
import { Layout, Input, Button, Text } from '@ui-kitten/components';
import { data } from '../data/countries';
import CountrySelectModal from './modals/CountrySelectModal';

const defaultCountry = data.filter(obj => obj.name === 'United States')[0];

function PhoneInput({ onChangeText, setCountryCode }) {
    const [country, setCountry] = useState(defaultCountry);
    const [modalVisible, setModalVisible] = useState(false);

    const countryData = data;

    const showModal = () => setModalVisible(true);
    const hideModal = () => {
        setModalVisible(false);
        // Todo: Focus on phone input ref
    };

    async function selectCountry(country) {
        const countryData = await data;

        try {
            const curCountry = await countryData.filter(
                obj => obj.name === country
            )[0];

            setCountry(curCountry);
            setCountryCode(curCountry.dial_code);
            await hideModal();
        } catch (err) {
            console.log('Error pressing country:', err);
        }
    }

    function handleChangeText(text) {
        onChangeText(text);
    }

    return (
        <Layout style={{ padding: 10, flexDirection: 'row' }}>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onTouchStart={showModal}>
                <Text>{country.flag} {country.dial_code}</Text>
            </Layout>
            <Layout style={{ flex: 7 }}>
                <Input
                    placeholder='1234567890'
                    keyboardType='phone-pad'
                    onChangeText={text => handleChangeText(text)}/>

                <CountrySelectModal
                    visible={modalVisible}
                    selectCountry={selectCountry}
                    hideModal={hideModal}
                />
            </Layout>
        </Layout>
    )
}

export default PhoneInput;