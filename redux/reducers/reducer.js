import {
    SET_NAME,
    SET_FRIEND_REQUESTS,
    SET_CONTACTS, SET_APP_LOADING, ADD_OUTGOING_REQUEST
} from '../actions/actionTypes';

const initUserState = {
    loading: true,
    name: '',
    outgoingRequests: [],
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
        case SET_FRIEND_REQUESTS:
            return {
                ...state,
                outgoingRequests: action.requests
            };
        case SET_CONTACTS:
            return {
                ...state,
                contacts: action.contacts
            };
        case ADD_OUTGOING_REQUEST:
            let newReqs = state.outgoingRequests;
            newReqs.push(action.phone);

            return {
                ...state,
                outgoingRequests: newReqs
            };
        default:
            return state;
    }
}