import { useAppDispatch } from 'app/store';
import ReportFilter from 'components/report-filter/ReportFilter';
import moment, { Moment } from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { formatDate } from 'utils/DateUtils';
import { excel, query, toggleMode } from './reducer';

type Props = {
  minDate: Moment;
  maxDate: Moment;
};

const NormalFilter = ({ minDate, maxDate }: Props) => {
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
    <ReportFilter
      minDate={minDate}
      maxDate={maxDate}
      fromDate={moment(fromDate)}
      toDate={moment(toDate)}
      onQuery={handleQuery}
      onExcel={handleExcel}
      component={
        <div>
          You can view the report data from 09/01/2019. For more historic data,
          please click to{' '}
          <span className="text-link" onClick={() => dispatch(toggleMode())}>
            View History Report
          </span>
        </div>
      }
    />
  );
};

export default NormalFilter;
