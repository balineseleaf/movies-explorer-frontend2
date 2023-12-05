import { apiConfig } from './utils';

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl.mainApi;
    this._headers = headers;
  }

  // Метод создания нового пользователя
  register = ({name, email, password}) => {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
    }).then(handleResponse);
  };

  // Метод авторизации
  login({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(handleResponse);
  }

  // Метод запроса данных пользователя с сервера
  checkToken (token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    }).then(handleResponse);
  }

  // метод запроса сохраненных фильмов с сервера
  getUserMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      credentials: 'include',
    }).then(handleResponse);
  }

  getUser() {
      return fetch(`${this._baseUrl}/users/me`, {
        method:'GET',
        credentials: 'include',
      }).then(handleResponse);
  }

  // Метот передачи данных пользователя на сервер
  setUserInfoApi({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then(handleResponse);
  }
 // добавление в сохр. фильмы
  addSavedMovies(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(movie),
    }).then(handleResponse);
  }

  // Метод удаления карточки с сервера
  deleteMovies(movieId) {
    return fetch(`${this._baseUrl}$/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
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

export const api = new Api(apiConfig);
