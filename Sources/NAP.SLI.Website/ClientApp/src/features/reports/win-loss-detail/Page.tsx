import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NormalFilter from './NormalFilter';
import HistoryFilter from './HistoryFilter';
import { minDate, maxDate, formatDate } from 'utils/DateUtils';
import { useSelector } from 'react-redux';
import Table from './Table';
import { excel, query, selectCustomer, toggleMode } from './reducer';
import { RouteLinks } from 'utils/RouteUtils';
import { useAppDispatch } from 'app/store';
import Title from './Title';
import ReportFilter, {
  FormikFilterValues,
} from 'components/report-filter/ReportFilter';
import { FormikHelpers } from 'formik';

const Page = () => {
  const history = useHistory();
  const location = useLocation<Customer>();
  const dispatch = useAppDispatch();
  const { queryCustomer, queryArg } = useSelector(
    (state: AppState) => state.winLossDetail,
  );

  useEffect(() => {
    if (location.state) {
      const { custId, roleId, username } = location.state;
      dispatch(
        selectCustomer({
          customer: {
            custId,
            roleId,
            username,
          },
          isReset: true,
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
  const { isHistory, fromDate, toDate, pageIndex, pageSize } = queryArg;

  const handleQuery = async (
    values: FormikFilterValues,
    { setSubmitting }: FormikHelpers<FormikFilterValues>,
  ) => {
    setSubmitting(true);
    const queryPayload = {
      isHistory,
      custId,
      roleId,
      fromDate: formatDate(values.fromDate),
      toDate: formatDate(values.toDate),
      pageIndex,
      pageSize,
    };
    await dispatch(query(queryPayload));
    setSubmitting(false);
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
    <div className="win-loss-detail-page">
      <Title />
      {isHistory ? (
        <HistoryFilter minDate={minDate} maxDate={maxDate} />
      ) : (
        // <NormalFilter minDate={minDate} maxDate={maxDate} />
        <ReportFilter
          minDate={minDate}
          maxDate={maxDate}
          queryArg={queryArg}
          queryCustomer={queryCustomer}
          onQuery={handleQuery}
          onExcel={handleExcel}
          component={
            <div>
              You can view the report data from 09/01/2019. For more historic
              data, please click to{' '}
              <span
                className="text-link"
                onClick={() => dispatch(toggleMode())}
              >
                View History Report
              </span>
            </div>
          }
        />
      )}
      <Table />
    </div>
  );
};

export default Page;
