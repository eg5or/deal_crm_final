import {companiesAPI} from "../API/api";

// constants
const SET_COMPANIES_DATA_TABLE = 'dealCRM/vars/companies/SET_DRIVERS_DATA_TABLE';

// state
let initialState = {
    companiesTableData: {},
}

// cases
const companiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMPANIES_DATA_TABLE:
            return {
                ...state,
                companiesTableData: action.data
            }
        default:
            return state;
    }
};

// ActionCreators
export const setCompaniesDataTable = (data) => ({type: SET_COMPANIES_DATA_TABLE, data});

// Thunks
export const loadingCompaniesTableData = () => async (dispatch) => {
    try {
        const tableData = await companiesAPI.getAllCompanies()
        dispatch(setCompaniesDataTable(tableData))
    } catch (e) { alert(e.response.data.message)}
}

export const addCompany = (name, bill, tax) => async (dispatch) => {
    try {
        await companiesAPI.addNewCompany(name, bill, tax)
    } catch (e) { alert(e.response.data.message)}
    dispatch(loadingCompaniesTableData())
}

export const updateCompany = (id, name, bill, tax) => async (dispatch) => {
    try {
        await companiesAPI.updateCompany(id, name, bill, tax)
    } catch (e) { alert(e.response.data.message)}
    dispatch(loadingCompaniesTableData())
}

export const deleteCompany = (id) => async (dispatch) => {
    try {
        await companiesAPI.deleteCompany(id)
    } catch (e) { alert(e.response.data.message)}
    dispatch(loadingCompaniesTableData())
}


export default companiesReducer;