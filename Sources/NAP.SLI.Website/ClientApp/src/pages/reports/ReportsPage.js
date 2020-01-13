import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../reducers/Counter';

const ReportsPage = (props) => (
  <div>
    <h1>Counter</h1>

    <p>This is a simple example of a React component.</p>

    <p>Current count: <strong>{props.count}</strong></p>

    <button className="btn btn-primary" onClick={props.increment}>Increment</button>
  </div>
);

ReportsPage.propTypes = {
  count: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired
}

const connectedReportsPage = connect(
  state => state.counter,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(ReportsPage);

export { connectedReportsPage as ReportsPage };
