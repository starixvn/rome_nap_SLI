import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from './DatePicker';
import { DatetimepickerProps } from 'react-datetime';
import { Moment } from 'moment';

type Props = DatetimepickerProps & {
  name: string;
  minDate: Moment;
  maxDate: Moment;
  disabled: boolean;
  isReport: boolean;
};

const FormikDatePicker: React.FC<Props> = (props: Props) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props.name);

  return (
    <DatePicker
      {...field}
      {...props}
      onChange={(value) => {
        setFieldValue(field.name, value);
        props.onChange && props.onChange(value);
      }}
    />
  );
};

export default FormikDatePicker;
