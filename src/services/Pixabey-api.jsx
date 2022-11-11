import PropTypes from 'prop-types';
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30097880-73ac2834789f98742941535c7';

function PixabayAPI(query, page, perPage) {
  const searchParams = new URLSearchParams({
    q: query,
    page: page,
    key: KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: perPage,
  });

  return fetch(`${BASE_URL}?${searchParams}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('Woops, nothing found for your request'));
  });
}

const api = { PixabayAPI };

export default api;

PixabayAPI.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
};
