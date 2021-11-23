import './MonthPicker.scss';
import React, { useState, useEffect } from 'react';
import Datetime, { DatetimepickerProps } from 'react-datetime';
import Icon from '@mdi/react';
import { mdiArrowLeftBold, mdiArrowRightBold } from '@mdi/js';
import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputProps,
} from 'reactstrap';
import moment, { Moment } from 'moment';
import { maxDate, minDate } from 'utils/DateUtils';

const defaultProps = {
  minDate,
  maxDate,
};

type Props = DatetimepickerProps & {
  minDate?: Moment;
  maxDate?: Moment;
  disabled: boolean;
};

const MonthPicker = (props: Props) => {
  const { minDate, maxDate, disabled } = props;
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const renderInput = (props: InputProps, openCalendar: Function) => {
    const firstDayOfNextMonth = moment(value).startOf('month').add(1, 'months');
    const lastDayOfPreviousMonth = moment(value)
      .endOf('month')
      .subtract(1, 'months');
    const isAllowPreviousMonth =
      !props.disabled && lastDayOfPreviousMonth.isAfter(minDate);
    const isAllowNextMonth =
      !props.disabled && firstDayOfNextMonth.isBefore(maxDate);

    return (
      <InputGroup className="month-picker">
        <InputGroupAddon
          addonType="prepend"
          {...(isAllowPreviousMonth && {
            onClick: () => handleOnChange(moment(value).subtract(1, 'months')),
          })}
        >
          <InputGroupText>
            <Icon path={mdiArrowLeftBold} />
          </InputGroupText>
        </InputGroupAddon>
        <div {...(!props.disabled && { onClick: () => openCalendar() })}>
          <Input readOnly {...props} />
        </div>
        <InputGroupAddon
          addonType="append"
          {...(isAllowNextMonth && {
            onClick: () => handleOnChange(moment(value).add(1, 'months')),
          })}
        >
          <InputGroupText>
            <Icon path={mdiArrowRightBold} />
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    );
  };

  const inputProps = {
    disabled,
  };

  const handleOnChange = (value: Moment | string) => {
    setValue(value);
    props.onChange && props.onChange(value);
  };

  const isValidDate = (current: Moment) => {
    return current.isSameOrAfter(minDate) && current.isSameOrBefore(maxDate);
  };

  return (
    <Datetime
      isValidDate={isValidDate}
      value={value}
      dateFormat="MMM - YYYY"
      onChange={handleOnChange}
      closeOnSelect={true}
      timeFormat={false}
      inputProps={inputProps}
      renderInput={renderInput}
    />
  );
};

MonthPicker.defaultProps = defaultProps;
export default MonthPicker;
