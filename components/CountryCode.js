import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';

function CountryCode({ item, selectCountry }) {
    return (
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
    )
}

export default CountryCode;