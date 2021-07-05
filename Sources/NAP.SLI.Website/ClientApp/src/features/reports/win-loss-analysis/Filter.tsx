import { useAppDispatch } from 'app/store';
import ReportFilter from 'components/report-filter/ReportFilter';
import { Moment } from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonGroup, Container } from 'reactstrap';
import { formatDate, stringDateToMoment } from 'utils/DateUtils';
import {
  excel,
  getReportName,
  query,
  ReportType,
  setReportType,
} from './reducer';

type Props = {
  minDate: Moment;
  maxDate: Moment;
};

const Filter = ({ minDate, maxDate }: Props) => {
  const dispatch = useAppDispatch();

  const { queryCustomer, queryArg } = useSelector(
    (state: AppState) => state.winLossAnalysis,
  );

  if (!queryCustomer) {
    return <></>;
  }
  const { custId, roleId, username } = queryCustomer;
  const { reportType, fromDate, toDate } = queryArg;

  const handleQuery = async (fromDate: Moment, toDate: Moment) => {
    const queryPayload = {
      reportType,
      custId,
      roleId,
      fromDate: formatDate(fromDate),
      toDate: formatDate(toDate),
    };
    await dispatch(query(queryPayload));
  };

  const handleExcel = async () => {
    const excelPayload = {
      reportType,
      custId,
      roleId,
      username,
      fromDate,
      toDate,
    };
    await excel(excelPayload);
  };

  const reportTypes = [ReportType.Daily, ReportType.Monthly, ReportType.Sport];
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
        <span>Report By</span>
        <ButtonGroup className="mx-4">
          {reportTypes.map((type, index) => (
            <Button
              key={index}
              color="primary"
              onClick={() => dispatch(setReportType(type))}
              active={reportType === type}
            >
              {getReportName(type)}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </Container>
  );
};

export default Filter;
