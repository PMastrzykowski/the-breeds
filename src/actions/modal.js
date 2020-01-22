import { OPEN_MODAL, CLOSE_MODAL, LEAVING_ANIMATION_START, LEAVING_ANIMATION_FINISH } from '../actions/types';
import { loadBreedImages } from './breeds';

export const openModal = (data) => dispatch => {
    dispatch({
        type: OPEN_MODAL,
        breed: data.breed
    });
    return dispatch(loadBreedImages(data));
}

export const closeModal = () => {
    return { type: CLOSE_MODAL }
}
export const leavingAnimationStart = () => {
    return { type: LEAVING_ANIMATION_START }
}
export const leavingAnimationFinish = () => {
    return { type: LEAVING_ANIMATION_FINISH }
}