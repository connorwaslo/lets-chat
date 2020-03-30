import {
    SET_APP_LOADING,
    SET_NAME,
    SET_CONTACTS,
    SET_OUTGOING_REQUESTS,
    ADD_OUTGOING_REQUEST, SET_INCOMING_REQUESTS
} from './actionTypes';

export const setAppLoading = loading => ({
    type: SET_APP_LOADING,
    loading
});

export const setName = name => ({
    type: SET_NAME,
    name
});

export const setOutgoingRequests = requests => ({
    type: SET_OUTGOING_REQUESTS,
    requests
});

export const setIncomingRequests = requests => ({
    type: SET_INCOMING_REQUESTS,
    requests
});

export const setContacts = contacts => ({
    type: SET_CONTACTS,
    contacts
});

export const addOutgoingRequest = phone => ({
    type: ADD_OUTGOING_REQUEST,
    phone
});