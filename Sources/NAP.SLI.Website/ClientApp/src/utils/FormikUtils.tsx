import React from 'react';
import { useField, useFormikContext } from 'formik';
import { Moment } from 'moment';
import { DatetimepickerProps } from 'react-datetime';

type Props = DatetimepickerProps & {
  name: string;
  minDate: Moment;
  maxDate: Moment;
  disabled: boolean;
};

function getDisplayName<T>(WrappedComponent: React.FC<T>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export const withDatetime = (WrapperComponent: React.FC<Props>) => {
  const WithDatetime = (props: Props) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props.name);

    return (
      <WrapperComponent
        {...field}
        {...props}
        onChange={(value) => {
          setFieldValue(field.name, value);
          props.onChange && props.onChange(value);
        }}
      />
    );
  };
  WithDatetime.displayName = `WithDatetime(${getDisplayName(
    WrapperComponent,
  )})`;

  return WithDatetime;
};
