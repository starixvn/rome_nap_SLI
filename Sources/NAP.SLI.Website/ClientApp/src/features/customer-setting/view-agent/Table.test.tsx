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
    const customerSettingViewAgent = {};

    const store = mockStore({
      customerSettingViewAgent,
    });

    const component = renderComponent(store);

    expect(component).toMatchSnapshot();

    component.unmount();
  });

  it('render with data', () => {
    const customerSettingViewAgent = {
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
        // Master Preset
        v161mpositiontaking_81: 0.01,
        v161mpositiontaking_83: 0.01,
        v161mpositiontaking_88: 0.01,
        v161mpositiontaking_86: 0.01,
        v161mlivepositiontaking_85: 0.01,
        v161mlivepositiontaking_86: 0.01,
        v161mlivepositiontaking_87: 0.01,
        v161mlivepositiontaking_89: 0.01,
        v161mlivepositiontaking_90: 0.01,
        // Auto Master Preset
        isauto_v161mpositiontaking_81: 0.01,
        isauto_v161mpositiontaking_83: 0.01,
        isauto_v161mpositiontaking_88: 0.01,
        isauto_v161mpositiontaking_86: 0.01,
        isauto_v161mlivepositiontaking_85: 0.01,
        isauto_v161mlivepositiontaking_86: 0.01,
        isauto_v161mlivepositiontaking_87: 0.01,
        isauto_v161mlivepositiontaking_89: 0.01,
        isauto_v161mlivepositiontaking_90: 0.01,
        auto_v161mpositiontaking_81: 0.01,
        auto_v161mpositiontaking_83: 0.01,
        auto_v161mpositiontaking_88: 0.01,
        auto_v161mpositiontaking_86: 0.01,
        auto_v161mlivepositiontaking_85: 0.01,
        auto_v161mlivepositiontaking_86: 0.01,
        auto_v161mlivepositiontaking_87: 0.01,
        auto_v161mlivepositiontaking_89: 0.01,
        auto_v161mlivepositiontaking_90: 0.01,
        // Agent Max Position
        v161apositiontaking_81_max: 0.01,
        v161apositiontaking_83_max: 0.01,
        v161apositiontaking_88_max: 0.01,
        v161apositiontaking_86_max: 0.01,
        v161alivepositiontaking_85_max: 0.01,
        v161alivepositiontaking_86_max: 0.01,
        v161alivepositiontaking_87_max: 0.01,
        v161alivepositiontaking_89_max: 0.01,
        v161alivepositiontaking_90_max: 0.01,
        // Agent Min Position
        v161apositiontaking_81_min: 0.01,
        v161apositiontaking_83_min: 0.01,
        v161apositiontaking_88_min: 0.01,
        v161apositiontaking_86_min: 0.01,
        v161alivepositiontaking_85_min: 0.01,
        v161alivepositiontaking_86_min: 0.01,
        v161alivepositiontaking_87_min: 0.01,
        v161alivepositiontaking_89_min: 0.01,
        v161alivepositiontaking_90_min: 0.01,
      },
    };
    const store = mockStore({
      customerSettingViewAgent,
    });

    const component = renderComponent(store);

    expect(component).toMatchSnapshot();

    component.unmount();
  });
});
