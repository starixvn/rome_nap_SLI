import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  location: PropTypes.object.isRequired
};

type Props = {
  location: Location & {
    state: RootState
  }
}

const CustomerSettingPage = (props: Props) => {
  const { custId, roleId } = props.location.state;

  return (
    <div className="customer-setting-page">
      <div className="page-title">Customer Setting</div>
    </div>
  );
}

export default CustomerSettingPage;