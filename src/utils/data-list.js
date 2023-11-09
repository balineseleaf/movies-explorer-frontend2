const registerForm = {
  name: 'register',
  title: 'Добро пожаловать!',
  buttonText: 'Зарегистрироваться',
  buttonTextLoading: 'Регистрация...',
  inputs: [
    {
      type: 'text',
      name: 'name',
      minLength: '2',
      maxLength: '30',
      label: 'Имя',
      placeholder: 'Виталий',
      required: true,
      autoFocus: true,
      autoComplete: 'off',
    },
    {
      type: 'email',
      name: 'email',
      minLength: '4',
      maxLength: '40',
      label: 'E-mail',
      placeholder: 'pochta@yandex.ru',
      required: true,
      autoComplete: 'off',
    },
    {
      type: 'password',
      name: 'password',
      label: 'Пароль',
      placeholder: '••••••••••••••',
      minLength: '4',
      maxLength: '40',
      required: true,
      autoComplete: 'off',
    },
  ],
};

const loginForm = {
  name: 'login',
  title: 'Рады видеть!',
  buttonText: 'Войти',
  buttonTextLoading: 'Вход...',
  inputs: [
    {
      type: 'email',
      name: 'email',
      minLength: '4',
      maxLength: '40',
      label: 'E-mail',
      placeholder: 'pochta@yandex.ru',
      required: true,
      autoFocus: true,
      autoComplete: 'on',
    },
    {
      type: 'password',
      name: 'password',
      minLength: '4',
      maxLength: '40',
      label: 'Пароль',
      placeholder: '',
      required: true,
      autoComplete: 'on',
    },
  ],
};

const profileForm = {
  name: 'profile',
  title: 'Привет, Михаил!',
  buttonText: 'Сохранить',
  buttonTextLoading: 'Сохранение...',
  textError: 'При обновлении профиля произошла ошибка.',
  inputs: [
    {
      type: 'text',
      minLength: '2',
      maxLength: '30',
      name: 'name',
      label: 'Имя',
      placeholder: '',
      required: true,
      autoFocus: true,
      autoComplete: 'off',
    },
    {
      type: 'email',
      name: 'email',
      label: 'E-mail',
      placeholder: '',
      minLength: '4',
      maxLength: '40',
      required: true,
      autoComplete: 'off',
    },
  ],
};

const searchForm = {
  name: 'search',
  title: 'Найти',
  buttonText: 'Найти',
  buttonTextLoading: 'Поиск...',
  inputs: [
    {
      type: 'search',
      name: 'search',
      placeholder: 'Фильм',
      required: true,
      autoFocus: true,
      autoComplete: 'on',
    },
    {
      type: 'checkbox',
      name: 'short',
      placeholder: 'Короткометражки',
      required: false,
      checked: false,
    },
  ],
};

export { registerForm, loginForm, profileForm, searchForm };
