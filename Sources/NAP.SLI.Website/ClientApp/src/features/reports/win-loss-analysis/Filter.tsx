import React from 'react';
import moment, { Moment } from 'moment';
import { useSelector } from 'react-redux';
import { formatDate } from 'utils/DateUtils';
import {
  excel,
  getReportName,
  query,
  ReportType,
  setReportType,
} from './reducer';
import { useAppDispatch } from 'app/store';
import ReportFilter from 'components/report-filter/ReportFilter';
import { ButtonGroup, Button } from 'reactstrap';
import { Container } from 'reactstrap';

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
        fromDate={moment(fromDate)}
        toDate={moment(toDate)}
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
