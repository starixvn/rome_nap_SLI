import React from 'react';
import { useField, useFormikContext } from 'formik';
import MonthPicker from './MonthPicker';

const FormikMonthPicker = (props: any) => {
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

export default FormikMonthPicker;