import React from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function DrawerHeader({ navigation, children }) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ position: 'absolute', left: 15, top: 45 }}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons name='ios-menu' size={48} color='black'/>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginTop: 50 }}>
                {children}
            </View>
        </SafeAreaView>
    )
}

export default DrawerHeader;