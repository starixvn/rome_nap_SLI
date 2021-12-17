import { useAppDispatch } from 'app/store';
import ReportFilter from 'components/report-filter/ReportFilter';
import moment, { Moment } from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import { formatDate, maxDate, stringDateToMoment } from 'utils/DateUtils';
import { excel, query } from './reducer';

const Filter = () => {
  const dispatch = useAppDispatch();

  const { queryCustomer, queryArg } = useSelector(
    (state: AppState) => state.matchWinLossDetail,
  );

  const { fromDate, toDate } = queryArg;
  if (!queryCustomer) {
    return <></>;
  }

  const { custId, roleId, username } = queryCustomer;

  const handleQuery = async (fromDate: Moment, toDate: Moment) => {
    const queryPayload = {
      custId,
      roleId,
      fromDate: formatDate(fromDate),
      toDate: formatDate(toDate),
    };
    await dispatch(query(queryPayload));
  };

  const handleExcel = async () => {
    const excelPayload = {
      custId,
      roleId,
      username,
      fromDate,
      toDate,
    };
    await dispatch(excel(excelPayload));
  };

  return (
    <Container fluid className="filter">
      <ReportFilter
        minDate={moment(window.configuration.balanceUpDay)}
        maxDate={maxDate}
        fromDate={stringDateToMoment(fromDate)}
        toDate={stringDateToMoment(toDate)}
        onQuery={handleQuery}
        onExcel={handleExcel}
      />
    </Container>
  );
};

export default Filter;
