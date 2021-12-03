import React from 'react';
import { Spinner } from 'reactstrap';
import './GlobalSpinner.scss';

const GlobalSpinner = () => {
  return (
    <div className="global-spinner">
      <Spinner color="primary" />
    </div>
  );
};

export default GlobalSpinner;
