const SET_DATA_MANAGERS_TABLE = 'SET_DATA_MANAGERS_TABLE';
const SET_NEW_MANAGER_DATA = 'SET_NEW_MANAGER_DATA';


let initialState = {
    managersTableData: {},
    newManagerName: '',
    newManagerHead: '',
    newManagerTel: ''
}

const managersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA_MANAGERS_TABLE:
            return {
                ...state,
                managersTableData: action.data
            }
        case SET_NEW_MANAGER_DATA:
            return {
                ...state,
                newManagerName: action.newManagerName,
                newManagerHead: action.newManagerHead,
                newManagerTel: action.newManagerTel
            }

        default:
            return state;
    }
};

export const setDataManagersTable = (data) => ({type: SET_DATA_MANAGERS_TABLE, data});
export const setNewManagerData = (newManagerName, newManagerHead, newManagerTel) => ({type: SET_NEW_MANAGER_DATA, newManagerName, newManagerHead, newManagerTel});


export default managersReducer;