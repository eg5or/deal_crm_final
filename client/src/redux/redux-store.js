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

let reducers = combineReducers({
    dealsPage: dealsReducer,
    authBlock: authReducer,
    clientsPage: clientsReducer,
    driversPage: driversReducer,
    forwardersPage: forwardersReducer,
    employeesPage: employeesReducer,
    addDealBlock: addDealReducer,
    app: appReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;