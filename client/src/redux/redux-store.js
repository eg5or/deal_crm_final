import {combineReducers, createStore} from 'redux';
import dealsReducer from './deals-reducer';
import authReducer from "./auth-reducer";
import companiesReducer from "./companies-reducer";
import driversReducer from "./drivers-reducer";
import forwardersReducer from "./forwarders-reducer";
import employeesReducer from "./employees-reducer";
import addDealReducer from './add-deal-reducer';

let reducers = combineReducers({
    dealsPage: dealsReducer,
    authBlock: authReducer,
    companiesPage: companiesReducer,
    driversPage: driversReducer,
    forwardersPage: forwardersReducer,
    employeesPage: employeesReducer,
    addDealBlock: addDealReducer
});

let store = createStore(reducers);

export default store;