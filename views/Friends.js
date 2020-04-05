import React from 'react';
import { FlatList } from 'react-native';
import FriendCard from '../components/FriendCard';
import { useSelector } from 'react-redux';
import DrawerHeader from '../components/DrawerHeader';
import 'firebase/database';

function Friends({ navigation }) {
    const { friends } = useSelector(state => ({
        friends: state.friends
    }));

    return (
        <DrawerHeader navigation={navigation} title='Friends'>
            <FlatList
                data={friends}
                renderItem={({ item }) => <FriendCard userInfo={item}/>}
                keyExtractor={(item, index) => index.toString()}
            />
        </DrawerHeader>
    )
}

export default Friends;