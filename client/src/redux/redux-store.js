import {combineReducers, createStore} from 'redux';
import dealsReducer from './deals-reducer';

let reducers = combineReducers({
    dealsPage: dealsReducer,
});

let store = createStore(reducers);

export default store;