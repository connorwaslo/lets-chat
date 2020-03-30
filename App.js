import React from 'react';
import { StyleSheet } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { userReducer } from './redux/reducers/reducer';
import config from './apis/firebase';
import firebase from 'firebase/app';
import 'firebase/database';
import AppContainer from './AppContainer';

firebase.initializeApp(config);

const store = createStore(userReducer);

export default function App() {
    return (
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    );
}