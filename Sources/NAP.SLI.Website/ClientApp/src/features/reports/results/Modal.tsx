import React from 'react';
import { useSelector } from 'react-redux';
import { SportTypes } from '../../../utils/ConstantUtils';
import Happy5Table from './happy5/Table';
import NumberGameTable from './number-game/Table';
import EmptyTable from './components/EmptyTable';
import './Page.scss';

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

type Props = {
  sportType: number;
  matchId: number;
};

const Modal = ({ sportType, matchId }: Props) => {
  const { isSportLoading, isLeagueLoading, selectedSportType } = useSelector(
    (state: AppState) => state.results,
  );

  const isLoading = isSportLoading || isLeagueLoading;

  return (
    <div className="result-page">
      {!isLoading && getTableBySportType(selectedSportType || sportType)}
    </div>
  );
};

export default Modal;
