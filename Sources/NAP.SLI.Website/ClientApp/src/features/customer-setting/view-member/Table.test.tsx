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
        // Position Taking
        // Agent
        v161apositiontaking_81: 0.01,
        v161apositiontaking_83: 0.01,
        v161apositiontaking_88: 0.01,
        v161apositiontaking_86: 0.01,
        v161alivepositiontaking_85: 0.01,
        v161alivepositiontaking_86: 0.01,
        v161alivepositiontaking_87: 0.01,
        v161alivepositiontaking_89: 0.01,
        v161alivepositiontaking_90: 0.01,
        // Master
        v161mpositiontaking_81: 0.01,
        v161mpositiontaking_83: 0.01,
        v161mpositiontaking_88: 0.01,
        v161mpositiontaking_86: 0.01,
        v161mlivepositiontaking_85: 0.01,
        v161mlivepositiontaking_86: 0.01,
        v161mlivepositiontaking_87: 0.01,
        v161mlivepositiontaking_89: 0.01,
        v161mlivepositiontaking_90: 0.01,
        // Super
        v161spositiontaking_81: 0.01,
        v161spositiontaking_83: 0.01,
        v161spositiontaking_88: 0.01,
        v161spositiontaking_86: 0.01,
        v161slivepositiontaking_85: 0.01,
        v161slivepositiontaking_86: 0.01,
        v161slivepositiontaking_87: 0.01,
        v161slivepositiontaking_89: 0.01,
        v161slivepositiontaking_90: 0.01,
        // Master Auto
        isauto_v161mpositiontaking_mem_81: 0.01,
        isauto_v161mpositiontaking_mem_83: 0.01,
        isauto_v161mpositiontaking_mem_88: 0.01,
        isauto_v161mpositiontaking_mem_86: 0.01,
        auto_v161mpositiontaking_mem_81: 0.01,
        auto_v161mpositiontaking_mem_83: 0.01,
        auto_v161mpositiontaking_mem_88: 0.01,
        auto_v161mpositiontaking_mem_86: 0.01,
        isauto_v161mlivepositiontaking_mem_85: 0.01,
        isauto_v161mlivepositiontaking_mem_86: 0.01,
        isauto_v161mlivepositiontaking_mem_87: 0.01,
        isauto_v161mlivepositiontaking_mem_89: 0.01,
        isauto_v161mlivepositiontaking_mem_90: 0.01,
        auto_v161mlivepositiontaking_mem_85: 0.01,
        auto_v161mlivepositiontaking_mem_86: 0.01,
        auto_v161mlivepositiontaking_mem_87: 0.01,
        auto_v161mlivepositiontaking_mem_89: 0.01,
        auto_v161mlivepositiontaking_mem_90: 0.01,
        // Super Auto
        auto_v161spositiontaking_81: 0.01,
        auto_v161spositiontaking_83: 0.01,
        auto_v161spositiontaking_86: 0.01,
        auto_v161spositiontaking_88: 0.01,
        isauto_v161spositiontaking_mem_81: 0.01,
        isauto_v161spositiontaking_mem_83: 0.01,
        isauto_v161spositiontaking_mem_88: 0.01,
        isauto_v161spositiontaking_mem_86: 0.01,
        auto_v161slivepositiontaking_85: 0.01,
        auto_v161slivepositiontaking_86: 0.01,
        auto_v161slivepositiontaking_87: 0.01,
        auto_v161slivepositiontaking_89: 0.01,
        auto_v161slivepositiontaking_90: 0.01,
        isauto_v161slivepositiontaking_mem_85: 0.01,
        isauto_v161slivepositiontaking_mem_86: 0.01,
        isauto_v161slivepositiontaking_mem_87: 0.01,
        isauto_v161slivepositiontaking_mem_89: 0.01,
        isauto_v161slivepositiontaking_mem_90: 0.01,
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
