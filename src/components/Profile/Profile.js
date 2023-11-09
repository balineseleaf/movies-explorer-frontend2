import { useContext } from 'react';
import { profileForm } from '../../utils/data-list';
import './Profile.css';
import Form from '../Main/Form/Form';
import Input from '../Main/Form/Input/Input';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Profile = (props) => {
  const { isEdit, onEditProfile, onSignout } = props;
  const currentUser = useContext(CurrentUserContext);
  const { name, buttonText, inputs } = profileForm;

  const handleClickExit = () => {
    onSignout();
  };

  return (
    <main className='main'>
      <section className='profile'>
        <h1 className='profile__title'>Привет, Пользователь!</h1>
        <Form name={name} buttonText={buttonText} isProfileEdit={isEdit}>
          <ul className={`form__list form__list_type_${name}`}>
            {inputs.map((input) => (
              <li
                className={`form__item form__item_type_${name}`}
                key={input.name + name}
              >
                <Input
                  value='Пользователь'
                  input={input}
                  form={name}
                  onFocus={(e) => e.currentTarget.select()}
                />
              </li>
            ))}
          </ul>
        </Form>
        {!isEdit && (
          <ul className='profile__list'>
            <li className='profile__item'>
              <button
                className='profile__button profile__button_edit'
                onClick={onEditProfile}
              >
                Редактировать
              </button>
            </li>
            <li className='profale__item'>
              <button
                className='profile__button profile__button_exit'
                onClick={handleClickExit}
              >
                Выйти из аккаунта
              </button>
            </li>
          </ul>
        )}
      </section>
    </main>
  );
};

export default Profile;
