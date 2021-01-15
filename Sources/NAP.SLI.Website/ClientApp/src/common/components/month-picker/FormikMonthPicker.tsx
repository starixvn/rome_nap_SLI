import React from 'react';
import { useField, useFormikContext } from 'formik';
import MonthPicker from './MonthPicker';
import { Moment } from 'moment';
import { DatetimepickerProps } from 'react-datetime';

type Props = DatetimepickerProps & {
  name: string;
  minDate: Moment;
  maxDate: Moment;
  disabled: boolean;
};

const FormikMonthPicker: React.FC<Props> = (props: Props) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props.name);

  return (
    <MonthPicker
      {...field}
      {...props}
      onChange={(value) => {
        setFieldValue(field.name, value);
        props.onChange && props.onChange(value);
      }}
    />
  );
};

export default FormikMonthPicker;
