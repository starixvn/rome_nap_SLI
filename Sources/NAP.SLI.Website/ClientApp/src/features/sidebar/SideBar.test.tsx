import React, { Component } from 'react';
import configureStore from 'redux-mock-store';
import SideBar from './SideBar';
import { Provider } from 'react-redux';
import { Action, DeepPartial, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {
  act,
  cleanup,
  fireEvent,
  screen,
  render,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('app/store');

const mockStore = configureStore<
  DeepPartial<AppState>,
  ThunkDispatch<DeepPartial<AppState>, unknown, Action<string>>
>([thunk]);

describe('SideBar', () => {
  let input: HTMLInputElement;
  let submitBtn: HTMLButtonElement;
  beforeEach(() => {
    const store = mockStore({
      sidebar: {
        username: undefined,
        message: undefined,
        customer: undefined,
      },
    });
    render(
      <Provider store={store}>
        <SideBar />
      </Provider>,
    );
    input = screen.getByRole('combobox') as HTMLInputElement;
    submitBtn = screen.getByText('Search') as HTMLButtonElement;
  });
  afterEach(cleanup);

  it('should show dropdown when typing', async () => {
    // Arange
    const expectedVal = 'SUPERTEST';

    // Act
    userEvent.type(input, expectedVal);

    // screen.debug(screen.getByRole('listbox'));
    // Assert
    expect(input.value).toBe(expectedVal);
    expect(await screen.findByRole('listbox')).toBeInTheDocument();
  });

  // it('should submit when clicked submit button', async () => {
  //   // Arange
  //   const expectedVal = 'SUPERTEST';

  //   // Act
  //   await waitFor(() => {
  //     userEvent.type(input, expectedVal);
  //     userEvent.click(submitBtn);
  //   });

  //   // Assert
  //   expect(screen.queryByText(/view setting/i)).toBeInTheDocument();
  // });

  // it('should update input when click dropdown item', () => {
  //   // Act
  //   userEvent.type(input, 'SUPERTES');
  //   // userEvent.click(screen.getByDisplayValue('SUPERTEST'));
  //   screen.debug(screen.getByRole('listbox'));
  //   // Assert
  //   // expect(input.value).toBe('SUPERTEST');
  // });

  // it('invalid username', () => {
  //   const store = mockStore({
  //     sidebar: {
  //       username: undefined,
  //       message: undefined,
  //       customer: undefined,
  //     },
  //   });

  //   const component = renderComponent(store);

  //   expect(component).toMatchSnapshot();
  // });

  // it('valid username', () => {
  //   const store = mockStore({
  //     sidebar: {
  //       username: 'test',
  //       message: undefined,
  //       customer: undefined,
  //     },
  //   });

  //   const component = renderComponent(store);

  //   expect(component).toMatchSnapshot();
  // });
});
