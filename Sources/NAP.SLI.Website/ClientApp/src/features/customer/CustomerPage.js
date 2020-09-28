import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CustomerPage = (customer) => {
    return (
        <div>{customer.Name}</div>
    );
};

CustomerPage.propTypes = {
    customer: PropTypes.object,
};

const connectedCustomerPage = connect(
    state => state.customerPage
)(CustomerPage);

export {connectedCustomerPage as CustomerPage};