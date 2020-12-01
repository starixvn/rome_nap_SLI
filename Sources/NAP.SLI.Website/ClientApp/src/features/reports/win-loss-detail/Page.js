import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import NormalFilter from './NormalFilter';
import HistoryFilter from './HistoryFilter';
import { minDate, maxDate } from '../../../common/utils/DateUtils';
import { useSelector, useDispatch } from 'react-redux';
import { getDownlineLevel, getLevelName } from '../../../common/utils/CustomerLevelUtils';
import Table from './Table';
import { Modes, selectCustomer } from './reducer';

const propTypes = {
  location: PropTypes.object.isRequired
};

const MasterWinLossDetailPage = ({ location }) => {
  const dispatch = useDispatch();
  const state = location.state || {};
  const { custId, roleId, username } = state;
  const { mode, data, customer, uplineCustomers } = useSelector(state => state.winLossDetail);

  useEffect(() => {
    dispatch(selectCustomer({
      customer: {
        custId,
        roleId,
        username
      },
      isReset: true
    }));
  }, [location]);

  if (!customer) {
    return <></>;
  }

  return (
    <div className="win-loss-detail-page">
      <div className="page-title">
        <span>{getLevelName(getDownlineLevel(customer.roleId)) + ' Win Loss Detail'} (</span>
        <Breadcrumb>
          {uplineCustomers && uplineCustomers.map((c, index) =>
            <BreadcrumbItem key={index}>
              <span className="text-link" onClick={() => dispatch(selectCustomer({ customer: c }))}>{c.username}</span>
            </BreadcrumbItem>
          )}
          <BreadcrumbItem active>{customer.username}</BreadcrumbItem>
        </Breadcrumb>
        <span>)</span>
      </div>
      {mode === Modes.Normal
        ? <NormalFilter minDate={minDate} maxDate={maxDate} />
        : <HistoryFilter minDate={minDate} maxDate={maxDate} />}
      {data && <Table />}
    </div>
  );
}

MasterWinLossDetailPage.propTypes = propTypes;
export default MasterWinLossDetailPage;