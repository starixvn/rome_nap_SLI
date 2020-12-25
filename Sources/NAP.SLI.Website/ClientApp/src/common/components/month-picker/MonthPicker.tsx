import './MonthPicker.scss';
import React, { useState, useEffect } from 'react';
import Datetime, { DatetimepickerProps } from 'react-datetime';
import Icon from '@mdi/react';
import { mdiArrowLeftBold, mdiArrowRightBold } from '@mdi/js';
import { Input, InputGroup, InputGroupAddon, InputGroupText, InputProps } from 'reactstrap';
import moment, { Moment } from 'moment';

type CustomeMonthpickerProps = DatetimepickerProps & {
  minValue: Moment,
  maxValue: Moment,
  disabled: boolean
}

const MonthPicker = (props : CustomeMonthpickerProps) => {
  const { minValue, maxValue } = props;
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const renderInput = (props: InputProps, openCalendar: any) => {
    return (
      <InputGroup className="month-picker">
        <InputGroupAddon addonType="prepend" {...(!props.disabled && { onClick: () => handleOnChange(moment(value).subtract(1, 'months')) })}>
          <InputGroupText>
            <Icon path={mdiArrowLeftBold} />
          </InputGroupText>
        </InputGroupAddon>
        <div {...(!props.disabled && { onClick: openCalendar })}>
          <Input readOnly {...props} />
        </div>
        <InputGroupAddon addonType="append" {...(!props.disabled && { onClick: () => handleOnChange(moment(value).add(1, 'months')) })}>
          <InputGroupText>
            <Icon path={mdiArrowRightBold} />
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

  const isValidDate = (current: Moment) => {
    return current.isSameOrAfter(minValue) && current.isSameOrBefore(maxValue);
  };

  return <Datetime isValidDate={isValidDate} value={value} dateFormat="MMM - YYYY" onChange={handleOnChange} closeOnSelect={true} timeFormat={false} inputProps={inputProps} renderInput={renderInput} />;
};
export default MonthPicker;