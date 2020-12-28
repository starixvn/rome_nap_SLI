import React from 'react';
import { Field } from 'formik';

type Props = {
  name: string,
  options: any[],
  invalid?: boolean
}

const FormikSelect = (props: Props) => {

  return (
    <Field as="select" name={props.name} className={'form-control' + (props.invalid ? ' is-invalid' : '')}>
      {props.options.map((option, index) =>
        <option key={index} value={option.value}>{option.label}</option>
      )}
    </Field>
  );
};

export default FormikSelect;