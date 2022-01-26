import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SportTypes } from '../../../utils/ConstantUtils';
import Happy5Table from './happy5/Table';
import NumberGameTable from './number-game/Table';
import EmptyTable from './components/EmptyTable';
import './Page.scss';
import { useAppDispatch } from 'app/store';
import { queryResultsByMatch, reset } from './reducer';
import GlobalSpinner from 'components/spinner/GlobalSpinner';

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

const Modal = ({
  sportType,
  matchId,
}: {
  sportType: number;
  matchId: number;
}) => {
  const { isResultLoading, sportType: selectedSportType } = useSelector(
    (state: AppState) => state.results,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      queryResultsByMatch({
        sportType,
        matchId,
      }),
    );

    return () => {
      dispatch(reset());
    };
  }, [dispatch, matchId, sportType]);

  return (
    <div className="result-page">
      {isResultLoading ? (
        <GlobalSpinner />
      ) : (
        getTableBySportType(selectedSportType)
      )}
    </div>
  );
};

export default Modal;
