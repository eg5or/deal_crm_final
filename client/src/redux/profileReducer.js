import {uploadAPI} from "../API/api";


const INITIALIZED_SUCCESS = 'social-net/app/INITIALIZED_SUCCESS';


let initialState = {
    initialized: false,
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS})

export const savePhoto = (file) => async (dispatch) => {
    let response = await uploadAPI.savePhoto(file)
    console.log(response.data)
}

export default profileReducer;