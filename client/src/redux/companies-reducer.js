const SET_COMPANIES_DATA_TABLE = 'SET_COMPANIES_DATA_TABLE';
const SET_MANAGERS = 'SET_MANAGERS';
const SET_NEW_COMPANY_DATA = 'SET_NEW_COMPANY_DATA';


let initialState = {
    tableCompaniesData: [],
    managers: [],
    newCompanyType: '',
    newCompanyName: '',
    newCompanyManager: ''
}

const companiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMPANIES_DATA_TABLE:
            return {
                ...state,
                tableCompaniesData: action.data
            }
        case SET_MANAGERS:
            return {
                ...state,
                managers: action.data
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

export const setCompaniesDataTable = (data) => ({type: SET_COMPANIES_DATA_TABLE, data});
export const setManagers = (data) => ({type: SET_MANAGERS, data});
export const setNewCompanyData = (newCompanyType, newCompanyName, newCompanyManager) => ({
    type: SET_NEW_COMPANY_DATA,
    newCompanyType,
    newCompanyName,
    newCompanyManager
});


export default companiesReducer;