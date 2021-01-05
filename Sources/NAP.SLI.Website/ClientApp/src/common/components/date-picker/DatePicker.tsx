import './DatePicker.scss';
import React, { useState, useEffect } from 'react';
import Datetime, { DatetimepickerProps } from 'react-datetime';
import Icon from '@mdi/react';
import { mdiCalendar } from '@mdi/js';
import { Input, InputGroup, InputGroupAddon, InputGroupText, InputProps } from 'reactstrap';
import { Moment } from 'moment';
import { maxDate, minDate } from '../../utils/DateUtils';

type Props = DatetimepickerProps & {
  minDate: Moment;
  maxDate: Moment;
  disabled: boolean;
};

const defaultProps = {
  minDate,
  maxDate
};

const DatePicker: React.FC<Props> = (props) => {
  const [value, setValue] = useState(props.value);
  const { minDate, maxDate, disabled } = props;

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const renderInput = (props: InputProps, openCalendar: Function) => {
    return (
      <InputGroup className="date-picker" {...(!props.disabled && { onClick: () => openCalendar() })}>
        <Input readOnly {...props} />
        <InputGroupAddon addonType="append">
          <InputGroupText>
            <Icon path={mdiCalendar} />
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    );
  };

  const handleOnChange = (value: Moment | string) => {
    setValue(value);
    props.onChange && props.onChange(value);
  };

  const isValidDate = (current: Moment) => {
    return current.isSameOrAfter(minDate) && current.isSameOrBefore(maxDate);
  };

  const inputProps = {
    disabled
  };

  return <Datetime
    isValidDate={isValidDate}
    value={value}
    onChange={handleOnChange}
    closeOnSelect={true}
    timeFormat={false}
    inputProps={inputProps}
    renderInput={renderInput} />;
};

DatePicker.defaultProps = defaultProps;
export default DatePicker;