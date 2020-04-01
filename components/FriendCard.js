import React from 'react';
import { TouchableOpacity, Linking, View, Text, StyleSheet } from 'react-native';
import DrawerHeader from './DrawerHeader';

function FriendCard({ userInfo }) {
    const { name, status } = userInfo;
    const phone = userInfo.phone;  // Should replace +1 country code with 1

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Text style={styles.contact}>{name}</Text>
            </View>
            <View style={styles.right}>
                <TouchableOpacity onPress={() => Linking.openURL(`facetime:${phone}`)}>
                    <View style={status === 'ready' ? styles.readyButton : styles.busyButton}>
                        <Text>Call</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        padding: 15,
        backgroundColor: '#E0E0E0'
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
        justifyContent: 'flex-end'
    },
    contact: {
        paddingLeft: 10,
        fontSize: 22
    },
    readyButton: {
        marginRight: 10,
        padding: 15,
        backgroundColor: '#60d688',
        borderRadius: 10
    },
    busyButton: {
        marginRight: 10,
        padding: 15,
        backgroundColor: '#FF7B2E',
        borderRadius: 10
    }
})

export default FriendCard;