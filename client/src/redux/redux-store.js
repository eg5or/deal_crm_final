import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import dealsReducer from './deals-reducer';
import authReducer from "./auth-reducer";
import clientsReducer from "./clients-reducer";
import driversReducer from "./drivers-reducer";
import forwardersReducer from "./forwarders-reducer";
import companiesReducer from "./companies-reducer";
import employeesReducer from "./employees-reducer";
import addDealReducer from './add-deal-reducer';
import thunkMiddleware from 'redux-thunk'
import appReducer from "./appReducer";
import profileReducer from "./profileReducer";
import notificationsReducer from "./notificationsReducer";
import settingsReducer from "./settings-reducer";
import releasesReducer from "./releases-reducer";
import statsReducer from "./stats-reducer";

let reducers = combineReducers({
    app: appReducer,
    authBlock: authReducer,
    addDealBlock: addDealReducer,
    dealsPage: dealsReducer,
    employeesPage: employeesReducer,
    clientsPage: clientsReducer,
    driversPage: driversReducer,
    forwardersPage: forwardersReducer,
    companiesPage: companiesReducer,
    profilePage: profileReducer,
    notifications: notificationsReducer,
    settings: settingsReducer,
    releases: releasesReducer,
    stats: statsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;