export const selectStyles = {
  control: (provided: KeyValueObject) => ({
    ...provided,
    minHeight: 'inherit',
    width: '50px',
  }),
  valueContainer: (provided: KeyValueObject) => ({
    ...provided,
    padding: '0 4px',
  }),
  indicatorSeparator: (provided: KeyValueObject) => ({
    ...provided,
    margin: '4px 0',
  }),
  dropdownIndicator: (provided: KeyValueObject) => ({
    ...provided,
    padding: '3px',
  }),
};
