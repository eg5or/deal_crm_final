
import {dealsAPI} from "../API/api";

const SET_COUNT_NO_DONE_DEALS = 'SET_COUNT_NO_DONE_DEALS';
const SET_COUNT_NO_DELIVERED_DEALS = 'SET_COUNT_NO_DELIVERED_DEALS';

let initialState = {
    countNoDoneDeals: 0,
    countNoDeliveredDeals: 0,
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COUNT_NO_DONE_DEALS:
            return {
                ...state,
                countNoDoneDeals: action.count
            };
        case SET_COUNT_NO_DELIVERED_DEALS:
            return {
                ...state,
                countNoDeliveredDeals: action.count
            };
        default:
            return state;
    }
}

export const setCountNoDoneDeals = (count) => ({type: SET_COUNT_NO_DONE_DEALS, count})
export const setCountNoDeliveredDeals = (count) => ({type: SET_COUNT_NO_DELIVERED_DEALS, count})

export const loadingCountNoDoneDeals = () => async (dispatch, getState) => {
    let name = getState().authBlock.name
    let token = getState().authBlock.token
    try {
        const data = await dealsAPI.getCountManagersDealsNoDone(name, token)
        dispatch(setCountNoDoneDeals(data.count))
    } catch (e) {
        alert(e.response.data.message)
    }
}
export const loadingCountNoDeliveredDeals = () => async (dispatch, getState) => {
    let name = getState().authBlock.name
    let token = getState().authBlock.token
    try {
        const data = await dealsAPI.getCountManagersDealsNoDelivered(name, token)
        dispatch(setCountNoDeliveredDeals(data.count))
    } catch (e) {
        alert(e.response.data.message)
    }
}

export default profileReducer;