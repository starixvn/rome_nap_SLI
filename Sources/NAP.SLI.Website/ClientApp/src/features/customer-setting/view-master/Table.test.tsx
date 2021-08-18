import React from 'react';
import configureStore from 'redux-mock-store';
import Table from './Table';
import { Provider } from 'react-redux';
import { Action, DeepPartial, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { mount, ReactWrapper } from 'enzyme';
import { QueryData } from './reducer';

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
    // Arrange
    const store = mockStore({
      customerSettingViewMaster: {
        data: undefined,
      },
    });

    // Act
    const component = renderComponent(store);

    // Assert
    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('render with data', () => {
    // Arrange
    const queryData: QueryData = {
      userName: 'username',
      firstName: 'firstname',
      lastName: 'lastname',
      phone: 'phone',
      mobilePhone: 'mobilephone',
      fax: 'fax',
      disableNumber: true,
      // Bet Setting
      v161MinBet: 100,
      v161MaxBet: 200,
      v161MaxPerMatch: 300,
      v161MaxPerBall: 400,
      v164MinBet: 500,
      v164MaxBet: 600,
      v164MaxPerMatch: 700,
      // Position Taking
      // Master Preset
      v161mPositionTaking_81: 0.01,
      v161mPositionTaking_83: 0.02,
      v161mPositionTaking_88: 0.03,
      v161mPositionTaking_86: 0.04,
      v161mLivePositionTaking_85: 0.05,
      v161mLivePositionTaking_86: 0.06,
      v161mLivePositionTaking_87: 0.07,
      v161mLivePositionTaking_89: 0.08,
      v161mLivePositionTaking_90: 0.09,
      // Super Preset
      v161sPositionTaking_81: 0.10,
      v161sPositionTaking_83: 0.11,
      v161sPositionTaking_88: 0.12,
      v161sPositionTaking_86: 0.13,
      v161sLivePositionTaking_85: 0.14,
      v161sLivePositionTaking_86: 0.15,
      v161sLivePositionTaking_87: 0.16,
      v161sLivePositionTaking_89: 0.17,
      v161sLivePositionTaking_90: 0.18,
      // Auto Super Preset
      isAuto_v161sPositionTaking_81: 0.19,
      isAuto_v161sPositionTaking_83: 0.20,
      isAuto_v161sPositionTaking_88: 0.21,
      isAuto_v161sPositionTaking_86: 0.22,
      isAuto_v161sLivePositionTaking_85: 0.23,
      isAuto_v161sLivePositionTaking_86: 0.24,
      isAuto_v161sLivePositionTaking_87: 0.25,
      isAuto_v161sLivePositionTaking_89: 0.26,
      isAuto_v161sLivePositionTaking_90: 0.27,
      auto_v161sPositionTaking_81: 0.28,
      auto_v161sPositionTaking_83: 0.29,
      auto_v161sPositionTaking_88: 0.30,
      auto_v161sPositionTaking_86: 0.31,
      auto_v161sLivePositionTaking_85: 0.32,
      auto_v161sLivePositionTaking_86: 0.33,
      auto_v161sLivePositionTaking_87: 0.34,
      auto_v161sLivePositionTaking_89: 0.35,
      auto_v161sLivePositionTaking_90: 0.36,
      // Master Max Position
      v161mPositionTaking_81_Max: 0.37,
      v161mPositionTaking_83_Max: 0.38,
      v161mPositionTaking_88_Max: 0.39,
      v161mPositionTaking_86_Max: 0.40,
      v161mLivePositionTaking_85_Max: 0.41,
      v161mLivePositionTaking_86_Max: 0.42,
      v161mLivePositionTaking_87_Max: 0.43,
      v161mLivePositionTaking_89_Max: 0.44,
      v161mLivePositionTaking_90_Max: 0.45,
      // Master Min Position
      v161mPositionTaking_81_Min: 0.46,
      v161mPositionTaking_83_Min: 0.47,
      v161mPositionTaking_88_Min: 0.48,
      v161mPositionTaking_86_Min: 0.49,
      v161mLivePositionTaking_85_Min: 0.50,
      v161mLivePositionTaking_86_Min: 0.51,
      v161mLivePositionTaking_87_Min: 0.52,
      v161mLivePositionTaking_89_Min: 0.53,
      v161mLivePositionTaking_90_Min: 0.54,
    };
    const store = mockStore({
      customerSettingViewMaster: {
        data: queryData,
      },
    });

    // Act
    const component = renderComponent(store);

    // Assert
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
