const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '34896851-0d66a9e8e3b1e7c58e0577c6f';

export const getImages = (searchText) => {
   return fetch(`${BASE_URL}/?q=${searchText}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
};
