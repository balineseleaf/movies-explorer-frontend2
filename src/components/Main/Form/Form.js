import './Form.css';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Preloader from '../../Preloader/Preloader';
import { PATHS } from '../../../utils/constants';
import { MessageContext } from '../../../contexts/MessageContext';

function Form({
  children,
  name,
  onSubmit,
  isFormValid,
  isFormActivated,
  disabledDafault,
  searchStatus,
  isSendRequest,
  buttonText,
}) {
  const message = useContext(MessageContext);
  const { pathname } = useLocation();

  return (
    <form
      className={`form form_type_${name} ${
        isFormActivated ? 'form_active' : ''
      }`}
      name={name}
      noValidate
      onSubmit={onSubmit}
    >
      {children}

      {isSendRequest ? (
        <Preloader className={`preloader_${name}`} />
      ) : (
        <>
          <p
            className={`form__message form__message_${name} ${
              message.isError ? 'form__message_error' : 'form__message_ok'
            }`}
          >
            {name === 'search'
              ? searchStatus.statusMessage
                ? searchStatus.statusMessage
                : message.text
              : message.text}
          </p>
          {(isFormActivated ||
            pathname === PATHS.moviesPath ||
            pathname === PATHS.savedMoviesPath) && (
            <button
              className={`form__button-save form__button-save_type_${name}`}
              type='submit'
              disabled={disabledDafault ? disabledDafault : !isFormValid}
            >
              {buttonText}
            </button>
          )}
        </>
      )}
    </form>
  );
}

export default Form;
