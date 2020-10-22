import {dealsAPI, driversAPI, forwardersAPI, uploadAPI} from "../API/api";
import {addNewNotification} from "./notificationsReducer";
import {dateNormalize} from "../common/DateNormalize/DateNormalize";
import {loadingCompaniesTableData} from "./companies-reducer";

// constants
const SET_DEALS_DATA = 'dealCRM/dealspage/SET_DEALS_DATA';
const SET_DRIVERS_DATA = 'dealCRM/dealspage/SET_DRIVERS_DATA';
const SET_FORWARDERS_DATA = 'dealCRM/dealspage/SET_FORWARDERS_DATA';
const SET_FILTER = 'dealCRM/dealspage/SET_FILTER';
const SET_DEALS_PAGE_COUNT = 'dealCRM/dealspage/SET_DEALS_PAGE_COUNT';
const SET_DEALS_CURRENT_PAGE = 'dealCRM/dealspage/SET_DEALS_CURRENT_PAGE';
const TOGGLE_IS_FETCHING = 'dealCRM/dealspage/TOGGLE_IS_FETCHING';
const TOGGLE_LOADING = 'dealCRM/dealspage/TOGGLE_LOADING';
const TOGGLE_ONE_DEAL_MODE = 'dealCRM/dealspage/TOGGLE_ONE_DEAL_MODE';

// state
let initialState = {
    dealsData: [],
    driversData: [],
    forwardersData: [],
    filter: '',
    dealsPageCount: 0,
    dealsCurrentPage: 1,
    oneDealMode: false,
    isFetching: true,
    loading: {
        approved: false,
        providerPaid: false,
        delivered: false,
        clientPaid: false,
        docSigned: false,
        docCollected: false,
        dealDone: false,
        fileCI: false,
        filePI: false,
        fileDOC: false,
        delivery: false,
        commentManager: false,
        commentHead: false,
    }
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
        case SET_DEALS_PAGE_COUNT:
            return {
                ...state,
                dealsPageCount: action.count
            }
        case SET_DEALS_CURRENT_PAGE:
            return {
                ...state,
                dealsCurrentPage: action.page
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case TOGGLE_LOADING:
            let loading = Object.defineProperty(state.loading, action.value, {value: action.bool})
            return {
                ...state,
                loading
            };
        case TOGGLE_ONE_DEAL_MODE:
            return {
                ...state,
                oneDealMode: action.toggle
            };
        default:
            return state;
    }
};

// ActionCreators
export const setDealsData = (data) => ({type: SET_DEALS_DATA, data});
export const setDriversData = (data) => ({type: SET_DRIVERS_DATA, data});
export const setForwardersData = (data) => ({type: SET_FORWARDERS_DATA, data});
export const setFilter = (filter) => ({type: SET_FILTER, filter});
export const setDealsPageCount = (count) => ({type: SET_DEALS_PAGE_COUNT, count});
export const setDealsCurrentPage = (page) => ({type: SET_DEALS_CURRENT_PAGE, page});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleLoading = (value, bool) => ({type: TOGGLE_LOADING, value, bool})
export const toggleOneDealMode = (toggle) => ({type: TOGGLE_ONE_DEAL_MODE, toggle})


// Thunks
// загрузка страницы сделок
export const loadingDealsPage = (id, filter, page) => async (dispatch, getState) => {
    if (id) {
        dispatch(loadingOneDeal(id))
    } else {
        dispatch(loadingDeals(filter, page))
    }
}

// загрузка одной сделки
export const loadingOneDeal = (id) => async (dispatch, getState) => {
    try {
        dispatch(toggleOneDealMode(true))
        dispatch(loadingDriversTableData())
        dispatch(loadingForwardersTableData())
        dispatch(loadingCompaniesTableData())
        if (getState().app.initialized) {
            let token = getState().authBlock.token
            dispatch(toggleIsFetching(true))
            let oneDeal = await dealsAPI.getOneDeal(id, token)
            dispatch(toggleIsFetching(false))
            dispatch(setDealsData(oneDeal))
        }
    } catch (e) {
        alert(e)
    }
}
// загрузка списка сделок
export const loadingDeals = (filter, page) => async (dispatch, getState) => {
    dispatch(toggleOneDealMode(false))
    if (getState().app.initialized) {
        let token = getState().authBlock.token
        let id = getState().authBlock._id
        switch (getState().authBlock.position) {
            case 'manager':
                if (filter) {
                    dispatch(loadingDealsTableData('manager', id, token, page, filter))
                } else {
                    dispatch(loadingDealsTableData('manager', id, token, page))
                }
                break
            case 'secretary':
                dispatch(loadingDealsTableData('secretary', id, token, page))
                break
            case 'chief':
                dispatch(loadingDealsTableData('chief', id, token, page))
                break
            case 'director':
                if (filter) {
                    dispatch(loadingDealsTableData('director', id, token, page, filter))
                } else {
                    dispatch(loadingDealsTableData('director', id, token, page))
                }
                break
            default:
                break
        }
        dispatch(loadingDriversTableData())
        dispatch(loadingForwardersTableData())
        dispatch(loadingCompaniesTableData())
    }
}
// выключение всех загрузок
export const offLoading = () => async (dispatch) => {
    dispatch(toggleLoading('approved', false))
    dispatch(toggleLoading('providerPaid', false))
    dispatch(toggleLoading('delivered', false))
    dispatch(toggleLoading('clientPaid', false))
    dispatch(toggleLoading('docSigned', false))
    dispatch(toggleLoading('docCollected', false))
    dispatch(toggleLoading('dealDone', false))
    dispatch(toggleLoading('fileCI', false))
    dispatch(toggleLoading('filePI', false))
    dispatch(toggleLoading('fileDOC', false))
    dispatch(toggleLoading('delivery', false))
    dispatch(toggleLoading('commentManager', false))
    dispatch(toggleLoading('commentHead', false))
    dispatch(toggleIsFetching(false))

}
// загрузка массива сделок
export const loadingDealsTableData = (position, id, token, page, filter) => async (dispatch) => {
    try {
        switch (position) {
            case 'manager':
                if (filter) {
                    dispatch(toggleIsFetching(true))
                    let filteredManagersDeals = await dealsAPI.filterDealsByStatusManagers(id, filter, token, page)
                    dispatch(offLoading())
                    dispatch(setDealsData(filteredManagersDeals.result))
                    dispatch(setDealsPageCount(filteredManagersDeals.pages))
                    dispatch(setDealsCurrentPage(filteredManagersDeals.page))
                } else {
                    dispatch(toggleIsFetching(true))
                    let managerDeals = await dealsAPI.getAllManagerDeals(id, token, page)
                    dispatch(offLoading())
                    dispatch(setDealsData(managerDeals.result))
                    dispatch(setDealsPageCount(managerDeals.pages))
                    dispatch(setDealsCurrentPage(managerDeals.page))
                }
                break
            case 'secretary':
                dispatch(toggleIsFetching(true))
                let dealsDone = await dealsAPI.getAllDealsDone(token, page)
                dispatch(offLoading())
                dispatch(setDealsData(dealsDone.result))
                dispatch(setDealsPageCount(dealsDone.pages))
                dispatch(setDealsCurrentPage(dealsDone.page))
                break
            case 'chief':
                dispatch(toggleIsFetching(true))
                let allDealsForChief = await dealsAPI.getAllDeals(token, page)
                dispatch(offLoading())
                dispatch(setDealsData(allDealsForChief.result))
                dispatch(setDealsPageCount(allDealsForChief.pages))
                dispatch(setDealsCurrentPage(allDealsForChief.page))
                break
            case 'director':
                if (filter) {
                    dispatch(toggleIsFetching(true))
                    let filteredDealsForDirector = await dealsAPI.filterDealsByStatusAllManagers(filter, token, page)
                    dispatch(offLoading())
                    dispatch(setDealsData(filteredDealsForDirector.result))
                    dispatch(setDealsPageCount(filteredDealsForDirector.pages))
                    dispatch(setDealsCurrentPage(filteredDealsForDirector.page))
                } else {
                    dispatch(toggleIsFetching(true))
                    let allDealsForDirector = await dealsAPI.getAllDeals(token, page)
                    dispatch(offLoading())
                    dispatch(setDealsData(allDealsForDirector.result))
                    dispatch(setDealsPageCount(allDealsForDirector.pages))
                    dispatch(setDealsCurrentPage(allDealsForDirector.page))
                }
                break
            default:
                break
        }
    } catch (e) {
        alert(e.response.data.message)
    }
}

// загрузка списка водителей для выбора при добавлении в сделку
export const loadingDriversTableData = () => async (dispatch) => {
    try {
        const tableData = await driversAPI.getAllDrivers()
        dispatch(setDriversData(tableData))
    } catch (e) {
        alert(e.response.data.message)
    }
}

// загрузка списка экспедиторов для выбора при добавлении в сделку
export const loadingForwardersTableData = () => async (dispatch) => {
    try {
        const tableData = await forwardersAPI.getAllForwarders()
        dispatch(setForwardersData(tableData))
    } catch (e) {
        alert(e.response.data.message)
    }
}

// добавление сделки
export const addDeal = (date, client) => async (dispatch, getState, setState) => {
    const id = getState().authBlock._id
    const headId = getState().authBlock.head._id
    try {
        const data = await dealsAPI.addNewDeal(date, client, id)
        dispatch(addNewNotification(headId, data._id, `добавил новую сделку Клиент ${client} на ${dateNormalize(date)}`))
        dispatch(loadingDealsPage())
    } catch (e) {
        alert(e.response.data.message)
    }
}

// добавление файлов в центральный блок сделки
export const saveFile = (file, id, company, sum, type, managerId) => async (dispatch, getState) => {
    let typeText = ''
    switch (type) {
        case 'CI':
            dispatch(toggleLoading('fileCI', true))
            typeText = 'Счет клиента'
            break
        case 'PI':
            dispatch(toggleLoading('filePI', true))
            typeText = 'Счет поставщика'
            break
        case 'DOC':
            dispatch(toggleLoading('fileDOC', true))
            typeText = 'Документ'
            break
        default:
            break
    }
    try {
        let response = await uploadAPI.saveFile(file, id, company, sum, type)
        if (getState().dealsPage.oneDealMode) {
            dispatch(loadingDealsPage(id))
        } else {
            dispatch(loadingDealsPage())
        }
        dispatch(addNewNotification(managerId, id, `добавил новый файл ${typeText} компания ${company} на сумму ${sum}`))
    } catch (e) {
        alert(e.response.data.message)
    }
}

// удаление файлов из центрального блока сделки
export const deleteFile = (id, file, type, managerId) => async (dispatch, getState) => {
    let typeText = ''
    switch (type) {
        case 'CI':
            dispatch(toggleLoading('fileCI', true))
            typeText = 'Счет клиента'
            break
        case 'PI':
            dispatch(toggleLoading('filePI', true))
            typeText = 'Счет поставщика'
            break
        case 'DOC':
            dispatch(toggleLoading('fileDOC', true))
            typeText = 'Документ'
            break
        default:
            break
    }
    try {
        await uploadAPI.deleteFile(id, file, type)
        if (getState().dealsPage.oneDealMode) {
            dispatch(loadingDealsPage(id))
        } else {
            dispatch(loadingDealsPage())
        }
        dispatch(addNewNotification(managerId, id, `удалил файл ${typeText}`))
    } catch (e) {
        alert(e.response.data.message)
    }
}

// добавление водителя в сделку
export const addDriver = (id, driverId, sum, managerId) => async (dispatch, getState) => {
    const headId = getState().authBlock.head._id
    try {
        dispatch(toggleLoading('delivery', true))
        let response = await dealsAPI.addDriverToDeal(id, driverId, sum)
        if (getState().dealsPage.oneDealMode) {
            dispatch(loadingDealsPage(id))
        } else {
            dispatch(loadingDealsPage())
        }
        dispatch(addNewNotification(managerId, id, `добавил водителя`))
        dispatch(addNewNotification(headId, id, `добавил водителя`))
    } catch (e) {
        alert(e.response.data.message)
    }
}

// добавление расхода в сделку
export const addGift = (id, giftName, comment, sum, managerId) => async (dispatch, getState) => {
    const headId = getState().authBlock.head._id
    try {
        dispatch(toggleLoading('delivery', true))
        let response = await dealsAPI.addGiftToDeal(id, giftName, comment, sum)
        if (getState().dealsPage.oneDealMode) {
            dispatch(loadingDealsPage(id))
        } else {
            dispatch(loadingDealsPage())
        }
        dispatch(addNewNotification(managerId, id, `добавил расход ${giftName} на сумму ${sum}`))
        dispatch(addNewNotification(headId, id, `добавил расход ${giftName} на сумму ${sum}`))
    } catch (e) {
        alert(e.response.data.message)
    }
}

// добавление экспедитора в сделку
export const addForwarder = (id, forwarderId, sum, managerId) => async (dispatch, getState) => {
    const headId = getState().authBlock.head._id
    try {
        dispatch(toggleLoading('delivery', true))
        let response = await dealsAPI.addForwarderToDeal(id, forwarderId, sum)
        if (getState().dealsPage.oneDealMode) {
            dispatch(loadingDealsPage(id))
        } else {
            dispatch(loadingDealsPage())
        }
        dispatch(addNewNotification(managerId, id, `добавил экспедитора`))
        dispatch(addNewNotification(headId, id, `добавил экспедитора`))
    } catch (e) {
        alert(e.response.data.message)
    }
}

// удаление водителя из сделки
export const deleteDriverFromDeal = (id, name, sum, managerId) => async (dispatch, getState) => {
    const headId = getState().authBlock.head._id
    try {
        dispatch(toggleLoading('delivery', true))
        let response = await dealsAPI.deleteDriverFromDeal(id, name, sum)
        if (getState().dealsPage.oneDealMode) {
            dispatch(loadingDealsPage(id))
        } else {
            dispatch(loadingDealsPage())
        }
        dispatch(addNewNotification(managerId, id, `удалил водителя ${name} сумма ${sum}`))
        dispatch(addNewNotification(headId, id, `удалил водителя ${name} сумма ${sum}`))
    } catch (e) {
        alert(e.response.data.message)
    }
}

// удаление экспедитора из сделки
export const deleteForwarderFromDeal = (id, name, sum, managerId) => async (dispatch, getState) => {
    const headId = getState().authBlock.head._id
    try {
        dispatch(toggleLoading('delivery', true))
        let response = await dealsAPI.deleteForwarderFromDeal(id, name, sum)
        if (getState().dealsPage.oneDealMode) {
            dispatch(loadingDealsPage(id))
        } else {
            dispatch(loadingDealsPage())
        }
        dispatch(addNewNotification(managerId, id, `удалил экспедитора ${name} сумма ${sum}`))
        dispatch(addNewNotification(headId, id, `удалил экспедитора ${name} сумма ${sum}`))
    } catch (e) {
        alert(e.response.data.message)
    }
}

// удаление расхода из сделки
export const deleteGiftFromDeal = (id, name, sum, managerId) => async (dispatch, getState) => {
    const headId = getState().authBlock.head._id
    try {
        dispatch(toggleLoading('delivery', true))
        let response = await dealsAPI.deleteGiftFromDeal(id, name, sum)
        if (getState().dealsPage.oneDealMode) {
            dispatch(loadingDealsPage(id))
        } else {
            dispatch(loadingDealsPage())
        }
        dispatch(addNewNotification(managerId, id, `удалил расход ${name} на сумму ${sum}`))
        dispatch(addNewNotification(headId, id, `удалил расход ${name} на сумму ${sum}`))
    } catch (e) {
        alert(e.response.data.message)
    }
}

// редактировать комментарий (менеджер или руководитель)
export const editComment = (id, type, text, managerId) => async (dispatch, getState) => {
    const employeeId = getState().authBlock._id
    const headId = getState().authBlock.head._id
    try {
        if (type === 'CM') {
            dispatch(toggleLoading('commentManager', true))
        } else if (type === 'CH') {
            dispatch(toggleLoading('commentHead', true))
        }
        let response = await dealsAPI.editComment(id, type, text)
        if (getState().dealsPage.oneDealMode) {
            dispatch(loadingDealsPage(id))
        } else {
            dispatch(loadingDealsPage())
        }
        dispatch(addNewNotification(managerId, id, `изменил комментарий на: ${text}`))
        dispatch(addNewNotification(headId, id, `изменил комментарий на: ${text}`))
    } catch (e) {
        alert(e.response.data.message)
    }
}
// редактировать адрес доставки
export const editAddress = (id, text, managerId) => async (dispatch, getState) => {
    const employeeId = getState().authBlock._id
    const headId = getState().authBlock.head._id
    try {
        dispatch(toggleLoading('commentManager', true))
        let response = await dealsAPI.editAddress(id, text)
        if (getState().dealsPage.oneDealMode) {
            dispatch(loadingDealsPage(id))
        } else {
            dispatch(loadingDealsPage())
        }
        dispatch(addNewNotification(managerId, id, `изменил адрес доставки на: ${text}`))
        dispatch(addNewNotification(headId, id, `изменил адрес доставки на: ${text}`))
    } catch (e) {
        alert(e.response.data.message)
    }
}

// переключатель статусов
export const toggleStatus = (id, status, managerId) => async (dispatch, getState) => {
    const headId = getState().authBlock.head._id
    const employeeId = getState().authBlock._id
    const oneDealMode = getState().dealsPage.oneDealMode
    switch (status) {
        case 'approved':
            try {
                dispatch(toggleLoading('approved', true))
                const dealStatusValue = await dealsAPI.toggleStatus(id, status)
                if (oneDealMode) {
                    dispatch(loadingDealsPage(id))
                } else {
                    dispatch(loadingDealsPage())
                }
                const message = `изменил статус на новый: "сделка ${!dealStatusValue.dealStatus.approved ? `одобрена"` : `не одобрена"`}`
                dispatch(addNewNotification(managerId, id, message))
                dispatch(addNewNotification(employeeId, id, message))
                dispatch(addNewNotification('5f71cadfa006e134b4d7cfd0', id, message))
            } catch (e) {
                alert(e.response.data.message)
            }
            break
        case 'providerPaid':
            try {
                dispatch(toggleLoading('providerPaid', true))
                const dealStatusValue = await dealsAPI.toggleStatus(id, status)
                if (oneDealMode) {
                    dispatch(loadingDealsPage(id))
                } else {
                    dispatch(loadingDealsPage())
                }
                const message = `изменил статус на новый: "счета поставщиков ${!dealStatusValue.dealStatus.providerPaid ? `оплатили"` : `не оплатили"`}`
                dispatch(addNewNotification(headId, id, message))
                dispatch(addNewNotification(employeeId, id, message))
                dispatch(addNewNotification(managerId, id, message))
            } catch (e) {
                alert(e.response.data.message)
            }
            break
        case 'delivered':
            try {
                dispatch(toggleLoading('delivered', true))
                const dealStatusValue = await dealsAPI.toggleStatus(id, status)
                if (oneDealMode) {
                    dispatch(loadingDealsPage(id))
                } else {
                    dispatch(loadingDealsPage())
                }
                const message = `изменил статус на новый: "сделку ${!dealStatusValue.dealStatus.delivered ? `вывезли"` : `не вывезли"`}`
                if (employeeId === managerId) {
                    dispatch(addNewNotification(employeeId, id, message))
                    dispatch(addNewNotification('5f71cadfa006e134b4d7cfd0', id, message))
                    dispatch(addNewNotification(headId, id, message))
                } else if (employeeId === '5f71cadfa006e134b4d7cfd0') {
                    dispatch(addNewNotification(employeeId, id, message))
                    dispatch(addNewNotification(managerId, id, message))
                    dispatch(addNewNotification(headId, id, message))
                } else {
                    dispatch(addNewNotification(managerId, id, message))
                    dispatch(addNewNotification('5f71cadfa006e134b4d7cfd0', id, message))
                }
            } catch (e) {
                alert(e.response.data.message)
            }
            break
        case 'clientPaid':
            try {
                dispatch(toggleLoading('clientPaid', true))
                const dealStatusValue = await dealsAPI.toggleStatus(id, status)
                if (oneDealMode) {
                    dispatch(loadingDealsPage(id))
                } else {
                    dispatch(loadingDealsPage())
                }
                const message = `изменил статус на новый: "клиент ${!dealStatusValue.dealStatus.clientPaid ? `оплатил"` : `не оплатил"`}`
                dispatch(addNewNotification(headId, id, message))
                dispatch(addNewNotification(employeeId, id, message))
                dispatch(addNewNotification('5f71cadfa006e134b4d7cfd0', id, message))
            } catch (e) {
                alert(e.response.data.message)
            }
            break
        case 'docSigned':
            try {
                dispatch(toggleLoading('docSigned', true))
                const dealStatusValue = await dealsAPI.toggleStatus(id, status)
                if (oneDealMode) {
                    dispatch(loadingDealsPage(id))
                } else {
                    dispatch(loadingDealsPage())
                }
                const message = `изменил статус на новый: "документы ${!dealStatusValue.dealStatus.docSigned ? `подписаны"` : `не подписаны"`}`
                dispatch(addNewNotification(headId, id, message))
                dispatch(addNewNotification(employeeId, id, message))
                dispatch(addNewNotification('5f71cadfa006e134b4d7cfd0', id, message))
            } catch (e) {
                alert(e.response.data.message)
            }
            break
        case 'docCollected':
            try {
                dispatch(toggleLoading('docCollected', true))
                const dealStatusValue = await dealsAPI.toggleStatus(id, status)
                if (oneDealMode) {
                    dispatch(loadingDealsPage(id))
                } else {
                    dispatch(loadingDealsPage())
                }
                const message = `изменил статус на новый: "документы ${!dealStatusValue.dealStatus.docCollected ? `собраны"` : `не собраны"`}`
                dispatch(addNewNotification(headId, id, message))
                dispatch(addNewNotification(employeeId, id, message))
                dispatch(addNewNotification('5f71cadfa006e134b4d7cfd0', id, message))
            } catch (e) {
                alert(e.response.data.message)
            }
            break
        case 'dealDone':
            try {
                dispatch(toggleLoading('dealDone', true))
                const dealStatusValue = await dealsAPI.toggleStatus(id, status)
                if (oneDealMode) {
                    dispatch(loadingDealsPage(id))
                } else {
                    dispatch(loadingDealsPage())
                }
                const message = `изменил статус готовности сделки на ${!dealStatusValue.dealStatus.dealDone ? 'Готово' : 'Не готово'}`
                dispatch(addNewNotification(headId, id, message))
                dispatch(addNewNotification('5f71cadfa006e134b4d7cfd0', id, message))
            } catch (e) {
                alert(e.response.data.message)
            }
            break
        default:
            break
    }


}

export default dealsReducer;