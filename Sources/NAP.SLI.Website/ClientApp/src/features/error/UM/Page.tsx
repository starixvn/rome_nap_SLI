import { useAppDispatch } from 'app/store';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { checkUM } from './reducer';

const delay = 60;

const UMPage = () => {
  const dispatch = useAppDispatch();
  const { from, to, isUnderMaintenanceTime } = useSelector(
    (state: AppState) => state.um,
  );
  let timeout: NodeJS.Timeout | undefined;
  let promise: AppPromise | undefined;

  const handleCheckUM = () => {
    promise = dispatch(checkUM());
    promise.finally(() => {
      timeout = setTimeout(() => handleCheckUM(), delay * 1000);
    });
  };

  useEffect(() => {
    if (isUnderMaintenanceTime) {
      handleCheckUM();
    }

    return () => {
      if (promise) {
        promise.abort;
      }

      if (timeout) {
        clearTimeout(timeout);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUnderMaintenanceTime]);

  if (isUnderMaintenanceTime) {
    return (
      <h1>
        Under maintenance from {from} to {to}
      </h1>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default UMPage;
