import './Form.css';
// import Preloader from '../../Preloader/Preloader';
import { useState } from 'react';
import '../../Movies/SearchForm/SearchForm.css';

function FormSearch({ nameForm, onSubmit, buttonText }) {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (evt) => {
    setSearchValue(evt.target.value);
  };

  return (
    <form
      className={`form form_type_search`}
      name={nameForm}
      noValidate
      onSubmit={onSubmit}
    >
      <div className='form__wrapper'>
        <input
          className='form__input_type_search'
          placeholder='Фильм'
          type='search'
          name='search'
          value={searchValue}
          onChange={handleChange}
          required={true}
          autoFocus={true}
        />
        <button
          className={`form__button-save form__button-save_type_search`}
          type='submit'
        >
          {buttonText}
        </button>
      </div>
      <div className='form__switcher'>
        <input
          className='form__input_type_short'
          type='checkbox'
          placeholder='Короткометражки'
          name='short'
          required={false}
        />
        <span className='form__switcher-text'>Короткометражки</span>
      </div>
    </form>
  );
}

export default FormSearch;
