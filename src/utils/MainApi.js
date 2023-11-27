import { METHODS_FETCH, PATHS } from './constants';
import { apiConfig } from './utils';

const { loginPath, logoutPath, registerPath, userPath, moviesPath } = PATHS;
const { postFetch, patchFetch, deleteFetch } = METHODS_FETCH;

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl.mainApi;
    this._headers = headers;
  }

  // Приватный метод проверки успешности запроса
  _isOk(res) {
    if (res.ok) {
      return res.json();
    }
    console.log(res);
    return res.json().then((res) => {
      throw res;
    });
  }

  // Приватный метод запроса сразу с проверкой ответа
  _request(url, options) {
    return fetch(url, options).then(this._isOk);
  }

  // Метод создания нового пользователя
  addNewUser({ name, password, email }) {
    return this._request(`${this._baseUrl}${registerPath}`, {
      method: postFetch,
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
  }

  // Метод авторизации
  authorize({ password, email }) {
    return this._request(`${this._baseUrl}${loginPath}`, {
      method: postFetch,
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  }

  // Метод запроса данных пользователя с сервера
  checkToken() {
    return this._request(`${this._baseUrl}${userPath}`, {
      headers: this._headers,
      credentials: 'include',
    });
  }

  // Метод выхода пользователя
  logout() {
    return this._request(`${this._baseUrl}${logoutPath}`, {
      headers: this._headers,
      credentials: 'include',
    });
  }

  // метод запроса сохраненных фильмов с сервера
  getMovies() {
    return this._request(`${this._baseUrl}${moviesPath}`, {
      headers: this._headers,
      credentials: 'include',
    });
  }

  // Метот передачи данных пользователя на сервер
  setUserInfoApi({ name, email }) {
    return this._request(`${this._baseUrl}${userPath}`, {
      method: patchFetch,
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    });
  }

  // Метод отправки данных об установке/снятии лайка на сервер
  addSavedMovies(movie) {
    return this._request(`${this._baseUrl}${moviesPath}`, {
      method: postFetch,
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(movie),
    });
  }

  // Метод удаления карточки с сервера
  deleteMovies(movieId) {
    return this._request(`${this._baseUrl}${moviesPath}/${movieId}`, {
      method: deleteFetch,
      headers: this._headers,
      credentials: 'include',
    });
  }
}

export const api = new Api(apiConfig);
