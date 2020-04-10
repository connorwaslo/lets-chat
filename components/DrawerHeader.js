import React from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Text, Icon } from '@ui-kitten/components';

function DrawerHeader({ navigation, title, children }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ position: 'absolute', left: 10, right: 10, top: 55}}>
                <Text category='h4' style={{ textAlign: 'center', color: 'black' }}>
                    {title}
                </Text>
            </View>
            <View style={{ position: 'absolute', left: 15, top: 45 }}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon name='menu-outline' style={{ width: 48, height: 48 }} fill='black'/>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginTop: 50 }}>
                {children}
            </View>
        </SafeAreaView>
    )
}

export default DrawerHeader;