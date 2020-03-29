import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';

function ContactCard({ userInfo }) {
    const { name } = userInfo;
    const phone = userInfo.phoneNumbers[0]; // Todo: Parse this

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Text style={styles.contact}>{name}{'\n'}{phone}</Text>
            </View>
            <View style={styles.right}>
                <TouchableOpacity onPress={() => {}}>
                    <View style={styles.addButton}>
                        <Text>+</Text>
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
        backgroundColor: '#C9C9C9'
    },
    left: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    contact: {
        paddingLeft: 10
    },
    addButton: {
        marginRight: 10,
        padding: 15,
        backgroundColor: '#60d688',
        borderRadius: 10
    }
})

export default ContactCard;