import { useAppDispatch } from 'app/store';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { maxDate } from 'utils/DateUtils';
import { useCustomerParams } from '../Page';
import Filter from './Filter';
import { reset } from './reducer';
import Table from './Table';

const BetListPage = () => {
  const { custId, roleId, username } = useCustomerParams();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const fromDate = searchParams.get('fromDate') || '';
  const toDate = searchParams.get('toDate') || '';

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch, custId, roleId, username]);

  return (
    <div className="bet-list-page">
      <Filter maxDate={maxDate} />
      <Spinner color="primary" />
    </div>
  );
};

export default BetListPage;
