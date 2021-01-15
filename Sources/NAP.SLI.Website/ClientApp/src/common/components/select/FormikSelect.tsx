import React from 'react';
import { useField, useFormikContext } from 'formik';
import Select from './Select';

type Props<T> = {
  name: string;
  options: Array<SelectOption<T>>;
};

const FormikSelect: React.FC<Props<InputValue>> = ({
  options,
  ...props
}: Props<InputValue>) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  return (
    <Select
      {...field}
      options={options}
      onChange={(selectedOption) => {
        setFieldValue(field.name, selectedOption.value);
      }}
      inputProps={{
        className:
          'form-control' + (meta.touched && meta.error ? ' is-invalid' : ''),
      }}
    />
  );
};

export default FormikSelect;
