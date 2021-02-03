import React from 'react';
import configureStore from 'redux-mock-store';
import CustomerPage from './Page';
import { Provider } from 'react-redux';
import { Action, DeepPartial, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { mount, ReactWrapper } from 'enzyme';
import moment from 'moment';

jest.mock('app/store');

const mockStore = configureStore<
  DeepPartial<AppState>,
  ThunkDispatch<DeepPartial<AppState>, unknown, Action<string>>
>([thunk]);

describe('CustomerPage', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderComponent = (store: any): ReactWrapper =>
    mount(
      <Provider store={store}>
        <CustomerPage />
      </Provider>,
    );

  it('no valid customer', () => {
    const store = mockStore({
      sidebar: {
        user: undefined,
      },
    });

    const component = renderComponent(store);

    expect(component).toMatchSnapshot();

    component.unmount();
  });

  it('exist customer', () => {
    const store = mockStore({
      sidebar: {
        user: {
          userName: '',
          firstName: '',
          lastName: '',
          custId: 1,
          closed: false,
          groupId: 1,
          creator: '',
          createdDate: moment().toString()
        },
      },
    });

    const component = renderComponent(store);

    expect(component).toMatchSnapshot();

    component.unmount();
  });
});