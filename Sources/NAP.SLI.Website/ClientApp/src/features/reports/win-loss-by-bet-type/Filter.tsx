import React from 'react';
import { Moment } from 'moment';
import { useSelector } from 'react-redux';
import { formatDate, maxDate, stringDateToMoment } from 'utils/DateUtils';
import { excel, query } from './reducer';
import { useAppDispatch } from 'app/store';
import ReportFilter from 'components/report-filter/ReportFilter';
import { Container } from 'reactstrap';
import moment from 'moment';

const Filter = () => {
  const dispatch = useAppDispatch();

  const { queryCustomer, queryArg } = useSelector(
    (state: AppState) => state.winLossByBetType,
  );

  if (!queryCustomer) {
    return <></>;
  }
  const { custId, roleId, username } = queryCustomer;
  const { fromDate, toDate } = queryArg;

  const handleQuery = async (fromDate: Moment, toDate: Moment) => {
    const queryPayload = {
      custId,
      roleId,
      fromDate: formatDate(fromDate),
      toDate: formatDate(toDate),
    };
    await dispatch(query(queryPayload));
  };

  const minDate = moment(window.configuration.balanceUpDay);

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
        minDate={minDate}
        maxDate={maxDate}
        fromDate={stringDateToMoment(fromDate)}
        toDate={stringDateToMoment(toDate)}
        onQuery={handleQuery}
        onExcel={handleExcel}
      />
      <div>You can view the report data from {formatDate(minDate)}</div>
    </Container>
  );
};

export default Filter;
