export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
    .then(data => data);
}

export function fetchCatByBreed(breedId) {
  return fetch(`https://api.thecatapi.com/v1/images/${breedId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
    .then(data => data);
}
