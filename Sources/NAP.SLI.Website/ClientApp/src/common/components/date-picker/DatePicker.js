import './DatePicker.scss';
import React from 'react';
import Datetime from 'react-datetime';
import Icon from '@mdi/react';
import { mdiCalendar } from '@mdi/js';
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

const DatePicker = () => {
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

    return <Datetime closeOnSelect={true} timeFormat={false} inputProps={inputProps} renderInput={renderInput} />;
}

export { DatePicker };