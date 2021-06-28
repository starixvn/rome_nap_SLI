import { useAppDispatch } from 'app/store';
import ReportFilter, {
  FormikFilterValues,
} from 'components/report-filter/ReportFilter';
import { FormikHelpers } from 'formik';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { ButtonGroup, Button } from 'reactstrap';
import { minDate, maxDate, formatDate } from 'utils/DateUtils';
import { RouteLinks } from 'utils/RouteUtils';
import Filter from './Filter';
import {
  excel,
  getReportName,
  query,
  ReportType,
  selectCustomer,
  setReportType,
} from './reducer';
import Table from './Table';

const Page = () => {
  const history = useHistory();
  const location = useLocation<Customer>();
  const dispatch = useAppDispatch();
  const { queryCustomer, queryArg } = useSelector(
    (state: AppState) => state.winLossAnalysis,
  );

  useEffect(() => {
    if (location.state) {
      const { custId, roleId, username } = location.state;
      dispatch(
        selectCustomer({
          custId,
          roleId,
          username,
        }),
      );
    }
  }, [dispatch, location.state]);

  if (!location.state) {
    history.push(RouteLinks.HOME);
    return <></>;
  }

  if (!queryCustomer) {
    return <></>;
  }

  const { custId, roleId, username } = queryCustomer;
  const { reportType, fromDate, toDate } = queryArg;

  const handleQuery = async (
    values: FormikFilterValues,
    { setSubmitting }: FormikHelpers<FormikFilterValues>,
  ) => {
    setSubmitting(true);
    const queryPayload = {
      reportType,
      custId,
      roleId,
      fromDate: formatDate(values.fromDate),
      toDate: formatDate(values.toDate),
    };
    await dispatch(query(queryPayload));
    setSubmitting(false);
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
    <div className="win-loss-analysis-page">
      <div className="page-title">
        Win Loss Analysis ({location.state.username})
      </div>
      {/* <Filter minDate={minDate} maxDate={maxDate} /> */}
      <ReportFilter
        minDate={minDate}
        maxDate={maxDate}
        queryArg={queryArg}
        queryCustomer={queryCustomer}
        onQuery={handleQuery}
        onExcel={handleExcel}
        component={
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
        }
      />
      <Table />
    </div>
  );
};

export default Page;
