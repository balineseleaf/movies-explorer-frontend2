import FormSearch from '../../Main/Form/FormSearch';
import { searchForm } from '../../../utils/data-list';
import './SearchForm.css';

const SearchForm = () => {
  const { name } = searchForm;

  return <FormSearch nameForm={name}></FormSearch>;
};

export default SearchForm;
