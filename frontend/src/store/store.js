import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'


import { toyReducer } from './reducers/toyReducer.js';
import { modalReducer } from './reducers/modalReducer.js';
import { userReducer } from './reducers/userReducer.js';

const rootReducer = combineReducers({
    toy: toyReducer,
    modal: modalReducer,
    user: userReducer
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
