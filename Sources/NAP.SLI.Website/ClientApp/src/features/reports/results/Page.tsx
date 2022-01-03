import React from 'react';
import { useSelector } from 'react-redux';
import {
  HAPPY5_SPORT_TYPE,
  NUMBER_GAME_SPORT_TYPE,
} from '../../../utils/ConstantUtils';
import Filter from './Filter';
import Happy5Table from './happy5/Happy5Table';
import NumberGameTable from './numberGame/NumberGameTable';
import './Page.scss';

const getTableBySportType = (sportType: number) => {
  switch (sportType) {
    case NUMBER_GAME_SPORT_TYPE:
      return <NumberGameTable />;
    case HAPPY5_SPORT_TYPE:
      return <Happy5Table />;
  }
};

const ResultsPage = () => {
  const { sports, leagues, selectedSportType } = useSelector(
    (state: AppState) => state.results,
  );

  return (
    <div className="result-page">
      <div className="page-title">Results</div>
      <Filter />
      {sports.length > 0 &&
        leagues.length > 0 &&
        getTableBySportType(selectedSportType)}
    </div>
  );
};

export default ResultsPage;
