import {clientsAPI, driversAPI} from "../API/api";

// constants
const SET_DRIVERS_DATA_TABLE = 'SET_DRIVERS_DATA_TABLE';

// state
let initialState = {
    driversTableData: {},
}

// cases
const driversReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DRIVERS_DATA_TABLE:
            return {
                ...state,
                driversTableData: action.data
            }
        default:
            return state;
    }
};

// ActionCreators
export const setDriversDataTable = (data) => ({type: SET_DRIVERS_DATA_TABLE, data});

// Thunks
export const loadingDriversTableData = () => async (dispatch) => {
    try {
        const tableData = await driversAPI.getAllDrivers()
        dispatch(setDriversDataTable(tableData))
    } catch (e) { alert(e.response.data.message)}
}

export const addDriver = (name, tel, auto) => async (dispatch) => {
    try {
        await driversAPI.addNewDriver(name, tel, auto)
    } catch (e) { alert(e.response.data.message)}
    dispatch(loadingDriversTableData())
}

export const updateDriver = (id, name, tel, auto) => async (dispatch) => {
    try {
        await driversAPI.updateDriver(id, name, tel, auto)
    } catch (e) { alert(e.response.data.message)}
    dispatch(loadingDriversTableData())
}

export const deleteDriver = (id) => async (dispatch) => {
    try {
        await driversAPI.deleteDriver(id)
    } catch (e) { alert(e.response.data.message)}
    dispatch(loadingDriversTableData())
}


export default driversReducer;