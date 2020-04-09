import React, { useState, useEffect } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { userReducer } from './redux/reducers/reducer';
import config from './apis/firebase';
import firebase from 'firebase/app';
import 'firebase/database';
import AppContainer from './AppContainer';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

firebase.initializeApp(config);

const store = createStore(userReducer);

export default function App() {
    return (
        <Provider store={store}>
            <ApplicationProvider {...eva} theme={eva.light}>
                <AppContainer/>
            </ApplicationProvider>
        </Provider>
    );
}