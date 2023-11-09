import './Form.css';
import Preloader from '../../Preloader/Preloader';

function Form({
  children,
  name,
  onSubmit,
  buttonText,
  isSendRequest,
  isProfileEdit = true,
}) {
  return (
    <form
      className={`form form_type_${name}`}
      name={name}
      noValidate
      onSubmit={onSubmit}
    >
      {children}
      {isSendRequest ? (
        <Preloader className={`preloader_${name}`} />
      ) : (
        <>
          {isProfileEdit && (
            <button
              className={`form__button-save form__button-save_type_${name}`}
              type='submit'
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
