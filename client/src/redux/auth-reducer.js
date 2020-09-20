const SET_USER_DATA = 'SET_USER_DATA';
const UPDATE_NEW_EMAIL_TEXT = 'UPDATE_NEW_EMAIL_TEXT';
const UPDATE_NEW_PASSWORD_TEXT = 'UPDATE_NEW_PASSWORD_TEXT';
const DELETE_USER_DATA = 'DELETE_USER_DATA';
const CLEAR_EMAIL_AND_PASSWORD = 'CLEAR_EMAIL_AND_PASSWORD';

let initialState = {
    userId: null,
    email: null,
    isAuth: false,
    newEmailText: '',
    newPasswordText: '',
    token: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true,
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
        default:
            return state;
    }
};

export const setAuthUserData = (userId, email, token) => ({type: SET_USER_DATA, data: {userId, email, token}});
export const newEmailTextAC = (text) => ({type: UPDATE_NEW_EMAIL_TEXT, text});
export const newPasswordTextAC = (text) => ({type: UPDATE_NEW_PASSWORD_TEXT, text});
export const exitAuth = () => ({type: DELETE_USER_DATA});
export const clearEmailAndPassword = () => ({type: CLEAR_EMAIL_AND_PASSWORD});


export default authReducer;