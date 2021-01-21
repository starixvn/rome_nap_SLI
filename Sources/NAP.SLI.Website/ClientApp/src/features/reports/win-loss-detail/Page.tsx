import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import NormalFilter from './NormalFilter';
import HistoryFilter from './HistoryFilter';
import { minDate, maxDate } from '../../../common/utils/DateUtils';
import { useSelector, useDispatch } from 'react-redux';
import {
  getDownlineLevel,
  getLevelName,
} from '../../../common/utils/CustomerLevelUtils';
import Table from './Table';
import { selectCustomer } from './reducer';
import { RouteLinks } from '../../../common/utils/RouteUtils';
import Pagination from '../../../common/components/pagination/Component';
import { query } from './reducer';
import { PageSizes } from '../../../common/utils/ReportUtils';

const WinLossDetailPage = () => {
  const history = useHistory();
  const location = useLocation<Customer>();
  const dispatch = useDispatch();
  const {
    isHistory,
    data,
    customer,
    uplineCustomers,
    pageIndex,
    pageSize,
    fromDate,
    toDate,
  } = useSelector((state: AppState) => state.winLossDetail);

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

  if (!customer) {
    return <></>;
  }

  const handlePageChange = (
    pageIndex: number,
    pageSize: number,
    callback: Func,
  ) => {
    const { custId, roleId } = customer;
    dispatch(
      query(
        {
          isHistory,
          custId,
          roleId,
          fromDate,
          toDate,
          pageIndex,
          pageSize,
        },
        callback,
      ),
    );
  };

  return (
    <div className="win-loss-detail-page">
      <div className="page-title">
        <span>
          {getLevelName(getDownlineLevel(customer.roleId)) + ' Win Loss Detail'}{' '}
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
          <BreadcrumbItem active>{customer.username}</BreadcrumbItem>
        </Breadcrumb>
        <span>)</span>
      </div>
      {!isHistory ? (
        <NormalFilter minDate={minDate} maxDate={maxDate} />
      ) : (
        <HistoryFilter minDate={minDate} maxDate={maxDate} />
      )}
      {data && (
        <>
          <Table />
          {data.totalRecords > 0 && (
            <Pagination
              pageIndex={pageIndex}
              pageSize={pageSize}
              pageSizes={PageSizes}
              total={data.totalRecords}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default WinLossDetailPage;
