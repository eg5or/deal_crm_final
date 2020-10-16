import {authAPI} from "../API/api";

const SET_USER_DATA = 'SET_USER_DATA';
const UPDATE_NEW_EMAIL_TEXT = 'UPDATE_NEW_EMAIL_TEXT';
const UPDATE_NEW_PASSWORD_TEXT = 'UPDATE_NEW_PASSWORD_TEXT';
const DELETE_USER_DATA = 'DELETE_USER_DATA';
const CLEAR_EMAIL_AND_PASSWORD = 'CLEAR_EMAIL_AND_PASSWORD';
const SET_RESPONSE_MESSAGE = 'SET_RESPONSE_MESSAGE';
const SET_TOKEN_DATA = 'SET_TOKEN_DATA';
const TOGGLE_IS_WAITING_LOGIN = 'TOGGLE_IS_WAITING_LOGIN';

export type InitialStateType = {
    isAuth: boolean
    newEmailText: string | null
    newPasswordText: string | null
    responseMessage: string | null
    token: string
    isWaitingLogin: boolean
}

let initialState: InitialStateType = {
    isAuth: false,
    newEmailText: '',
    newPasswordText: '',
    responseMessage: '',
    token: '',
    isWaitingLogin: false
}

const authReducer = (state = initialState, action: any): InitialStateType => {
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
                isAuth: false,

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
        case SET_TOKEN_DATA:
            return {
                ...state,
                token: action.token
            };
        case TOGGLE_IS_WAITING_LOGIN:
            return {
                ...state,
                isWaitingLogin: action.toggle
            };
        default:
            return state;
    }
};

// ActionCreators
type SetAuthUserData = {
    type: typeof SET_USER_DATA
    payload: object | null
    isAuth: boolean
}
export const setAuthUserData = (userData: object | null, isAuth: boolean): SetAuthUserData => ({
    type: SET_USER_DATA,
    payload: userData,
    isAuth
});

type NewEmailTextAC = {
    type: typeof UPDATE_NEW_EMAIL_TEXT
    text: string
}
export const newEmailTextAC = (text: string): NewEmailTextAC => ({type: UPDATE_NEW_EMAIL_TEXT, text});

type NewPasswordTextAC = {
    type: typeof UPDATE_NEW_PASSWORD_TEXT
    text: string
}
export const newPasswordTextAC = (text: string): NewPasswordTextAC => ({type: UPDATE_NEW_PASSWORD_TEXT, text});

type ExitAuth = {
    type: typeof DELETE_USER_DATA
}
export const exitAuth = (): ExitAuth => ({type: DELETE_USER_DATA});

type ClearEmailAndPassword = {
    type: typeof CLEAR_EMAIL_AND_PASSWORD
}
export const clearEmailAndPassword = (): ClearEmailAndPassword => ({type: CLEAR_EMAIL_AND_PASSWORD});

type SetResponseMessage = {
    type: typeof SET_RESPONSE_MESSAGE
    message: string
}
export const setResponseMessage = (message: string): SetResponseMessage => ({type: SET_RESPONSE_MESSAGE, message});

type SetTokenData = {
    type: typeof SET_TOKEN_DATA
    token: string
}
export const setTokenData = (token: string): SetTokenData => ({type: SET_TOKEN_DATA, token});

type ToggleIsWaitingLogin = {
    type: typeof TOGGLE_IS_WAITING_LOGIN
    toggle: boolean
}
export const toggleIsWaitingLogin = (toggle: boolean):ToggleIsWaitingLogin => ({type: TOGGLE_IS_WAITING_LOGIN, toggle});

// Thunks

export const getAuthUserData = () => async (dispatch: any) => {
    if (localStorage.getItem('token')) {
        const userDataLocalStorage: any = JSON.parse(<string>localStorage.getItem('token'))
        dispatch(setTokenData(userDataLocalStorage.token))
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

export const login = (email: string, password: string) => async (dispatch: any) => {
    const response = await authAPI.loginToCRM(email, password).catch((err: any)  => err.response.data)
    if (response.statusText === 'OK') {
        dispatch(toggleIsWaitingLogin(true))
        dispatch(setTokenData(response.data.token))
        localStorage.setItem('token', JSON.stringify({
            token: response.data.token,
            id: response.data.id
        }))
        const me = await authAPI.me(response.data.id, response.data.token)
        dispatch(setAuthUserData(me.data, true))
        dispatch(toggleIsWaitingLogin(false))
    } else {
        dispatch(setResponseMessage(response.message))
    }
}

export const logout = () => async (dispatch: any) => {
    dispatch(setAuthUserData(null, false))
    localStorage.removeItem('token')
}

export const register = (email: string, password: string) => async (dispatch: any) => {
    const data = await authAPI.registerToCRM(email, password).catch((err: any) => err.response.data)
    if (data.message) {
        dispatch(setResponseMessage(data.message))
    } else {
        dispatch(clearEmailAndPassword())
    }

}

export default authReducer;