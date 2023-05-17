import { createStore } from 'redux';
import photoReducer from './photoReducer';
// import paginationReducer from './paginationReducer';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';


const rootReducer = photoReducer;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;