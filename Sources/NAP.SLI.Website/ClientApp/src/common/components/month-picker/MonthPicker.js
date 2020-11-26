import './MonthPicker.scss';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import Icon from '@mdi/react';
import { mdiArrowLeftBold, mdiArrowRightBold } from '@mdi/js';
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { minDate, maxDate } from '../../utils/DateUtils';
import moment from 'moment';

const propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  minValue: PropTypes.object,
  maxValue: PropTypes.object
};

const defaultProps = {
  minValue: minDate,
  maxValue: maxDate
};

const MonthPicker = (props) => {
  const { minValue, maxValue } = props;
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const renderInput = (props, openCalendar) => {
    return (
      <InputGroup className="month-picker">
        <InputGroupAddon addonType="prepend" onClick={() => handleOnChange(moment(value).subtract(1, 'months'))}>
          <InputGroupText>
            <Icon path={mdiArrowLeftBold} />
          </InputGroupText>
        </InputGroupAddon>
        <div onClick={openCalendar}><Input {...props} /></div>
        <InputGroupAddon addonType="append" onClick={() => handleOnChange(moment(value).add(1, 'months'))}>
          <InputGroupText>
            <Icon path={mdiArrowRightBold} />
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    );
  };

  const inputProps = {
    disabled: true
  };

  const handleOnChange = (value) => {
    setValue(value);
    props.onChange && props.onChange(value);
  };

  const isValidDate = (current) => {
    return current.isSameOrAfter(minValue) && current.isSameOrBefore(maxValue);
  };

  return <Datetime isValidDate={isValidDate} value={value} dateFormat="MMM - YYYY" onChange={handleOnChange} closeOnSelect={true} timeFormat={false} inputProps={inputProps} renderInput={renderInput} />;
};

MonthPicker.propTypes = propTypes;
MonthPicker.defaultProps = defaultProps;
export default MonthPicker;