


const SET_CURRENT_EMPLOYEE_DATA = 'social-net/app/SET_CURRENT_EMPLOYEE_DATA';


let initialState = {
    currentEmployeeData: {},
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_EMPLOYEE_DATA:
            return {
                ...state,
                currentEmployeeData: action.data
            };
        default:
            return state;
    }
}

export const setCurrentEmployeeData = (data) => ({type: SET_CURRENT_EMPLOYEE_DATA, data})

export const savePhoto = (file) => async (dispatch) => {

}

export default profileReducer;