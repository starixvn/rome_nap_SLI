export const selectStyles = {
    control: (provided) => ({
        ...provided,
        minHeight: 'inherit',
        width: '50px'
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: '0 4px'
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        margin: '4px 0'
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        padding: '3px'
    })
};