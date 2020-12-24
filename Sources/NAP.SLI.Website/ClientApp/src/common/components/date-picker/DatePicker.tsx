import './DatePicker.scss';
import React, { useState, useEffect } from 'react';
import Datetime from 'react-datetime';
import Icon from '@mdi/react';
import { mdiCalendar } from '@mdi/js';
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { minDate, maxDate } from '../../utils/DateUtils';

type Props = {
  value?: any,
  onChange?: any,
  disabled?: boolean,
  minValue: any,
  maxValue: any
};

const defaultProps: Props = {
  minValue: minDate,
  maxValue: maxDate
};

const DatePicker = (props: Props) => {
  const { minValue, maxValue } = props;
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const renderInput = (props: Props, openCalendar: any) => {
    return (
      <InputGroup className="date-picker" {...(!props.disabled && { onClick: openCalendar })}>
        <Input readOnly {...props} />
        <InputGroupAddon addonType="append">
          <InputGroupText>
            <Icon path={mdiCalendar} />
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    );
  };

  const inputProps = {
    disabled: props.disabled
  };

  const handleOnChange = (value: any) => {
    setValue(value);
    props.onChange && props.onChange(value);
  };

  const isValidDate = (current: any) => {
    return current.isSameOrAfter(minValue) && current.isSameOrBefore(maxValue);
  };

  return <Datetime isValidDate={isValidDate} value={value} onChange={handleOnChange} closeOnSelect={true} timeFormat={false} inputProps={inputProps} renderInput={renderInput} />;
};

DatePicker.defaultProps = defaultProps;
export default DatePicker;