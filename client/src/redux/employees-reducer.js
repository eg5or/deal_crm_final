import {employeesAPI} from "../API/api";

const SET_DATA_EMPLOYEES_TABLE = 'SET_DATA_EMPLOYEES_TABLE';


let initialState = {
    employeesTableData: [],
}

const employeesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA_EMPLOYEES_TABLE:
            return {
                ...state,
                employeesTableData: action.data
            }
        default:
            return state;
    }
};

// ActionCreators

export const setDataEmployeesTable = (data) => ({type: SET_DATA_EMPLOYEES_TABLE, data});

// Thunks

export const getEmployees = () => async (dispatch) => {
    try {
        const data = await employeesAPI.getAllEmployees()
        dispatch(setDataEmployeesTable(data))
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const updateEmployee = (id, position, name, head, location, tel, intel, birthday) => async (dispatch) => {
    try {
        await employeesAPI.updateEmployee(id, position, name, head, location, tel, intel, birthday)
        const data = await employeesAPI.getAllEmployees()
        await dispatch(setDataEmployeesTable(data))
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const deleteEmployee = (id) => async (dispatch) => {
    try {
        await employeesAPI.deleteEmployee(id)
    } catch (e) {
        alert(e.response.data.message)
    }
    try {
        const data = await employeesAPI.getAllEmployees()
        dispatch(setDataEmployeesTable(data))
    } catch (e) {
        alert(e.response.data.message)
    }
}

export default employeesReducer;