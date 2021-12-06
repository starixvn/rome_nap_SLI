import React from 'react';
import configureStore from 'redux-mock-store';
import Modal from './Modal';
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
const userManagement = {
  queryArg: {
    username: '',
  },
};

describe('Modal', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderComponent = (store: any): ReactWrapper =>
    mount(
      <Provider store={store}>
        <Modal />
      </Provider>,
    );

  it('not open modal', () => {
    const store = mockStore({
      resetUserPassword: {
        user: undefined,
      },
      userManagement,
    });

    const component = renderComponent(store);

    expect(component).toMatchSnapshot();

    component.unmount();
  });

  it('open modal', () => {
    const store = mockStore({
      resetUserPassword: {
        user: {
          userName: '',
          firstName: '',
          lastName: '',
          email: '',
          userId: 1,
          creator: '',
          createdDate: moment().toString(),
        },
      },
      userManagement,
    });

    const component = renderComponent(store);

    expect(component).toMatchSnapshot();

    component.unmount();
  });
});
