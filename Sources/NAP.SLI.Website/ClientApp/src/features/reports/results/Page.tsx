import React from 'react';
import { useSelector } from 'react-redux';
import {
  HAPPY5_SPORT_TYPE,
  NUMBER_GAME_SPORT_TYPE,
} from '../../../utils/ConstantUtils';
import Filter from './Filter';
import Happy5Table from './happy5/Happy5Table';
import NumberGameTable from './numberGame/NumberGameTable';
import EmptyTable from './components/EmptyTable';
import './Page.scss';

const getTableBySportType = (sportType: number) => {
  switch (sportType) {
    case NUMBER_GAME_SPORT_TYPE:
      return <NumberGameTable />;
    case HAPPY5_SPORT_TYPE:
      return <Happy5Table />;
    default:
      return <EmptyTable />;
  }
};

const Page = () => {
  const { isSportLoading, isLeagueLoading, selectedSportType } = useSelector(
    (state: AppState) => state.results,
  );

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
