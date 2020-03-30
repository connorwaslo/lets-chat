import {
    SET_NAME,
    SET_FRIEND_REQUESTS,
    SET_CONTACTS, SET_APP_LOADING
} from '../actions/actionTypes';

const initUserState = {
    loading: true,
    name: '',
    friendRequests: [],
    contacts: []
};

export function userReducer(state = initUserState, action) {
    switch (action.type) {
        case SET_APP_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        case SET_NAME:
            return {
                ...state,
                name: action.name
            };
        case SET_FRIEND_REQUESTS:
            return {
                ...state,
                friendRequests: action.requests
            };
        case SET_CONTACTS:
            return {
                ...state,
                contacts: action.contacts
            };
        default:
            return state;
    }
}