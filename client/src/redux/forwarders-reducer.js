const SET_DATA_FORWARDERS_TABLE = 'SET_DATA_FORWARDERS_TABLE';
const SET_NEW_FORWARDERS_DATA = 'SET_NEW_FORWARDERS_DATA';


let initialState = {
    forwardersTableData: {},
    newForwarderName: '',
    newForwarderTel: ''
}

const forwardersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA_FORWARDERS_TABLE:
            return {
                ...state,
                forwardersTableData: action.data
            }
        case SET_NEW_FORWARDERS_DATA:
            return {
                ...state,
                newForwarderName: action.newForwarderName,
                newForwarderTel: action.newForwarderTel
            }

        default:
            return state;
    }
};

export const setDataForwardersTable = (data) => ({type: SET_DATA_FORWARDERS_TABLE, data});
export const setNewForwarderData = (newForwarderName, newForwarderTel) => ({type: SET_NEW_FORWARDERS_DATA, newForwarderName, newForwarderTel});


export default forwardersReducer;