import {
    SET_NAME,
    SET_FRIEND_REQUESTS,
    SET_CONTACTS, SET_APP_LOADING, ADD_FRIEND_REQUEST
} from './actionTypes';

export const setAppLoading = loading => ({
    type: SET_APP_LOADING,
    loading
});

export const setName = name => ({
    type: SET_NAME,
    name
});

export const setFriendRequests = requests => ({
    type: SET_FRIEND_REQUESTS,
    requests
});

export const setContacts = contacts => ({
    type: SET_CONTACTS,
    contacts
});

export const addFriendRequest = phone => ({
    type: ADD_FRIEND_REQUEST,
    phone
});