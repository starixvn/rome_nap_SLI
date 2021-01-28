import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import NormalFilter from './NormalFilter';
import HistoryFilter from './HistoryFilter';
import { minDate, maxDate } from 'utils/DateUtils';
import { useSelector } from 'react-redux';
import { getDownlineLevel, getLevelName } from 'utils/CustomerLevelUtils';
import Table from './Table';
import { selectCustomer } from './reducer';
import { RouteLinks } from 'utils/RouteUtils';
import Pagination from 'components/pagination/Component';
import { query } from './reducer';
import { PageSizes } from 'utils/ReportUtils';
import { useAppDispatch } from 'app/store';

const WinLossDetailPage = () => {
  const history = useHistory();
  const location = useLocation<Customer>();
  const dispatch = useAppDispatch();
  const { queryData, queryCustomer, uplineCustomers, queryArg } = useSelector(
    (state: AppState) => state.winLossDetail,
  );

  useEffect(() => {
    if (!location.state) {
      history.push(RouteLinks.HOME);
      return;
    }

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
  }, [location]);

  if (!queryCustomer) {
    return <></>;
  }

  const { isHistory, fromDate, toDate, pageIndex, pageSize } = queryArg;

  const handlePageChange = async (
    pageIndex: number,
    pageSize: number,
    callback: Func,
  ) => {
    const { custId, roleId } = queryCustomer;
    await dispatch(
      query({
        isHistory,
        custId,
        roleId,
        fromDate,
        toDate,
        pageIndex,
        pageSize,
      }),
    );
    callback();
  };

  return (
    <div className="win-loss-detail-page">
      <div className="page-title">
        <span>
          {getLevelName(getDownlineLevel(queryCustomer.roleId)) +
            ' Win Loss Detail'}{' '}
          (
        </span>
        <Breadcrumb>
          {uplineCustomers &&
            uplineCustomers.map((c, index) => (
              <BreadcrumbItem key={index}>
                <span
                  className="text-link"
                  onClick={() =>
                    dispatch(selectCustomer({ customer: c, isReset: false }))
                  }
                >
                  {c.username}
                </span>
              </BreadcrumbItem>
            ))}
          <BreadcrumbItem active>{queryCustomer.username}</BreadcrumbItem>
        </Breadcrumb>
        <span>)</span>
      </div>
      {!isHistory ? (
        <NormalFilter minDate={minDate} maxDate={maxDate} />
      ) : (
        <HistoryFilter minDate={minDate} maxDate={maxDate} />
      )}
      {queryData && (
        <>
          <Table />
          {queryData.totalRecords > 0 && (
            <Pagination
              pageIndex={pageIndex}
              pageSize={pageSize}
              pageSizes={PageSizes}
              total={queryData.totalRecords}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default WinLossDetailPage;
