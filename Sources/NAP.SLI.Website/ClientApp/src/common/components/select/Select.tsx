// @ts-nocheck
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

const propTypes = {
  value: PropTypes.object,
  options: PropTypes.array.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func
};

const Select = (props) => {
  const { options, onChange, className, title } = props;
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value, options]);

  const handleSelectChange = event => {
    const selectedValue = options.filter(option => option.value == event.target.value)[0];
    setValue(selectedValue);
    onChange & onChange(selectedValue);
  };

  return (
    <Input type="select" title={title} className={className} value={value && value.value} onChange={(event) => handleSelectChange(event)}>
      {options.map((option, index) =>
        <option key={index} value={option.value}>{option.label}</option>
      )}
    </Input>
  );
};

Select.propTypes = propTypes;
export default Select;