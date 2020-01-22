export const getBreeds = () => `https://dog.ceo/api/breeds/list/all`
export const getBreedImages = (breed, numberOfImages) => `https://dog.ceo/api/breed/${breed}/images/random/${numberOfImages}`