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
    } catch (e) { alert(e.response.data.message)}
}

export const addDeal = (date, client, name) => async (dispatch) => {
    try {
        await dealsAPI.addNewDeal(date, client, name)
    } catch (e) { alert(e.response.data.message)}
    dispatch(loadingDealsTableData())
}

export const saveFile = (file, id, company, sum) => async (dispatch) => {
    let response = await uploadAPI.saveFile(file, id, company, sum)
    console.log(response.data)
}

export default dealsReducer;