import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UMPage = () => {
  const navigate = useNavigate();
  const { from, to, isUnderMaintenanceTime } = useSelector(
    (state: AppState) => state.um,
  );

  useEffect(() => {
    if (!isUnderMaintenanceTime) {
      navigate('/');
    }
  });

  return (
    <h1>
      Under maintenance from {from} to {to}
    </h1>
  );
};

export default UMPage;
