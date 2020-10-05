import {authAPI} from "../API/api";

const SET_USER_DATA = 'SET_USER_DATA';
const UPDATE_NEW_EMAIL_TEXT = 'UPDATE_NEW_EMAIL_TEXT';
const UPDATE_NEW_PASSWORD_TEXT = 'UPDATE_NEW_PASSWORD_TEXT';
const DELETE_USER_DATA = 'DELETE_USER_DATA';
const CLEAR_EMAIL_AND_PASSWORD = 'CLEAR_EMAIL_AND_PASSWORD';
const SET_RESPONSE_MESSAGE = 'SET_RESPONSE_MESSAGE';

let initialState = {
    userId: null,
    email: null,
    name: null,
    isAuth: false,
    newEmailText: '',
    newPasswordText: '',
    token: window.localStorage.token || null,
    responseMessage: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                isAuth: action.isAuth,
                newEmailText: '',
                newPasswordText: ''
            };
        case UPDATE_NEW_EMAIL_TEXT:
            return {
                ...state,
                newEmailText: action.text
            };
        case UPDATE_NEW_PASSWORD_TEXT:
            return {
                ...state,
                newPasswordText: action.text
            };
        case DELETE_USER_DATA:
            return {
                ...state,
                userId: null,
                email: null,
                isAuth: false,
                token: null,

            };
        case CLEAR_EMAIL_AND_PASSWORD:
            return {
                ...state,
                newEmailText: '',
                newPasswordText: ''
            };
        case SET_RESPONSE_MESSAGE:
            return {
                ...state,
                responseMessage: action.message
            };
        default:
            return state;
    }
};

// ActionCreators

export const setAuthUserData = (userData, isAuth) => ({
    type: SET_USER_DATA,
    payload: userData,
    isAuth
});
export const newEmailTextAC = (text) => ({type: UPDATE_NEW_EMAIL_TEXT, text});
export const newPasswordTextAC = (text) => ({type: UPDATE_NEW_PASSWORD_TEXT, text});
export const exitAuth = () => ({type: DELETE_USER_DATA});
export const clearEmailAndPassword = () => ({type: CLEAR_EMAIL_AND_PASSWORD});
export const setResponseMessage = (message) => ({type: SET_RESPONSE_MESSAGE, message});

// Thunks

export const getAuthUserData = () => async (dispatch) => {
    if (localStorage.getItem('token')) {
        const userDataLocalStorage = JSON.parse(localStorage.getItem('token'))
        try {
            const me = await authAPI.me(userDataLocalStorage.id, userDataLocalStorage.token)
            if (me.statusText === 'OK') {
                dispatch(setAuthUserData(me.data, true))
            }
        } catch (e) {
            return Promise
        }
    }
};

export const login = (email, password) => async (dispatch) => {
    const response = await authAPI.loginToCRM(email, password).catch(err => err.response.data)
    if (response.statusText === 'OK') {
        localStorage.setItem('token', JSON.stringify({
            token: response.data.token,
            id: response.data.id
        }))
        const me = await authAPI.me(response.data.id, response.data.token)
        dispatch(setAuthUserData(me.data, true))
    } else {
        dispatch(setResponseMessage(response.message))
    }
}

export const logout = (id) => async (dispatch) => {
    // const response = await authAPI.logoutFromCRM(id)
    dispatch(setAuthUserData(null, false))
    localStorage.removeItem('token')
}

export const register = (email, password) => async (dispatch) => {
    const data = await authAPI.registerToCRM(email, password).catch(err => err.response.data)
    if (data.message) {
        dispatch(setResponseMessage(data.message))
    } else {
        dispatch(clearEmailAndPassword())
    }

}

export default authReducer;