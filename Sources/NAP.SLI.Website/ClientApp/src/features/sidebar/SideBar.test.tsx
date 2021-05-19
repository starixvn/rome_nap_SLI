import React, { Component } from 'react';
import configureStore from 'redux-mock-store';
import SideBar from './SideBar';
import { Provider } from 'react-redux';
import { Action, DeepPartial, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { mount, ReactWrapper, render, shallow, ShallowWrapper } from 'enzyme';

jest.mock('app/store');

const mockStore = configureStore<
  DeepPartial<AppState>,
  ThunkDispatch<DeepPartial<AppState>, unknown, Action<string>>
>([thunk]);

describe('SideBar', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderComponent = (store: any) =>
    render(
      <Provider store={store}>
        <SideBar />
      </Provider>,
    );

  it('invalid username', () => {
    const store = mockStore({
      sidebar: {
        username: undefined,
        message: undefined,
        customer: undefined,
      },
    });

    const component = renderComponent(store);

    expect(component).toMatchSnapshot();
  });

  it('valid username', () => {
    const store = mockStore({
      sidebar: {
        username: 'test',
        message: undefined,
        customer: undefined,
      },
    });

    const component = renderComponent(store);

    expect(component).toMatchSnapshot();
  });
});
