import React, { useState, useEffect } from 'react';
import { Input } from 'reactstrap';

type Props = {
  value: any,
  options: any[],
  className?: string,
  title?: string,
  onChange: SingleFunc
};

const Select = (props: Props) => {
  const { options, onChange, className, title } = props;
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value, options]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = options.filter(option => option.value == event.target.value)[0];
    setValue(selectedValue);
    onChange(selectedValue);
  };

  return (
    <Input type="select" title={title} className={className} value={value && value.value} onChange={(event) => handleSelectChange(event)}>
      {options.map((option, index) =>
        <option key={index} value={option.value}>{option.label}</option>
      )}
    </Input>
  );
};

export default Select;