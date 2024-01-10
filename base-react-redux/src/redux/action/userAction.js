export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';
export const FETCH_USER_LOGOUT_SUCCESS = 'FETCH_USER_LOGOUT_SUCCESS';

// export const DECREMENT = 'DECREMENT';

// export const increaseCounter = () => {
//     return {
//         type: INCREMENT,
//     };
// };

export const fetchUserSuccess = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUCCESS,
        payload: data
    };
};

export const doLogout = () => {
    return {
        type: FETCH_USER_LOGOUT_SUCCESS,
    };
};