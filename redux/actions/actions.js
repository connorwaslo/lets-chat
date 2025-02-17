import {
    SET_APP_LOADING,
    SET_NAME,
    SET_CONTACTS,
    SET_OUTGOING_REQUESTS,
    ADD_OUTGOING_REQUEST,
    SET_INCOMING_REQUESTS,
    ADD_FRIEND,
    DENY_FRIEND,
    SET_FRIENDS,
    SET_PHONE,
    SET_STATUS,
    UPDATE_FRIEND_STATUS, RESET_APP
} from './actionTypes';

export const resetApp = () => ({
    type: RESET_APP
});

export const setName = name => ({
    type: SET_NAME,
    name
});

export const setPhone = phone => ({
    type: SET_PHONE,
    phone
});

export const setStatus = status => ({
    type: SET_STATUS,
    status
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

export const setFriends = friends => ({
    type: SET_FRIENDS,
    friends
});

export const addOutgoingRequest = phone => ({
    type: ADD_OUTGOING_REQUEST,
    phone
});

export const addFriend = friend => ({
    type: ADD_FRIEND,
    friend
});

export const denyFriend = phone => ({
    type: DENY_FRIEND,
    phone
});

export const updateFriendStatus = updatedFriend => ({
    type: UPDATE_FRIEND_STATUS,
    updatedFriend
});