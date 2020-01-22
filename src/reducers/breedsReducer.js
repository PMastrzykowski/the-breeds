import { LOAD_BREEDS, SET_BREEDS, SET_BREEDS_ERROR } from '../actions/types';

const initialState = {
    allBreeds: [],
    isLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BREEDS:
            return {
                ...state,
                isLoading: true
            }
        case SET_BREEDS:
            return {
                ...state,
                isLoading: false,
                allBreeds: action.breeds
            };
        case SET_BREEDS_ERROR:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}