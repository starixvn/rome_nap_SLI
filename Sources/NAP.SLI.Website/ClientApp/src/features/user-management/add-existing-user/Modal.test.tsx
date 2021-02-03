import React from 'react';
import { RenderResult, render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import Modal from './Modal';
import { Provider } from 'react-redux';
import { Action, DeepPartial, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { mount, ReactWrapper } from 'enzyme';

jest.mock('app/store');

const mockStore = configureStore<
  DeepPartial<AppState>,
  ThunkDispatch<DeepPartial<AppState>, unknown, Action<string>>
>([thunk]);
const userManagement = {
  queryArg: {
    username: '',
    groupId: 0,
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
      addExistingUser: {
        isOpen: false,
      },
      userManagement,
    });

    const component = renderComponent(store);

    expect(component).toMatchSnapshot();

    component.unmount();
  });

  it('open modal', () => {
    const store = mockStore({
      addExistingUser: {
        isOpen: true,
      },
      userManagement,
    });
    const component = renderComponent(store);

    expect(component).toMatchSnapshot();

    component.unmount();
  });
});
