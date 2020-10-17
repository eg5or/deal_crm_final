import {employeesAPI} from "../API/api";
import {getAuthUserData} from './auth-reducer'

const SET_MANAGER_MODE = 'dealCRM/settings/SET_MANAGER_MODE';

export type InitialStateType = {
    managerMode: boolean
}

let initialState: InitialStateType = {
    managerMode: false
}

const settingsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_MANAGER_MODE:
            return {
                ...state,
                managerMode: action.managerMode
            };
        default:
            return state;
    }
};

// ActionCreators
type SetManagerMode = {
    type: typeof SET_MANAGER_MODE
    managerMode: boolean
}
export const setManagerMode = (managerMode: boolean): SetManagerMode => ({type: SET_MANAGER_MODE, managerMode});

// Thunks

export const changePosition = () => async (dispatch: any, getState: any) => {
    const employeeId = getState().authBlock._id
    try {
        await employeesAPI.changePosition(employeeId)
        dispatch(getAuthUserData())
    } catch (e) {
        return Promise
    }
};


export default settingsReducer;