import { SET_BREEDS_ERROR, SET_BREED_IMAGES_ERROR, LOAD_BREEDS, LOAD_BREED_IMAGES } from '../actions/types';

const initialState = {
    breedsError: '',
    breedImagesError: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_BREEDS_ERROR:
            return {
                ...state,
                breedsError: action.err
            };
        case SET_BREED_IMAGES_ERROR:
            return {
                ...state,
                breedImagesError: action.err
            };
        case LOAD_BREEDS:
            return {
                ...state,
                breedsError: ''
            };
        case LOAD_BREED_IMAGES:
            return {
                ...state,
                breedImagesError: ''
            };
        default:
            return state;
    }
}