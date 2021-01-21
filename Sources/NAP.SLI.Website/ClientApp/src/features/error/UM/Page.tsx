import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RouteLinks } from '../../../common/utils/RouteUtils';

const UMPage = () => {
  const history = useHistory();
  const { from, to, isUnderMaintenanceTime } = useSelector(
    (state: AppState) => state.um,
  );

  useEffect(() => {
    if (!isUnderMaintenanceTime) {
      history.push(RouteLinks.HOME);
    }
  });

  return (
    <h1>
      Under maintenance from {from} to {to}
    </h1>
  );
};

export default UMPage;
