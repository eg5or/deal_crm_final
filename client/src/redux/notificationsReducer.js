import {dealsAPI, notificationsAPI} from "../API/api";

// constants
const SET_NOTIFICATIONS_DATA = 'dealCRM/notifications/SET_NOTIFICATIONS_DATA';
const SET_NOTIFICATIONS_POPUP_DATA = 'dealCRM/notifications/SET_NOTIFICATIONS_POPUP_DATA';
const SET_NOTIFICATIONS_PAGES_COUNT = 'dealCRM/notifications/SET_NOTIFICATIONS_PAGES_COUNT';
const SET_NOTIFICATIONS_CURRENT_PAGE = 'dealCRM/notifications/SET_NOTIFICATIONS_CURRENT_PAGE';
const TOGGLE_IS_FETCHING = 'dealCRM/notifications/TOGGLE_IS_FETCHING';
const SET_NOTIFICATIONS_NO_READ_COUNT = 'dealCRM/notifications/SET_NOTIFICATIONS_NO_READ_COUNT';
const SET_TOGGLE_REFRESH = 'dealCRM/notifications/SET_TOGGLE_REFRESH';
const SET_TOGGLE_NEW_NOTIFICATION = 'dealCRM/notifications/SET_TOGGLE_NEW_NOTIFICATION';

// state
let initialState = {
    notifications: [],
    notificationsPopup: [],
    notificationsPagesCount: 0,
    notificationsCurrentPage: 1,
    isFetching: true,
    countNotificationsNoRead: 0,
    toggleRefresh: false,
    newNotification: false,
}

// cases
const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTIFICATIONS_DATA:
            return {
                ...state,
                notifications: action.data
            };
        case SET_NOTIFICATIONS_POPUP_DATA:
            return {
                ...state,
                notificationsPopup: action.data
            };
        case SET_NOTIFICATIONS_PAGES_COUNT:
            return {
                ...state,
                notificationsPagesCount: action.count
            };
        case SET_NOTIFICATIONS_CURRENT_PAGE:
            return {
                ...state,
                notificationsCurrentPage: action.page
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case SET_NOTIFICATIONS_NO_READ_COUNT:
            return {
                ...state,
                countNotificationsNoRead: action.count
            };
        case SET_TOGGLE_REFRESH:
            return {
                ...state,
                toggleRefresh: action.toggleRefresh
            };
        case SET_TOGGLE_NEW_NOTIFICATION:
            return {
                ...state,
                newNotification: action.newNotification
            };
        default:
            return state;
    }
}

// ActionCreators
export const setNotificationsData = (data) => ({type: SET_NOTIFICATIONS_DATA, data})
export const setNotificationsPopupData = (data) => ({type: SET_NOTIFICATIONS_POPUP_DATA, data})
export const setNotificationsPagesCount = (count) => ({type: SET_NOTIFICATIONS_PAGES_COUNT, count})
export const setNotificationsCurrentPage = (page) => ({type: SET_NOTIFICATIONS_CURRENT_PAGE, page})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const setNotificationsNoReadCount = (count) => ({type: SET_NOTIFICATIONS_NO_READ_COUNT, count})
export const setToggleRefresh = (toggleRefresh) => ({type: SET_TOGGLE_REFRESH, toggleRefresh})
export const setToggleNewNotification = (newNotification) => ({type: SET_TOGGLE_NEW_NOTIFICATION, newNotification})

// Thunks
// загрузка всех уведомлений для пользователя
export const loadingAllNotificationsData = (page) => async (dispatch, getState) => {
    let id = getState().authBlock._id
    let token = getState().authBlock.token
    try {
        dispatch(toggleIsFetching(true))
        const data = await notificationsAPI.getAllNotifications(id, page, token)
        dispatch(toggleIsFetching(false))
        dispatch(setNotificationsData(data.result))
        dispatch(setNotificationsPagesCount(data.pages))
        dispatch(setNotificationsCurrentPage(data.page))
    } catch (e) {
        alert(e.response.data.message)
    }
}
// сделать прочитанными все уведомления
export const setReadAllNotifications = (page) => async (dispatch, getState) => {
    let id = getState().authBlock._id
    let token = getState().authBlock.token
    try {
        const data = await notificationsAPI.readAllNotifications(id, token)
        dispatch(loadingAllNotificationsData(page))
    } catch (e) {
        alert(e.response.data.message)
    }
}

// сделать прочитанными все уведомления через popup окно
export const setReadAllNotificationsMini = () => async (dispatch, getState) => {
    let id = getState().authBlock._id
    let token = getState().authBlock.token
    try {
        const data = await notificationsAPI.readAllNotifications(id, token)
        dispatch(loadingNotificationsForPopupData())
    } catch (e) {
        alert(e.response.data.message)
    }
}
// загрузка уведомлений для пользователя для всплывающего окна
export const loadingNotificationsForPopupData = () => async (dispatch, getState) => {
    let id = getState().authBlock._id
    let token = getState().authBlock.token
    try {
        const data = await notificationsAPI.getNotificationsForPopup(id, token)
        dispatch(setNotificationsPopupData(data))
    } catch (e) {
        alert(e.response.data.message)
    }
}
// счетчик новых уведомлений для пользователя
export const loadingNotificationsNoReadCount = () => async (dispatch, getState) => {
    let id = getState().authBlock._id
    let token = getState().authBlock.token
    try {
        const data = await notificationsAPI.getCountNoReadNotifications(id, token)
        dispatch(setNotificationsNoReadCount(data.count))
    } catch (e) {
        alert(e.response.data.message)
    }
}
// загрузка новых уведомлений для пользователя
export const loadingNewNotificationsData = () => async (dispatch, getState) => {
    let id = getState().authBlock._id
    let token = getState().authBlock.token
    try {
        const data = await notificationsAPI.getNewNotifications(id, token)
        dispatch(setNotificationsData(data))
    } catch (e) {
        alert(e.response.data.message)
    }
}
// добавление нового уведомления
export const addNewNotification = (recipients, deal, message) => async (dispatch, getState) => {
    let id = getState().authBlock._id
    let token = getState().authBlock.token
    let read = false
    if (recipients === id) {
        read = true
    }
    try {
        const data = await notificationsAPI.create(id, recipients, deal, message, read, token)
    } catch (e) {
        alert(e.response.data.message)
    }
}
// включение автообновления уведомлений
export const onRefresh = () => async (dispatch, getState) => {
    dispatch(setToggleRefresh(true))
}
// выключение автообновления уведомлений
export const offRefresh = () => async (dispatch, getState) => {
    dispatch(setToggleRefresh(false))
}
// проверка на новые уведомления
export const checkNotifications = () => async (dispatch, getState) => {
    dispatch(setToggleRefresh(false))
}

export default notificationsReducer;