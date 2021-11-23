import { useAppDispatch } from 'app/store';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RouteLinks } from 'utils/RouteUtils';
import { query, reset } from './reducer';
import Table from './Table';

const Page = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { customer } = useSelector((state: AppState) => state.sidebar);

  useEffect(() => {
    if (!customer) {
      history.push(RouteLinks.HOME);
    } else {
      const { generalInformation, headline } = customer;
      dispatch(
        query({
          custId: generalInformation.custId,
          mRecommend: headline.masterId,
        }),
      );
    }

    return function cleanup() {
      dispatch(reset());
    };
  }, [customer, dispatch, history]);

  return <Table />;
};

export default Page;
