import { useAppDispatch } from 'app/store';
import ReportFilter from 'components/report-filter/ReportFilter';
import { Moment } from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import { formatDate, stringDateToMoment } from 'utils/DateUtils';
import { excel, query } from './reducer';

type Props = {
  maxDate: Moment;
};

const Filter = ({ maxDate }: Props) => {
  const dispatch = useAppDispatch();
  const { queryCustomer, queryArg } = useSelector(
    (state: AppState) => state.betList,
  );

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

  if (!queryCustomer) {
    return <></>;
  }
  const { custId, roleId, username } = queryCustomer;
  const { fromDate, toDate } = queryArg;

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
