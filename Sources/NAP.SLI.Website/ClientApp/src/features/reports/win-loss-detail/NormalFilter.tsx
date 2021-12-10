import { useAppDispatch } from 'app/store';
import ReportFilter from 'components/report-filter/ReportFilter';
import { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import {
  formatDate,
  getToday,
  maxDate,
  stringDateToMoment,
} from 'utils/DateUtils';
import { excel, query, toggleMode } from './reducer';

const NormalFilter = () => {
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

  const minDate = getToday().subtract(3, 'months').startOf('month');

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
      <div>
        You can view the report data from {formatDate(minDate)}. For more
        historic data, please click to{' '}
        <span className="text-link" onClick={() => dispatch(toggleMode())}>
          View History Report
        </span>
      </div>
    </Container>
  );
};

export default NormalFilter;
