import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NormalFilter } from './NormalFilter';
import { HistoryFilter } from './HistoryFilter';

const propTypes = {
    location: PropTypes.object.isRequired
};

const Modes = {
    Normal: 1,
    History: 2
}

const MasterWinLossDetailPage = (props) => {
    const state = props.location.state || {};
    const { custId } = state;
    const [mode, setMode] = useState(Modes.Normal);

    const handleSubmit = (data) => {
        console.log(data);
    };

    const handleToggle = () => {
        if (mode === Modes.Normal) {
            setMode(Modes.History);
        } else {
            setMode(Modes.Normal);
        }
    }

    return (
        <div className="master-win-loss-detail-page">
            <div className="page-title">Master Win Loss Detail {custId}</div>
            {mode === Modes.Normal
                ? <NormalFilter submit={handleSubmit} toggle={handleToggle} />
                : <HistoryFilter submit={handleSubmit} toggle={handleToggle} />}
        </div>
    );
}

MasterWinLossDetailPage.propTypes = propTypes;

export { MasterWinLossDetailPage };