import './Auth.css';
import { Link, useLocation } from 'react-router-dom';
import Form from '../Form/Form';
import { registerForm, loginForm } from '../../../utils/data-list';
import Input from '../Form/Input/Input';
import Main from '../Main';
import { PATHS } from '../../../utils/constants';
import { useState } from 'react';

const Auth = ({ onLogin, onRegister }) => {
  const { registerPath, loginPath } = PATHS;
  const { pathname } = useLocation();

  let data;
  switch (pathname) {
    case registerPath:
      data = {
        form: registerForm,
        link: loginPath,
        linkText: 'Войти',
        text: 'Уже зарегистрированы?',
        onSubmit: onRegister,
      };
      break;
    case loginPath:
      data = {
        form: loginForm,
        link: registerPath,
        linkText: 'Регистрация',
        text: 'Ещё не зарегистрированы?',
        onSubmit: onLogin,
      };
      break;
    default:
      data = {
        form: '',
        link: '',
        linkText: '',
        text: '',
        onSubmit: '',
      };
      break;
  }
  const { name, title, buttonText, inputs } = data.form;

  const [inputValue, setInputValue] = useState('');

  const handleChange = (evt) => {
    setInputValue(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <Main>
      <section className='auth'>
        <h1 className='auth__title'>{title}</h1>
        <Form name={name} buttonText={buttonText} onSubmit={handleSubmit}>
          <ul className={`form__list form__list_type_${name}`}>
            {inputs.map((input) => (
              <li
                className={`form__item form__item_type_${name}`}
                key={input.name}
              >
                <Input
                  type='text'
                  value={inputValue}
                  input={input}
                  form={name}
                  onChange={handleChange}
                />
              </li>
            ))}
          </ul>
        </Form>
        <div className='auth__wrapper'>
          <p className='auth__text'>{data.text}&nbsp;</p>
          <Link className='auth__link' to={data.link}>
            {data.linkText}
          </Link>
        </div>
      </section>
    </Main>
  );
};

export default Auth;
