import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import MonthPicker from './MonthPicker';

const propTypes = {
  onChange: PropTypes.func
};

const FormikMonthPicker = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  const { onChange } = props;

  return (
    <MonthPicker
      {...field}
      {...props}
      selected={field.value}
      onChange={val => {
        setFieldValue(field.name, val);
        onChange && onChange(val);
      }}
    />
  );
}

FormikMonthPicker.propTypes = propTypes;
export default FormikMonthPicker;