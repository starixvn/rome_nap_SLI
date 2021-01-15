import React, { useState, useEffect } from 'react';
import { Input, InputProps } from 'reactstrap';

type Props<T> = {
  options: Array<SelectOption<T>>;
  value?: T;
  onChange: (selectedOption: SelectOption<T>) => void;
  inputProps?: InputProps;
};

const Select = function _<T extends InputValue>(props: Props<T>) {
  const { options, onChange, value, inputProps } = props;
  const [_value, setValue] = useState(value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value, options]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let selectedOptions = options.filter(
      (option) => option.value?.toString() === event.target.value,
    );
    if (selectedOptions.length === 0) {
      selectedOptions = options.filter((option) => option.value === undefined);
    }

    const selectedOption = selectedOptions[0];
    setValue(selectedOption.value);
    onChange(selectedOption);
  };

  return (
    <Input
      type="select"
      {...inputProps}
      value={_value}
      onChange={(event) => handleChange(event)}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </Input>
  );
};

export default Select;
