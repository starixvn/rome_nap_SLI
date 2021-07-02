import { useAppDispatch } from 'app/store';
import ReportFilter from 'components/report-filter/ReportFilter';
import moment, { Moment } from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { formatDate } from 'utils/DateUtils';
import { excel, query } from './reducer';
import { Container } from 'reactstrap';

type Props = {
  minDate: Moment;
  maxDate: Moment;
};

const Filter = ({ minDate, maxDate }: Props) => {
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
    await excel(excelPayload);
  };

  return (
    <Container fluid className="filter">
      <ReportFilter
        minDate={minDate}
        maxDate={maxDate}
        fromDate={moment(fromDate)}
        toDate={moment(toDate)}
        onQuery={handleQuery}
        onExcel={handleExcel}
      />
    </Container>
  );
};

export default Filter;
