// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  location: PropTypes.object.isRequired
};

const CustomerSettingPage = ({ location }) => {
  const { custid, roleid } = location.state;

  return (
    <div className="customer-setting-page">
      <div className="page-title">Customer Setting</div>
    </div>
  );
}

CustomerSettingPage.propTypes = propTypes;
export default CustomerSettingPage;