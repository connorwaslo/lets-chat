import {
    SET_NAME,
    SET_FRIEND_REQUESTS
} from './actionTypes';

export const setName = name => ({
    type: SET_NAME,
    name
});

export const setFriendRequests = requests => ({
    type: SET_FRIEND_REQUESTS,
    requests
});