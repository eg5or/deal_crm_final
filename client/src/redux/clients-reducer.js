const SET_CLIENTS_DATA_TABLE = 'SET_CLIENTS_DATA_TABLE';
const SET_MANAGERS = 'SET_MANAGERS';
const SET_NEW_CLIENT_DATA = 'SET_NEW_CLIENT_DATA';


let initialState = {
    tableClientsData: [],
    managers: [],
    newClientType: '',
    newClientName: '',
    newClientManager: ''
}

const clientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CLIENTS_DATA_TABLE:
            return {
                ...state,
                tableClientsData: action.data
            }
        case SET_MANAGERS:
            return {
                ...state,
                managers: action.data
            }
        case SET_NEW_CLIENT_DATA:
            return {
                ...state,
                newClientType: action.newClientType,
                newClientName: action.newClientName,
                newClientManager: action.newClientManager
            }

        default:
            return state;
    }
};

export const setClientsDataTable = (data) => ({type: SET_CLIENTS_DATA_TABLE, data});
export const setManagers = (data) => ({type: SET_MANAGERS, data});
export const setNewClientData = (newClientType, newClientName, newClientManager) => ({
    type: SET_NEW_CLIENT_DATA,
    newClientType,
    newClientName,
    newClientManager
});


export default clientsReducer;