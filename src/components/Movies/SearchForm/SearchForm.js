import Form from '../../Main/Form/Form';
import Input from '../../Main/Form/Input/Input';
import { searchForm } from '../../../utils/data-list';
import './SearchForm.css';
import { useState } from 'react';

const SearchForm = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (evt) => {
    setSearchValue(evt.target.value);
  };

  const { name, buttonText, validate, inputs } = searchForm;

  return (
    <Form validate={validate} name={name} buttonText={buttonText}>
      {inputs.map((input) => (
        <Input
          key={input.name}
          value={searchValue}
          input={input}
          onChange={handleChange}
        />
      ))}
    </Form>
  );
};

export default SearchForm;
