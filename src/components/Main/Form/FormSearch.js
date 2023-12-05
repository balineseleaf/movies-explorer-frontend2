import './Form.css';
// import Preloader from '../../Preloader/Preloader';
import '../../Movies/SearchForm/SearchForm.css';
import { deviceSettings, searchForm } from '../../../utils/data-list';

function FormSearch({
  isLoading,
  onSubmitSearch,
  isSavedMoviesPage,
  valueSearch,
  setValueSearch,
  searchStatus,
  setMaxShowMovies,
  device,
  isErrorShow,
  isFormActivated,
}) {
  // console.log(valueSearch); // '' and false
  const { name, buttonTextLoading, buttonTextDefault, validate, inputs } =
    searchForm;

  const handleChange = (evt) => {
    setValueSearch((valueSearch) => {
      return { ...valueSearch, [evt.target.name]: evt.target.value };
    });
  };

  const handleChangeCheckbox = (evt) => {
    setValueSearch((valueSearch) => {
      return { ...valueSearch, [evt.target.name]: evt.target.checked };
    });

    if (!isSavedMoviesPage && searchStatus.isFirstSearch) {
      return;
    }
    onSubmitSearch({ ...valueSearch, [evt.target.name]: evt.target.checked });
    !isSavedMoviesPage && setMaxShowMovies(deviceSettings[device].maxMovies);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmitSearch(valueSearch);
    !isSavedMoviesPage && setMaxShowMovies(deviceSettings[device].maxMovies);
  };

  return (
    <form
      validate={validate}
      name={name}
      buttonText={isLoading ? buttonTextLoading : buttonTextDefault}
      onSubmit={handleSubmit}
      isFormActivated={isFormActivated}
      searchStatus={searchStatus}
      isErrorShow={isErrorShow}
      isFormValid={valueSearch.search.length !== 0}
    >
      <div className='form__wrapper'>
        <input
          className='form__input_type_search'
          placeholder='Фильм'
          type='search'
          name='search'
          value={valueSearch.name}
          handleChange={handleChange}
          required={true}
          autoFocus={true}
        />
        <button
          className={`form__button-save form__button-save_type_search`}
          type='submit'
        ></button>
      </div>
      <div className='form__switcher'>
        <input
          className='form__input_type_short'
          type='checkbox'
          placeholder='Короткометражки'
          name='short'
          required={false}
          handleChange={handleChangeCheckbox}
          value={valueSearch.name}
        />
        <span className='form__switcher-text'>Короткометражки</span>
      </div>
    </form>
  );
}

export default FormSearch;
