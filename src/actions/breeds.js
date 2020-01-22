import axios from 'axios';
import { getBreeds, getBreedImages } from '../API';
import { LOAD_BREEDS, SET_BREEDS, SET_BREEDS_ERROR, SET_BREED_IMAGES, SET_BREED_IMAGES_ERROR, LOAD_BREED_IMAGES } from './types';

export const setBreeds = () => dispatch => {
    dispatch({ type: LOAD_BREEDS });
    axios.get(getBreeds())
        .then(res => {
            let breeds = [];
            for (let breed in res.data.message) {
                breeds.push({
                    name: breed,
                    subBreeds: res.data.message[breed],
                    position: typeof breeds[breeds.length - 1] !== 'undefined' ? breeds[breeds.length - 1].position + breeds[breeds.length - 1].subBreeds.length + 1 : 0
                });
            };
            dispatch({
                type: SET_BREEDS,
                breeds
            });
        })
        .catch(err => {
            dispatch({
                type: SET_BREEDS_ERROR,
                err
            });
        });
}

export const loadBreedImages = (data) => dispatch => {
    dispatch({ 
        type: LOAD_BREED_IMAGES, 
        numberOfImages: data.numberOfImages 
    });
    return axios.get(getBreedImages(data.breed, data.numberOfImages))
        .then(res => {
            dispatch({
                type: SET_BREED_IMAGES,
                images: res.data.message
            })
        })
        .catch(err => {
            dispatch({
                type: SET_BREED_IMAGES_ERROR,
                err
            })
        })
}