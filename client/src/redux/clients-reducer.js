import {clientsAPI, employeesAPI} from "../API/api";

// constants
const SET_CLIENTS_DATA_TABLE = 'SET_CLIENTS_DATA_TABLE';
const SET_MANAGERS = 'SET_MANAGERS';
const SET_NEW_CLIENT_DATA = 'SET_NEW_CLIENT_DATA';

// state
let initialState = {
    tableClientsData: [],
    managers: [],
}

// cases
const clientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CLIENTS_DATA_TABLE:
            return {
                ...state,
                tableClientsData: action.data
            }
        case SET_MANAGERS:
            return {
                ...state,
                managers: action.data
            }
        default:
            return state;
    }
};

// ActionCreators
export const setClientsDataTable = (data) => ({type: SET_CLIENTS_DATA_TABLE, data});
export const setManagers = (data) => ({type: SET_MANAGERS, data});

// Thunks
export const loadingClientsTableData = () => async (dispatch) => {
    try {
        const tableData = await clientsAPI.getAllClients()
        dispatch(setClientsDataTable(tableData))
    } catch (e) { alert(e.response.data.message)}
    try {
        const managersNames = await employeesAPI.getAllManagers()
        dispatch(setManagers(managersNames))
    } catch (e) { alert(e.response.data.message) }
}

export const addClient = (type, name, manager) => async (dispatch) => {
    try {
        await clientsAPI.addNewClient(type, name, manager)
    } catch (e) { alert(e.response.data.message) }
    dispatch(loadingClientsTableData())
}

export const updateClient = (id, type, name, manager) => async (dispatch) => {
    try {
        await clientsAPI.updateClient(id, type, name, manager)
    } catch (e) { alert(e.response.data.message) }
    dispatch(loadingClientsTableData())
}

export const deleteClient = (id) => async (dispatch) => {
    try {
        await clientsAPI.deleteClient(id)
    } catch (e) { alert(e.response.data.message) }
    dispatch(loadingClientsTableData())
}

export default clientsReducer;