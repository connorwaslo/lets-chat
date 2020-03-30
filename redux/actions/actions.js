import {
    SET_NAME,
    SET_OUTGOING_REQUESTS,
    SET_CONTACTS, SET_APP_LOADING, ADD_OUTGOING_REQUEST
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

export const setContacts = contacts => ({
    type: SET_CONTACTS,
    contacts
});

export const addoutgoingRequest = phone => ({
    type: ADD_OUTGOING_REQUEST,
    phone
});