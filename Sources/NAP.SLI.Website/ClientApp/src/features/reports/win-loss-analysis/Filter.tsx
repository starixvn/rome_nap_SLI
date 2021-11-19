import React from 'react';
import { useAppDispatch } from 'app/store';
import ReportFilter from 'components/report-filter/ReportFilter';
import { Moment } from 'moment';
import { useSelector } from 'react-redux';
import { Container, FormGroup, Input, Label } from 'reactstrap';
import { formatDate, stringDateToMoment } from 'utils/DateUtils';
import {
  excel,
  getReportName,
  query,
  ReportType,
  setReportType,
} from './reducer';

type Props = {
  maxDate: Moment;
};

const Filter = ({ maxDate }: Props) => {
  const dispatch = useAppDispatch();

  const { queryCustomer, queryArg, isQuerying } = useSelector(
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
        customKey={reportType}
        maxDate={maxDate}
        fromDate={stringDateToMoment(fromDate)}
        toDate={stringDateToMoment(toDate)}
        onQuery={handleQuery}
        onExcel={handleExcel}
      />
      <div>
        <span className="mr-4">Report By</span>
        {reportTypes.map((type, index) => (
          <FormGroup check inline key={`option_${index}`}>
            <Input
              id={`option_${index}`}
              checked={type === reportType}
              onChange={() => dispatch(setReportType(type))}
              name="radioReportType"
              type="radio"
              disabled={isQuerying}
            />
            <Label for={`option_${index}`} check>
              {getReportName(type)}
            </Label>
          </FormGroup>
        ))}
      </div>
    </Container>
  );
};

export default Filter;
