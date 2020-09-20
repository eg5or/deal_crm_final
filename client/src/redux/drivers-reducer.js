const SET_DATA_DRIVERS_TABLE = 'SET_DATA_DRIVERS_TABLE';
const SET_NEW_DRIVER_DATA = 'SET_NEW_DRIVER_DATA';


let initialState = {
    driversTableData: {},
    newDriverName: '',
    newDriverTel: '',
    newDriverAuto: ''
}

const driversReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA_DRIVERS_TABLE:
            return {
                ...state,
                driversTableData: action.data
            }
        case SET_NEW_DRIVER_DATA:
            return {
                ...state,
                newDriverName: action.newDriverName,
                newDriverTel: action.newDriverTel,
                newDriverAuto: action.newDriverAuto
            }

        default:
            return state;
    }
};

export const setDataDriversTable = (data) => ({type: SET_DATA_DRIVERS_TABLE, data});
export const setNewDriverData = (newDriverName, newDriverTel, newDriverAuto) => ({type: SET_NEW_DRIVER_DATA, newDriverName, newDriverTel, newDriverAuto});


export default driversReducer;