import React from 'react';
import configureStore from 'redux-mock-store';
import UserManagementPage from './Page';
import { Provider } from 'react-redux';
import { Action, DeepPartial, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { shallow, ShallowWrapper } from 'enzyme';
import moment from 'moment';

jest.mock('app/store');

const mockStore = configureStore<
  DeepPartial<AppState>,
  ThunkDispatch<DeepPartial<AppState>, unknown, Action<string>>
>([thunk]);

describe('UserManagementPage', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderComponent = (store: any): ShallowWrapper =>
    shallow(
      <Provider store={store}>
        <UserManagementPage />
      </Provider>,
    );

  it('render with no user', () => {

    const userManagement = {
      queryArg: {
        username: '',
        groupId: 0,
      },
      users: []
    };
    const store = mockStore({
      userManagement,
    });

    const component = renderComponent(store);

    expect(component).toMatchSnapshot();

    component.unmount();
  });

  it('render with users', () => {
    const u1 = {
      userName: '1',
      firstName: '1',
      lastName: '1',
      custId: 1,
      closed: false,
      groupId: 1,
      creator: '1',
      createdDate: moment().toString()
    };
    const u2 = {
      userName: '2',
      firstName: '2',
      lastName: '2',
      custId: 1,
      closed: false,
      groupId: 1,
      creator: '2',
      createdDate: moment().toString()
    };

    const userManagement = {
      queryArg: {
        username: '',
        groupId: 0,
      },
      users: [u1, u2]
    };

    const store = mockStore({
      userManagement,
    });

    const component = renderComponent(store);

    expect(component).toMatchSnapshot();

    component.unmount();
  });
});