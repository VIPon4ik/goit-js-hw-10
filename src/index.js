'use strict';

import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_gTLd4V1rphNmzg6NSarYRHtsGtJhUWrsvjr7FYYDsq3fhbaLaBtqt7cy9ByOvIDP';

const selectElem = document.querySelector('.breed-select');
const divElem = document.querySelector('.cat-info');
const loaderElem = document.querySelector('.loader');
const errorElem = document.querySelector('.error');

selectElem.addEventListener('change', event => {
  loaderElem.style.display = 'block';
  errorElem.style.display = 'none';
  divElem.style.display = 'none';

  const breedId = event.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(data => {
      console.log(data);
      const markup = `
      <img src="${data.url}" width="400" height="400">
      <div class="text-container">
        <h1>${data.breeds[0].name}</h1>
        <p>${data.breeds[0].description}</p>
        <h2>Temperament: ${data.breeds[0].temperament}</h2>
      </div>
    `;

      divElem.innerHTML = markup;
      divElem.style.display = 'flex';

      loaderElem.style.display = 'none';
    })
    .catch(error => {
      loaderElem.style.display = 'none';
      errorElem.style.display = 'block';
    });
});

fetchBreeds()
  .then(data => {
    data.forEach(item => {
      const optionElem = `<option value="${item.reference_image_id}">${item.name}</option>`;
      selectElem.insertAdjacentHTML('beforeend', optionElem);
    });

    loaderElem.style.display = 'none';
    selectElem.style.display = 'block';
  })
  .catch(error => {
    loaderElem.style.display = 'none';
    errorElem.style.display = 'block';
  });
