import React, { useState, useEffect } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { userReducer } from './redux/reducers/reducer';
import config from './apis/firebase';
import firebase from 'firebase/app';
import 'firebase/database';
import AppContainer from './AppContainer';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

firebase.initializeApp(config);

const store = createStore(userReducer);

export default function App() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            await Font.loadAsync({
                Roboto: require('native-base/Fonts/Roboto.ttf'),
                Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
                ...Ionicons.font,
            });
        })();
        setLoading(false);
    }, [setLoading]);

    if (loading) return <AppLoading/>;

    return (
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    );
}