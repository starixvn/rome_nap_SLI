import React from 'react';
import configureStore from 'redux-mock-store';
import Table from './Table';
import { Provider } from 'react-redux';
import { Action, DeepPartial, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { mount, ReactWrapper } from 'enzyme';

jest.mock('app/store');

const mockStore = configureStore<
  DeepPartial<AppState>,
  ThunkDispatch<DeepPartial<AppState>, unknown, Action<string>>
>([thunk]);

describe('TableComponent', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderComponent = (store: any): ReactWrapper =>
    mount(
      <Provider store={store}>
        <Table />
      </Provider>,
    );

  it('render with no data', () => {
    const customerSettingViewMember = {};

    const store = mockStore({
      customerSettingViewMember,
    });

    const component = renderComponent(store);

    expect(component).toMatchSnapshot();

    component.unmount();
  });

  it('render with data', () => {
    const customerSettingViewMember = {
      data: {
        username: 'test',
        firstname: 'test',
        lastname: 'test',
        phone: 'test',
        mobilephone: 'test',
        fax: 'test',
        disableNumber: true,
        // Bet Setting
        minBetv161: 0.01,
        maxBetv161: 0.01,
        maxpermatchv161: 0.01,
        maxperballv161: 0.01,
        minBetv164: 0.01,
        maxBetv164: 0.01,
        maxpermatch164: 0.01,
      },
    };
    const store = mockStore({
      customerSettingViewMember,
    });

    const component = renderComponent(store);

    expect(component).toMatchSnapshot();

    component.unmount();
  });
});
