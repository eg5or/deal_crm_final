import {dealsAPI, uploadAPI} from "../API/api";

// constants
const SET_DEALS_DATA = 'SET_DEALS_DATA';

// state
let initialState = {
    dealsData: []
}

// cases
const dealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DEALS_DATA:
            return {
                ...state,
                dealsData: action.data
            }
        default:
            return state;
    }
};

// ActionCreators
export const setDealsData = (data) => ({type: SET_DEALS_DATA, data});

// Thunks
export const loadingDealsTableData = () => async (dispatch) => {
    try {
        const tableData = await dealsAPI.getAllDeals()
        dispatch(setDealsData(tableData))
    } catch (e) {/* alert(e.response.data.message)*/}
}

export const addDeal = (date, client, name) => async (dispatch) => {
    try {
        await dealsAPI.addNewDeal(date, client, name)
    } catch (e) { alert(e.response.data.message)}
    dispatch(loadingDealsTableData())
}

export const saveFile = (file, id, company, sum, type) => async (dispatch) => {
    let response = await uploadAPI.saveFile(file, id, company, sum, type)
    console.log(response.data)
    dispatch(loadingDealsTableData())
}

export const deleteFile = (id, file, type) => async (dispatch) => {
    let response = await uploadAPI.deleteFile(id, file, type)
    console.log(response.data)
    dispatch(loadingDealsTableData())
}

export const addDriver = (id, name, sum) => async (dispatch) => {
    let response = await dealsAPI.addDriverToDeal(id, name, sum)
    console.log(response.data)
    dispatch(loadingDealsTableData())
}

export const addForwarder = (id, name, sum) => async (dispatch) => {
    let response = await dealsAPI.addForwarderToDeal(id, name, sum)
    console.log(response.data)
    dispatch(loadingDealsTableData())
}

export default dealsReducer;