import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import breedsReducer from './breedsReducer';
import modalReducer from './modalReducer';

export default combineReducers({
    errors: errorReducer,
    breeds: breedsReducer,
    modal: modalReducer
});