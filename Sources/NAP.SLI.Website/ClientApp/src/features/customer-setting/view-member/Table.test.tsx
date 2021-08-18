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
      customerSettingViewMember: {
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
      // Agent
      v161aPositionTaking_81: 0.01,
      v161aPositionTaking_83: 0.02,
      v161aPositionTaking_88: 0.03,
      v161aPositionTaking_86: 0.04,
      v161aLivePositionTaking_85: 0.05,
      v161aLivePositionTaking_86: 0.06,
      v161aLivePositionTaking_87: 0.07,
      v161aLivePositionTaking_89: 0.08,
      v161aLivePositionTaking_90: 0.09,
      // Master
      v161mPositionTaking_81: 0.11,
      v161mPositionTaking_83: 0.12,
      v161mPositionTaking_88: 0.13,
      v161mPositionTaking_86: 0.14,
      v161mLivePositionTaking_85: 0.15,
      v161mLivePositionTaking_86: 0.16,
      v161mLivePositionTaking_87: 0.17,
      v161mLivePositionTaking_89: 0.18,
      v161mLivePositionTaking_90: 0.19,
      // Super
      v161sPositionTaking_81: 0.20,
      v161sPositionTaking_83: 0.21,
      v161sPositionTaking_88: 0.22,
      v161sPositionTaking_86: 0.23,
      v161sLivePositionTaking_85: 0.24,
      v161sLivePositionTaking_86: 0.25,
      v161sLivePositionTaking_87: 0.26,
      v161sLivePositionTaking_89: 0.27,
      v161sLivePositionTaking_90: 0.28,
      // Master Auto
      isAuto_v161mPositionTaking_81: 0.29,
      isAuto_v161mPositionTaking_83: 0.30,
      isAuto_v161mPositionTaking_88: 0.31,
      isAuto_v161mPositionTaking_86: 0.32,
      auto_v161mPositionTaking_81: 0.33,
      auto_v161mPositionTaking_83: 0.34,
      auto_v161mPositionTaking_88: 0.35,
      auto_v161mPositionTaking_86: 0.36,
      isAuto_v161mLivePositionTaking_85: 0.37,
      isAuto_v161mLivePositionTaking_86: 0.38,
      isAuto_v161mLivePositionTaking_87: 0.39,
      isAuto_v161mLivePositionTaking_89: 0.40,
      isAuto_v161mLivePositionTaking_90: 0.41,
      auto_v161mLivePositionTaking_85: 0.42,
      auto_v161mLivePositionTaking_86: 0.43,
      auto_v161mLivePositionTaking_87: 0.44,
      auto_v161mLivePositionTaking_89: 0.45,
      auto_v161mLivePositionTaking_90: 0.46,
      // Super Auto
      auto_v161sPositionTaking_81: 0.47,
      auto_v161sPositionTaking_83: 0.48,
      auto_v161sPositionTaking_86: 0.49,
      auto_v161sPositionTaking_88: 0.50,
      isAuto_v161sPositionTaking_81: 0.51,
      isAuto_v161sPositionTaking_83: 0.52,
      isAuto_v161sPositionTaking_88: 0.53,
      isAuto_v161sPositionTaking_86: 0.54,
      auto_v161sLivePositionTaking_85: 0.55,
      auto_v161sLivePositionTaking_86: 0.56,
      auto_v161sLivePositionTaking_87: 0.57,
      auto_v161sLivePositionTaking_89: 0.58,
      auto_v161sLivePositionTaking_90: 0.59,
      isAuto_v161sLivePositionTaking_85: 0.60,
      isAuto_v161sLivePositionTaking_86: 0.61,
      isAuto_v161sLivePositionTaking_87: 0.62,
      isAuto_v161sLivePositionTaking_89: 0.63,
      isAuto_v161sLivePositionTaking_90: 0.64,
    };
    const store = mockStore({
      customerSettingViewMember: {
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
