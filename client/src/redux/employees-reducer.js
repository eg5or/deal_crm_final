const SET_DATA_EMPLOYEES_TABLE = 'SET_DATA_EMPLOYEES_TABLE';
const SET_NEW_EMPLOYEE_DATA = 'SET_NEW_EMPLOYEE_DATA';


let initialState = {
    employeesTableData: [],
    newEmployeePosition: '',
    newEmployeeName: '',
    newEmployeeHead: '',
    newEmployeeLocation: '',
    newEmployeeTel: '',
    newEmployeeIntel: '',
    newEmployeeBirthday: ''
}

const employeesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA_EMPLOYEES_TABLE:
            return {
                ...state,
                employeesTableData: action.data
            }
        case SET_NEW_EMPLOYEE_DATA:
            return {
                ...state,
                newEmployeePosition: action.newEmployeePosition,
                newEmployeeName: action.newEmployeeName,
                newEmployeeHead: action.newEmployeeHead,
                newEmployeeLocation: action.newEmployeeLocation,
                newEmployeeTel: action.newEmployeeTel,
                newEmployeeIntel: action.newEmployeeIntel,
                newEmployeeBirthday: action.newEmployeeBirthday
            }

        default:
            return state;
    }
};

export const setDataEmployeesTable = (data) => ({type: SET_DATA_EMPLOYEES_TABLE, data});
export const setNewEmployeeData = (
    newEmployeePosition,
    newEmployeeName,
    newEmployeeHead,
    newEmployeeLocation,
    newEmployeeTel,
    newEmployeeIntel,
    newEmployeeBirthday
) => ({
    type: SET_NEW_EMPLOYEE_DATA,
    newEmployeePosition,
    newEmployeeName,
    newEmployeeHead,
    newEmployeeLocation,
    newEmployeeTel,
    newEmployeeIntel,
    newEmployeeBirthday
});


export default employeesReducer;