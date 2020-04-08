import {
    SET_NAME,
    SET_FRIEND_REQUESTS,
    SET_CONTACTS,
    SET_APP_LOADING,
    ADD_OUTGOING_REQUEST,
    SET_OUTGOING_REQUESTS,
    SET_INCOMING_REQUESTS,
    ADD_FRIEND,
    DENY_FRIEND, SET_FRIENDS, SET_PHONE, SET_STATUS, UPDATE_FRIEND_STATUS, RESET_APP
} from '../actions/actionTypes';

const initUserState = {
    name: '',
    phone: '',
    status: '',
    friends: [],
    outgoingRequests: [],
    incomingRequests: [],
    contacts: []
};

export function userReducer(state = initUserState, action) {
    switch (action.type) {
        case RESET_APP:
            return initUserState;
        case SET_NAME:
            return {
                ...state,
                name: action.name
            };
        case SET_PHONE:
            return {
                ...state,
                phone: action.phone
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
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
            // action.friend type = Object
            // Note: I see how TypeScript is useful now...
            let newFriends = state.friends;
            newFriends.push(action.friend);

            let newIncReqs = state.incomingRequests;

            // Right now this compares phone numbers, but may have to use uid later
            newIncReqs = newIncReqs.filter(req => req !== action.friend.phone);
            if (newIncReqs === null) {
                newIncReqs = [];
            }

            return {
                ...state,
                incomingRequests: newIncReqs,
                friends: newFriends
            };
        case DENY_FRIEND:
            // action.phone type = Phone number string
            let incReqs = state.incomingRequests;
            incReqs = incReqs.filter(req => req !== action.phone);

            return {
                ...state,
                incomingRequests: incReqs
            };
        case UPDATE_FRIEND_STATUS:
            let curFriends = state.friends;
            let newStatusFriends = [];
            curFriends.forEach(friend => {
                // If this is the friend to update
                if (friend.phone === action.updatedFriend.phone) {
                    newStatusFriends.push(action.updatedFriend);
                } else {
                    newStatusFriends.push(friend);
                }
            });

            return {
                ...state,
                friends: newStatusFriends
            };
        default:
            return state;
    }
}