import {dealsAPI, driversAPI, forwardersAPI, uploadAPI} from "../API/api";

// constants
const SET_DEALS_DATA = 'SET_DEALS_DATA';
const SET_DRIVERS_DATA = 'SET_DRIVERS_DATA';
const SET_FORWARDERS_DATA = 'SET_FORWARDERS_DATA';
const SET_FILTER = 'SET_FILTER';

// state
let initialState = {
    dealsData: [],
    driversData: [],
    forwardersData: [],
    filter: ''
}

// cases
const dealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DEALS_DATA:
            return {
                ...state,
                dealsData: action.data
            }
        case SET_DRIVERS_DATA:
            return {
                ...state,
                driversData: action.data
            }
        case SET_FORWARDERS_DATA:
            return {
                ...state,
                forwardersData: action.data
            }
        case SET_FILTER:
            return {
                ...state,
                filter: action.filter
            }
        default:
            return state;
    }
};

// ActionCreators
export const setDealsData = (data) => ({type: SET_DEALS_DATA, data});
export const setDriversData = (data) => ({type: SET_DRIVERS_DATA, data});
export const setForwardersData = (data) => ({type: SET_FORWARDERS_DATA, data});
export const setFilter = (filter) => ({type: SET_FILTER, filter});

// Thunks
export const loadingDealsPage = (filter) => async (dispatch, getState) => {
    if (getState().authBlock.isAuth) {
        switch (getState().authBlock.position) {
            case 'manager':
                if (filter) {
                    dispatch(loadingDealsTableData('manager', getState().authBlock.name, filter))
                } else {
                    dispatch(loadingDealsTableData('manager', getState().authBlock.name))
                }
                break
            case 'secretary':
                dispatch(loadingDealsTableData('secretary'))
                break
            case 'chief':
                dispatch(loadingDealsTableData('chief'))
                break
            case 'director':
                dispatch(loadingDealsTableData('director', getState().authBlock.name))
                break
            default:
                break
        }
        dispatch(loadingDriversTableData())
        dispatch(loadingForwardersTableData())
    }
}


export const loadingDealsTableData = (position, name, filter) => async (dispatch) => {
    try {
        switch (position) {
            case 'manager':
                if (filter) {
                    let filteredManagersDeals = await dealsAPI.filterDealsByStatusManagers(name, filter)
                    dispatch(setDealsData(filteredManagersDeals))
                } else {
                    let managerDeals = await dealsAPI.getAllManagerDeals(name)
                    dispatch(setDealsData(managerDeals))
                }

                break
            case 'secretary':
                let dealsDone = await dealsAPI.getAllDealsDone()
                dispatch(setDealsData(dealsDone))
                break
            case 'chief':
                let allDealsForChief = await dealsAPI.getAllDeals()
                dispatch(setDealsData(allDealsForChief))
                break
            case 'director':
                let allDealsForDirector = await dealsAPI.getAllDeals()
                dispatch(setDealsData(allDealsForDirector))
                break
            default:
                let allDeals = await dealsAPI.getAllDeals()
                dispatch(setDealsData(allDeals))
        }
    } catch (e) {/* alert(e.response.data.message)*/}
}

export const loadingDriversTableData = () => async (dispatch) => {
    try {
        const tableData = await driversAPI.getAllDrivers()
        dispatch(setDriversData(tableData))
    } catch (e) {/* alert(e.response.data.message)*/}
}

export const loadingForwardersTableData = () => async (dispatch) => {
    try {
        const tableData = await forwardersAPI.getAllForwarders()
        dispatch(setForwardersData(tableData))
    } catch (e) {/* alert(e.response.data.message)*/}
}

export const addDeal = (date, client, name) => async (dispatch) => {
    try {
        await dealsAPI.addNewDeal(date, client, name)
    } catch (e) { alert(e.response.data.message)}
    dispatch(loadingDealsPage())
}

export const saveFile = (file, id, company, sum, type) => async (dispatch) => {
    try {
        let response = await uploadAPI.saveFile(file, id, company, sum, type)
        dispatch(loadingDealsPage())
    } catch (e) {/* alert(e.response.data.message)*/}
}

export const deleteFile = (id, file, type) => async (dispatch) => {
    try {
        await uploadAPI.deleteFile(id, file, type)
        dispatch(loadingDealsPage())
    } catch (e) {/* alert(e.response.data.message)*/}
}

export const addDriver = (id, driverId, sum) => async (dispatch) => {
    try {
        let response = await dealsAPI.addDriverToDeal(id, driverId, sum)
        dispatch(loadingDealsPage())
    } catch (e) {/* alert(e.response.data.message)*/}
}

export const addForwarder = (id, name, sum) => async (dispatch) => {
    try {
        let response = await dealsAPI.addForwarderToDeal(id, name, sum)
        dispatch(loadingDealsPage())
    } catch (e) {/* alert(e.response.data.message)*/}
}

export const deleteDriverFromDeal = (id, name, sum) => async (dispatch) => {
    try {
        let response = await dealsAPI.deleteDriverFromDeal(id, name, sum)
        dispatch(loadingDealsPage())
    } catch (e) {/* alert(e.response.data.message)*/}
}

export const deleteForwarderFromDeal = (id, name, sum) => async (dispatch) => {
    try {
        let response = await dealsAPI.deleteForwarderFromDeal(id, name, sum)
        dispatch(loadingDealsPage())
    } catch (e) {/* alert(e.response.data.message)*/}
}

export const editComment = (id, type, text) => async (dispatch) => {
    try {
        let response = await dealsAPI.editComment(id, type, text)
        dispatch(loadingDealsPage())
    } catch (e) {/* alert(e.response.data.message)*/}
}

export const toggleStatus = (id, status) => async (dispatch) => {
    try {
        await dealsAPI.toggleStatus(id, status)
        dispatch(loadingDealsPage())
    } catch (e) {/* alert(e.response.data.message)*/}
}

export default dealsReducer;