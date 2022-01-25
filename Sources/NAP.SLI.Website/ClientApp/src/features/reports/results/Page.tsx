import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SportTypes } from '../../../utils/ConstantUtils';
import Filter from './Filter';
import Happy5Table from './happy5/Table';
import NumberGameTable from './number-game/Table';
import EmptyTable from './components/EmptyTable';
import './Page.scss';
import { useAppDispatch } from 'app/store';
import { reset } from './reducer';

const getTableBySportType = (sportType: number) => {
  switch (sportType) {
    case SportTypes.NumberGame:
      return <NumberGameTable />;
    case SportTypes.Happy5:
      return <Happy5Table />;
    default:
      return <EmptyTable />;
  }
};

const Page = () => {
  const { isSportLoading, isLeagueLoading, selectedSportType } = useSelector(
    (state: AppState) => state.results,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const isLoading = isSportLoading || isLeagueLoading;

  return (
    <div className="result-page">
      <div className="page-title">Results</div>
      <Filter />
      {!isLoading && getTableBySportType(selectedSportType)}
    </div>
  );
};

export default Page;
