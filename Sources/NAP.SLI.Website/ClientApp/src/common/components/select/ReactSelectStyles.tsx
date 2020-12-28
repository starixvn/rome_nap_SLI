export const selectStyles = {
  control: (provided: any) => ({
    ...provided,
    minHeight: 'inherit',
    width: '50px'
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: '0 4px'
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    margin: '4px 0'
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    padding: '3px'
  })
};
