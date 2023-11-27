import { useState, useEffect } from 'react';
import {
  INPUT_NAMES,
  TYPE_OF_INPUTS,
  MESSAGE,
  REGEX_EMAIL,
  REGEX_NAME,
} from '../utils/constants';

export function useValidate(inputs) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setValid] = useState({});
  const [isFormValid, setFormValid] = useState(false);

  useEffect(() => {
    if (inputs) {
      setErrors({});
      setValid({});
      setValues({});
      inputs.forEach((input) => {
        setValid({ ...isValid, [input.name]: false });
      });
    }
  }, [inputs]);

  const handleChange = (evt) => {
    const { name, value, type } = evt.target;
    const { valid } = evt.target.validity;

    if (name === INPUT_NAMES.emailInput && !REGEX_EMAIL.test(value)) {
      setValid((isValid) => ({ ...isValid, [name]: false }));
      setErrors((errors) => ({ ...errors, [name]: MESSAGE.noEmail }));
    } else if (name === INPUT_NAMES.nameInput && !REGEX_NAME.test(value)) {
      setValid((isValid) => ({ ...isValid, [name]: false }));
      setErrors((errors) => ({ ...errors, name: MESSAGE.noName }));
    } else if (type === TYPE_OF_INPUTS.checkbox) {
      setValid((isValid) => ({ ...isValid }));
    } else {
      setErrors({ ...errors, [name]: evt.target.validationMessage });
      setValid((isValid) => ({ ...isValid, [name]: valid }));
    }
    setValues({ ...values, [name]: value });
  };
  useEffect(() => {
    if (!Object.values(isValid).includes(false)) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [isValid]);

  return {
    values,
    handleChange,
    errors,
    isValid,
    isFormValid,
    setValues,
    setValid,
    setFormValid,
  };
}
