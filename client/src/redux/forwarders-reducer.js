import {forwardersAPI} from "../API/api";

// constants
const SET_FORWARDERS_DATA_TABLE = 'SET_FORWARDERS_DATA_TABLE';

// state
let initialState = {
    forwardersTableData: {},
}

// cases
const forwardersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FORWARDERS_DATA_TABLE:
            return {
                ...state,
                forwardersTableData: action.data
            }
        default:
            return state;
    }
};

// ActionCreators
export const setForwardersDataTable = (data) => ({type: SET_FORWARDERS_DATA_TABLE, data});

// Thunks
export const loadingForwarderTableData = () => async (dispatch) => {
    try {
        const tableData = await forwardersAPI.getAllForwarders()
        dispatch(setForwardersDataTable(tableData))
    } catch (e) { alert(e.response.data.message)}
}

export const addForwarder = (name, tel) => async (dispatch) => {
    try {
        await forwardersAPI.addNewForwarder(name, tel)
    } catch (e) { alert(e.response.data.message)}
    dispatch(loadingForwarderTableData())
}

export const updateForwarder = (id, name, tel) => async (dispatch) => {
    try {
        await forwardersAPI.updateForwarder(id, name, tel)
    } catch (e) { alert(e.response.data.message)}
    dispatch(loadingForwarderTableData())
}

export const deleteForwarder = (id) => async (dispatch) => {
    try {
        await forwardersAPI.deleteForwarder(id)
    } catch (e) { alert(e.response.data.message)}
    dispatch(loadingForwarderTableData())
}

export default forwardersReducer;