import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RouteLinks } from '../../../common/utils/RouteUtils';
import { RootState } from '../../../store';

const UMPage: React.FC = () => {
  const history = useHistory();
  const { umTime } = useSelector((state: RootState) => state.um);
  const { from, to, isUnderMaintenanceTime } = umTime;

  useEffect(() => {
    if (!isUnderMaintenanceTime) {
      history.push(RouteLinks.HOME);
    }
  });

  return (
    <h1>Under maintenance from {from} to {to}</h1>
  );
};

export default UMPage;