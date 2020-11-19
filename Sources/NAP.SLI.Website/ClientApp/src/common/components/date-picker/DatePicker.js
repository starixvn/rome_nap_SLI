import './DatePicker.scss';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import Icon from '@mdi/react';
import { mdiCalendar } from '@mdi/js';
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

const propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func
};

const DatePicker = (props) => {
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    const renderInput = (props, openCalendar) => {
        return (
            <InputGroup className="date-picker" onClick={openCalendar}>
                <Input {...props} />
                <InputGroupAddon addonType="append">
                    <InputGroupText>
                        <Icon path={mdiCalendar} />
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
    }

    return <Datetime value={value} onChange={handleOnChange} closeOnSelect={true} timeFormat={false} inputProps={inputProps} renderInput={renderInput} />;
}

DatePicker.propTypes = propTypes;
export { DatePicker };