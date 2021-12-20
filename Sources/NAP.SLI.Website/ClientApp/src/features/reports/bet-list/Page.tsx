import { useAppDispatch } from 'app/store';
import React, { useEffect } from 'react';
import { Spinner } from 'reactstrap';
import { maxDate } from 'utils/DateUtils';
import { useCustomerParams } from 'features/reports';
import Filter from './Filter';
import { reset } from './reducer';
import Title from './Title';

const BetListPage = () => {
  const { custId, roleId, username } = useCustomerParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch, custId, roleId, username]);

  const handleExcel = async () => {
    // TODO:
  };

  return (
    <div className="bet-list-page">
      <Title
        content={`MEMBER BET LIST - ${username}`}
        handleExcel={handleExcel}
      />
      <Filter maxDate={maxDate} />
      <Spinner color="primary" />
    </div>
  );
};

export default BetListPage;
