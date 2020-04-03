import {
    SET_NAME,
    SET_FRIEND_REQUESTS,
    SET_CONTACTS,
    SET_APP_LOADING,
    ADD_OUTGOING_REQUEST,
    SET_OUTGOING_REQUESTS,
    SET_INCOMING_REQUESTS,
    ADD_FRIEND,
    DENY_FRIEND, SET_FRIENDS
} from '../actions/actionTypes';

const initUserState = {
    loading: true,
    name: '',
    phone: '', // Todo: Add action
    status: '', // Todo: Add action
    friends: [],
    outgoingRequests: [],
    incomingRequests: [],
    contacts: []
};

export function userReducer(state = initUserState, action) {
    switch (action.type) {
        case SET_APP_LOADING:
            return {
                ...state,
                loading: action.loading
            };
        case SET_NAME:
            return {
                ...state,
                name: action.name
            };
        case SET_OUTGOING_REQUESTS:
            return {
                ...state,
                outgoingRequests: action.requests
            };
        case SET_INCOMING_REQUESTS:
            return {
                ...state,
                incomingRequests: action.requests
            };
        case SET_CONTACTS:
            return {
                ...state,
                contacts: action.contacts
            };
        case SET_FRIENDS:
            return {
                ...state,
                friends: action.friends
            };
        case ADD_OUTGOING_REQUEST:
            let newReqs = state.outgoingRequests;
            newReqs.push(action.phone);

            return {
                ...state,
                outgoingRequests: newReqs
            };
        case ADD_FRIEND:
            // Todo: include full contact
            let newFriends = state.friends;
            console.log('Init friends:', newFriends);
            newFriends.push(action.friend);
            console.log('newFriends:', newFriends);

            let newIncReqs = state.incomingRequests;
            // Todo: Change this filter depending on what action.friend is
            // Right now this compares phone numbers, but may have to use uid later
            newIncReqs = newIncReqs.filter(req => req !== action.friend);
            if (newIncReqs === null) {
                newIncReqs = [];
            }

            return {
                ...state,
                incomingRequests: newIncReqs,
                friends: newFriends
            };
        case DENY_FRIEND:
            let incReqs = state.incomingRequests;
            // Todo: Change this filter depending on what action.friend is
            // Right now this compares phone numbers, but may have to use uid later
            incReqs = incReqs.filter(req => req !== action.friend);

            return {
                ...state,
                incomingRequests: incReqs
            };
        default:
            return state;
    }
}