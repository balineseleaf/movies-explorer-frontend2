import { apiConfig } from './utils';

class ApiMovies {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl.moviesApi;
    this._headers = headers;
  }

  // Метод запроса фильмов с сервера
  getMovies() {
    return fetch(this._baseUrl, {
      method: 'GET',
      headers: this._headers,
    }).then(handleResponse);
  }
}
  const handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  };

export const apiMovies = new ApiMovies(apiConfig);
