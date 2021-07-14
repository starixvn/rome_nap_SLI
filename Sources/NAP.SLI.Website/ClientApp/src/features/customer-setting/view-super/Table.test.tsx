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
    const customerSettingViewSuper = {};

    const store = mockStore({
      customerSettingViewSuper,
    });

    const component = renderComponent(store);

    expect(component).toMatchSnapshot();

    component.unmount();
  });

  it('render with data', () => {
    const customerSettingViewSuper = {
      data: {
        username: 'test',
        firstname: 'test',
        lastname: 'test',
        phone: 'test',
        mobilephone: 'test',
        fax: 'test',
        disableNumber: true,
        // Bet Setting
        minbetv161: 0.01,
        maxbetv161: 0.01,
        maxpermatch161: 0.01,
        maxperball161: 0.01,
        minbetv164: 0.01,
        maxbetv164: 0.01,
        maxpermatch164: 0.01,
        // Position Taking
        // Super Max
        v161spositiontaking_81_max: 0.01,
        v161spositiontaking_83_max: 0.01,
        v161spositiontaking_86_max: 0.01,
        v161spositiontaking_88_max: 0.01,
        v161slivepositiontaking_85_max: 0.01,
        v161slivepositiontaking_86_max: 0.01,
        v161slivepositiontaking_87_max: 0.01,
        v161slivepositiontaking_89_max: 0.01,
        v161slivepositiontaking_90_max: 0.01,
        // Master
        v161mpositiontaking_81: 0.01,
        v161mpositiontaking_83: 0.01,
        v161mpositiontaking_86: 0.01,
        v161mpositiontaking_88: 0.01,
        v161mlivepositiontaking_85: 0.01,
        v161mlivepositiontaking_86: 0.01,
        v161mlivepositiontaking_87: 0.01,
        v161mlivepositiontaking_89: 0.01,
        v161mlivepositiontaking_90: 0.01,
        // Agent
        v161apositiontaking_81: 0.01,
        v161apositiontaking_83: 0.01,
        v161apositiontaking_86: 0.01,
        v161apositiontaking_88: 0.01,
        v161alivepositiontaking_85: 0.01,
        v161alivepositiontaking_86: 0.01,
        v161alivepositiontaking_87: 0.01,
        v161alivepositiontaking_89: 0.01,
        v161alivepositiontaking_90: 0.01,
        // Super Min
        v161spositiontaking_81_min: 0.01,
        v161spositiontaking_83_min: 0.01,
        v161spositiontaking_86_min: 0.01,
        v161spositiontaking_88_min: 0.01,
        v161slivepositiontaking_85_min: 0.01,
        v161slivepositiontaking_86_min: 0.01,
        v161slivepositiontaking_87_min: 0.01,
        v161slivepositiontaking_89_min: 0.01,
        v161slivepositiontaking_90_min: 0.01,
      },
    };
    const store = mockStore({
      customerSettingViewSuper,
    });

    const component = renderComponent(store);

    expect(component).toMatchSnapshot();

    component.unmount();
  });
});
