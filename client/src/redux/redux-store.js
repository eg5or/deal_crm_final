import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import dealsReducer from './deals-reducer';
import authReducer from "./auth-reducer";
import clientsReducer from "./clients-reducer";
import driversReducer from "./drivers-reducer";
import forwardersReducer from "./forwarders-reducer";
import employeesReducer from "./employees-reducer";
import addDealReducer from './add-deal-reducer';
import thunkMiddleware from 'redux-thunk'
import appReducer from "./appReducer";
import profileReducer from "./profileReducer";
import notificationsReducer from "./notificationsReducer";
import settingsReducer from "./settings-reducer";

let reducers = combineReducers({
    app: appReducer,
    authBlock: authReducer,
    addDealBlock: addDealReducer,
    dealsPage: dealsReducer,
    employeesPage: employeesReducer,
    clientsPage: clientsReducer,
    driversPage: driversReducer,
    forwardersPage: forwardersReducer,
    profilePage: profileReducer,
    notifications: notificationsReducer,
    settings: settingsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;