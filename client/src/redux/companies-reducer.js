const SET_DATA_TABLE = 'SET_DATA_TABLE';
const SET_NEW_COMPANY_DATA = 'SET_NEW_COMPANY_DATA';


let initialState = {
    tableData: {},
    newCompanyType: '',
    newCompanyName: '',
    newCompanyManager: ''
}

const companiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA_TABLE:
            return {
                ...state,
                tableData: action.data
            }
        case SET_NEW_COMPANY_DATA:
            return {
                ...state,
                newCompanyType: action.newCompanyType,
                newCompanyName: action.newCompanyName,
                newCompanyManager: action.newCompanyManager
            }

        default:
            return state;
    }
};

export const setDataTable = (data) => ({type: SET_DATA_TABLE, data});
export const setNewCompanyData = (newCompanyType, newCompanyName, newCompanyManager) => ({type: SET_NEW_COMPANY_DATA, newCompanyType, newCompanyName, newCompanyManager});


export default companiesReducer;