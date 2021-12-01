import { combineReducers } from 'redux';
import product from './cart';
import auth from './auth';
import message from './message';

export default combineReducers({
    product,
    auth,
    message
});