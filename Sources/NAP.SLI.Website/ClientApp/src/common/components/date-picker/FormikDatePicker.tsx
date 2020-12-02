// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import DatePicker from './DatePicker';

const propTypes = {
  onChange: PropTypes.func
};

const FormikDatePicker = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  const { onChange } = props;

  return (
    <DatePicker
      {...field}
      {...props}
      selected={field.value}
      onChange={(value: any) => {
        setFieldValue(field.name, value);
        onChange && onChange(value);
      }}
    />
  );
}

FormikDatePicker.propTypes = propTypes;
export default FormikDatePicker;