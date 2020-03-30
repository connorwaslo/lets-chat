import {
    SET_NAME,
    SET_FRIEND_REQUESTS
} from '../actions/actionTypes';

const initUserState = {
    name: '',
    friendRequests: []
};

export function userReducer(state = initUserState, action) {
    switch (action.type) {
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
        default:
            return state;
    }
}