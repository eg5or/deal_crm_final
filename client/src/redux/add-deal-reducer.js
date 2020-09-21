const OPEN_BLOCK = 'OPEN_BLOCK'
const SET_DATA_CLIENT_TABLE = 'SET_DATA_CLIENT_TABLE'
const SET_NEW_TEXT_CLIENT_INPUT = 'SET_NEW_TEXT_CLIENT_INPUT'
const SET_DATA_FOUND_CLIENTS = 'SET_DATA_FOUND_CLIENTS'
const OPEN_DROP_DOWN_CLIENTS = 'OPEN_DROP_DOWN_CLIENTS'
const CLOSE_DROP_DOWN_CLIENTS = 'CLOSE_DROP_DOWN_CLIENTS'

let initialState = {
    buttonToggle: false,
    dataClientTable: [],
    clientInputText: '',
    dataFoundClients: [],
    toggleDropDownClients: false
}

const addDealReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_BLOCK:
            return {
                ...state,
                buttonToggle: !state.buttonToggle
            }
        case SET_DATA_CLIENT_TABLE:
            return {
                ...state,
                dataClientTable: action.data
            }
        case SET_NEW_TEXT_CLIENT_INPUT:
            return {
                ...state,
                clientInputText: action.text
            }
        case SET_DATA_FOUND_CLIENTS:
            return {
                ...state,
                dataFoundClients: action.data
            }
        case OPEN_DROP_DOWN_CLIENTS:
            return {
                ...state,
                toggleDropDownClients: true
            }
        case CLOSE_DROP_DOWN_CLIENTS:
            return {
                ...state,
                toggleDropDownClients: false
            }
        default:
            return state;
    }
}

export const setButtonToggle = () => ({type: OPEN_BLOCK})
export const setDataClientTable = (data) => ({type: SET_DATA_CLIENT_TABLE, data})
export const newClientInputText = (text) => ({type: SET_NEW_TEXT_CLIENT_INPUT, text})
export const setDataFoundClients = (data) => ({type: SET_DATA_FOUND_CLIENTS, data})
export const openDropDownClients = () => ({type: OPEN_DROP_DOWN_CLIENTS})
export const closeDropDownClients = () => ({type: CLOSE_DROP_DOWN_CLIENTS})


export default addDealReducer;