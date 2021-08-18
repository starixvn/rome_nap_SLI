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
      customerSettingViewSuper: {
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
      // Super Max
      v161sPositionTaking_81_Max: 0.01,
      v161sPositionTaking_83_Max: 0.02,
      v161sPositionTaking_86_Max: 0.03,
      v161sPositionTaking_88_Max: 0.04,
      v161sLivePositionTaking_85_Max: 0.05,
      v161sLivePositionTaking_86_Max: 0.06,
      v161sLivePositionTaking_87_Max: 0.07,
      v161sLivePositionTaking_89_Max: 0.08,
      v161sLivePositionTaking_90_Max: 0.09,
      // Master
      v161mPositionTaking_81: 0.10,
      v161mPositionTaking_83: 0.11,
      v161mPositionTaking_86: 0.12,
      v161mPositionTaking_88: 0.13,
      v161mLivePositionTaking_85: 0.14,
      v161mLivePositionTaking_86: 0.15,
      v161mLivePositionTaking_87: 0.16,
      v161mLivePositionTaking_89: 0.17,
      v161mLivePositionTaking_90: 0.18,
      // Agent
      v161aPositionTaking_81: 0.19,
      v161aPositionTaking_83: 0.20,
      v161aPositionTaking_86: 0.21,
      v161aPositionTaking_88: 0.22,
      v161aLivePositionTaking_85: 0.23,
      v161aLivePositionTaking_86: 0.24,
      v161aLivePositionTaking_87: 0.25,
      v161aLivePositionTaking_89: 0.26,
      v161aLivePositionTaking_90: 0.27,
      // Super Min
      v161sPositionTaking_81_Min: 0.28,
      v161sPositionTaking_83_Min: 0.29,
      v161sPositionTaking_86_Min: 0.30,
      v161sPositionTaking_88_Min: 0.31,
      v161sLivePositionTaking_85_Min: 0.32,
      v161sLivePositionTaking_86_Min: 0.33,
      v161sLivePositionTaking_87_Min: 0.34,
      v161sLivePositionTaking_89_Min: 0.35,
      v161sLivePositionTaking_90_Min: 0.36,
    };
    const store = mockStore({
      customerSettingViewSuper: {
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
