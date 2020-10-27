import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'dealCRM/app/INITIALIZED_SUCCESS';
const TOGGLE_CHAT_OPEN = 'dealCRM/app/TOGGLE_CHAT_OPEN';

export type InitialStateType = {
    initialized: boolean
    isChatOpen: boolean
}

let initialState: InitialStateType = {
    initialized: false,
    isChatOpen: false
}

const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        case TOGGLE_CHAT_OPEN:
            return {
                ...state,
                isChatOpen: action.toggle
            };
        default:
            return state;
    }
}
type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})
type ToggleChatOpenActionType = {
    type: typeof TOGGLE_CHAT_OPEN
    toggle: boolean
}
export const toggleChatOpen = (toggle: boolean): ToggleChatOpenActionType => ({type: TOGGLE_CHAT_OPEN, toggle})

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}

export default appReducer;