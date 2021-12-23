import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { useSelector } from 'react-redux';
import { getDownlineLevel, getLevelName } from 'utils/CustomerLevelUtils';
import { drillUp } from './reducer';
import { useAppDispatch } from 'app/store';

const Title = () => {
  const dispatch = useAppDispatch();
  const { customer, customers } = useSelector(
    (state: AppState) => state.winLossDetail,
  );

  if (!customer) {
    return <></>;
  }

  return (
    <div className="page-title">
      <span>
        {getLevelName(getDownlineLevel(customer.roleId)) + ' Win Loss Detail'} (
      </span>
      <Breadcrumb>
        {customers.map(({ username }, index) =>
          index === customers.length - 1 ? (
            <BreadcrumbItem key={index} active>
              {customer.username}
            </BreadcrumbItem>
          ) : (
            <BreadcrumbItem key={index}>
              <span
                className="text-link"
                onClick={() => dispatch(drillUp(index))}
              >
                {username}
              </span>
            </BreadcrumbItem>
          ),
        )}
      </Breadcrumb>
      <span>)</span>
    </div>
  );
};

export default Title;
