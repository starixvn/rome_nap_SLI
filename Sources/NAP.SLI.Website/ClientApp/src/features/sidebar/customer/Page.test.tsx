import React from 'react';
import configureStore from 'redux-mock-store';
import CustomerPage from './Page';
import { Provider } from 'react-redux';
import { Action, DeepPartial, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { mount, ReactWrapper } from 'enzyme';

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
        customer: undefined,
      },
    });

    const component = renderComponent(store);

    expect(component).toMatchSnapshot();

    component.unmount();
  });

  it('exist customer', () => {
    const store = mockStore({
      sidebar: {
        customer: {
          generalInformation: {
            custId: 1,
            username: '',
            firstName: '',
            lastName: '',
            username2: '',
            roleId: 1,
            enabled: true,
            phone: 'phone',
            mobilePhone: 'mobilePhone',
            fax: 'fax',
            site: 'site',
          },
          headline: {
            memberId: 1,
            memberName: 'member',
            agentId: 2,
            agentName: 'agent',
            agentEnabled: true,
            masterId: 3,
            masterName: 'master',
            masterEnabled: true,
            superId: 4,
            superName: 'super',
            superEnabled: true,
          },
        },
      },
    });

    const component = renderComponent(store);

    expect(component).toMatchSnapshot();

    component.unmount();
  });
});
