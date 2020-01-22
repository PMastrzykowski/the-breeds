import { OPEN_MODAL, CLOSE_MODAL, SET_BREED_IMAGES, LOAD_BREED_IMAGES, LEAVING_ANIMATION_START, LEAVING_ANIMATION_FINISH, SET_BREED_IMAGES_ERROR } from '../actions/types';

const initialState = {
    isOpen: false,
    isLeaving: false,
    isLoading: false,
    breed: '',
    images: [],
    numberOfImages: 1
}

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                isOpen: true,
                isLoading: true,
                breed: action.breed,
                images: [],
                isLeaving: false
            };
        case CLOSE_MODAL:
            return {
                ...state,
                isOpen: false
            };
        case LEAVING_ANIMATION_START:
            return {
                ...state,
                isLeaving: true
            };
        case LEAVING_ANIMATION_FINISH:
            return {
                ...state,
                isLeaving: false,
                numberOfImages: 1
            };
        case SET_BREED_IMAGES:
            return {
                ...state,
                images: action.images,
                isLoading: false
            };
        case LOAD_BREED_IMAGES:
            return {
                ...state,
                isLoading: true,
                numberOfImages: action.numberOfImages
            };
        case SET_BREED_IMAGES_ERROR:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}