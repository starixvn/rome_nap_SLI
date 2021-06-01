import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { useSelector } from 'react-redux';
import { getDownlineLevel, getLevelName } from 'utils/CustomerLevelUtils';
import { selectCustomer } from './reducer';
import { useAppDispatch } from 'app/store';

const Title = () => {
  const dispatch = useAppDispatch();
  const { queryCustomer, uplineCustomers } = useSelector(
    (state: AppState) => state.winLossDetail,
  );

  if (!queryCustomer) {
    return <></>;
  }

  return (
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
  );
};

export default Title;
