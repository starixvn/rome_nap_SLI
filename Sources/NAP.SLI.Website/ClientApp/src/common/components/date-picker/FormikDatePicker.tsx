import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from './DatePicker';

const FormikDatePicker = (props: any) => {
  const { setFieldValue } = useFormikContext();
  const [fields] = useField(props);
  const { onChange } = props;

  return (
    <DatePicker
      {...props}
      {...fields}
      selected={props.value}
      name={props.name}
      onChange={(value: any) => {
        setFieldValue(props.name, value);
        onChange && onChange(value);
      }}
    />
  );
}

export default FormikDatePicker;