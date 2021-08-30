import React from 'react';
import { Moment } from 'moment';
import { useSelector } from 'react-redux';
import { formatDate, stringDateToMoment } from 'utils/DateUtils';
import { excel, query } from './reducer';
import { useAppDispatch } from 'app/store';
import ReportFilter from 'components/report-filter/ReportFilter';
import { Container } from 'reactstrap';

type Props = {
  maxDate: Moment;
};

const Filter = ({ maxDate }: Props) => {
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

  const handleExcel = async () => {
    const excelPayload = {
      custId,
      roleId,
      username,
      fromDate,
      toDate,
    };
    await excel(excelPayload);
  };

  return (
    <Container fluid className="filter">
      <ReportFilter
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
