import { useAppDispatch } from 'app/store';
import ReportFilter from 'components/report-filter/ReportFilter';
import { Moment } from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import { formatDate, stringDateToMoment } from 'utils/DateUtils';
import { excel, query, toggleMode } from './reducer';

type Props = {
  maxDate: Moment;
};

const NormalFilter = ({ maxDate }: Props) => {
  const dispatch = useAppDispatch();

  const { queryCustomer, queryArg } = useSelector(
    (state: AppState) => state.winLossDetail,
  );

  if (!queryCustomer) {
    return <></>;
  }

  const { custId, roleId, username } = queryCustomer;
  const { isHistory, fromDate, toDate, pageIndex, pageSize } = queryArg;

  const handleQuery = async (fromDate: Moment, toDate: Moment) => {
    const queryPayload = {
      isHistory,
      custId,
      roleId,
      fromDate: formatDate(fromDate),
      toDate: formatDate(toDate),
      pageIndex,
      pageSize,
    };
    await dispatch(query(queryPayload));
  };

  const handleExcel = async () => {
    const excelPayload = {
      isHistory,
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
      <div>
        You can view the report data from 09/01/2019. For more historic data,
        please click to{' '}
        <span className="text-link" onClick={() => dispatch(toggleMode())}>
          View History Report
        </span>
      </div>
    </Container>
  );
};

export default NormalFilter;
