// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

const propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  invalid: PropTypes.bool
};

const FormikSelect = ({ name, options, invalid }) => {

  return (
    <Field as="select" name={name} className={'form-control' + (invalid ? ' is-invalid' : '')}>
      {options.map((option, index) =>
        <option key={index} value={option.value}>{option.label}</option>
      )}
    </Field>
  );
};

FormikSelect.propTypes = propTypes;
export default FormikSelect;