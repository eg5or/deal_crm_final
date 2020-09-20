import {combineReducers, createStore} from 'redux';
import dealsReducer from './deals-reducer';
import authReducer from "./auth-reducer";
import companiesReducer from "./companies-reducer";
import driversReducer from "./drivers-reducer";
import forwardersReducer from "./forwarders-reducer";
import employeesReducer from "./employees-reducer";

let reducers = combineReducers({
    dealsPage: dealsReducer,
    authBlock: authReducer,
    companiesPage: companiesReducer,
    driversPage: driversReducer,
    forwardersPage: forwardersReducer,
    employeesPage: employeesReducer
});

let store = createStore(reducers);

export default store;