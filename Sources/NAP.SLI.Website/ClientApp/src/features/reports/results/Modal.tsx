import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SportTypes } from '../../../utils/ConstantUtils';
import Happy5Table from './happy5/Table';
import NumberGameTable from './number-game/Table';
import EmptyTable from './components/EmptyTable';
import './Page.scss';
import { useAppDispatch } from 'app/store';
import {
  queryResultsByMatch,
  reset,
  queryHappy5LinkedGameResult,
} from './reducer';
import GlobalSpinner from 'components/spinner/GlobalSpinner';
import { useCustomerParams } from '..';

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
  transId,
}: {
  sportType: number;
  matchId: number;
  transId: number;
}) => {
  const { isResultLoading, sportType: selectedSportType } = useSelector(
    (state: AppState) => state.results,
  );
  const { custId } = useCustomerParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (sportType === SportTypes.Happy5_Linked_Game) {
      dispatch(
        queryHappy5LinkedGameResult({
          transId,
          custId,
        }),
      );
    } else {
      dispatch(
        queryResultsByMatch({
          sportType,
          matchId,
        }),
      );
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, matchId, sportType, transId, custId]);

  const renderContent = () => {
    if (isResultLoading) {
      return <GlobalSpinner />;
    }

    if (selectedSportType === SportTypes.Happy5_Linked_Game) {
      return <iframe></iframe>;
    } else {
      return getTableBySportType(selectedSportType);
    }
  };

  return <div className="result-page">{renderContent()}</div>;
};

export default Modal;
