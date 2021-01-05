import React from 'react';
import { useField, useFormikContext } from 'formik';
import Select from './Select';

type Props<T> = {
  name: string;
  options: Array<SelectOption<T>>;
  invalid?: boolean;
};

const FormikSelect: React.FC<Props<any>> = props => {
  const { invalid, options } = props;
  const { setFieldValue } = useFormikContext();
  const [fields] = useField(props.name);

  return <Select
    {...fields}
    options={options}
    onChange={selectedOption => {
      setFieldValue(fields.name, selectedOption.value);
    }}
    inputProps={{
      className: 'form-control' + (invalid ? ' is-invalid' : '')
    }} />;
};

export default FormikSelect;