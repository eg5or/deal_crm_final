import {dealsAPI} from "../API/api";

// constants
const SET_COUNT_NO_DONE_DEALS = 'dealCRM/profile/SET_COUNT_NO_DONE_DEALS';
const SET_COUNT_NO_DELIVERED_DEALS = 'dealCRM/profile/SET_COUNT_NO_DELIVERED_DEALS';

// state
let initialState = {
    countNoDoneDeals: 0,
    countNoDeliveredDeals: 0,
}

// cases
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

// ActionCreators
export const setCountNoDoneDeals = (count) => ({type: SET_COUNT_NO_DONE_DEALS, count})
export const setCountNoDeliveredDeals = (count) => ({type: SET_COUNT_NO_DELIVERED_DEALS, count})

// Thunks
// загрузка количества сделок со статусом "не готово"
export const loadingCountNoDoneDeals = () => async (dispatch, getState) => {
    let id = getState().authBlock._id
    let token = getState().authBlock.token
    try {
        const data = await dealsAPI.getCountManagersDealsNoDone(id, token)
        dispatch(setCountNoDoneDeals(data.count))
    } catch (e) {
        alert(e.response.data.message)
    }
}

// загрузка количества сделок со статусом "не доставлено"
export const loadingCountNoDeliveredDeals = () => async (dispatch, getState) => {
    let id = getState().authBlock._id
    let token = getState().authBlock.token
    try {
        const data = await dealsAPI.getCountManagersDealsNoDelivered(id, token)
        dispatch(setCountNoDeliveredDeals(data.count))
    } catch (e) {
        alert(e.response.data.message)
    }
}

export default profileReducer;