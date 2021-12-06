import React from 'react';
import configureStore from 'redux-mock-store';
import SideBar from './SideBar';
import { Provider } from 'react-redux';
import { Action, DeepPartial, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'fetch-mock';

jest.mock('app/store');

const mockStore = configureStore<
  DeepPartial<AppState>,
  ThunkDispatch<DeepPartial<AppState>, unknown, Action<string>>
>([thunk]);

describe('SideBar', () => {
  it('should show dropdown when typing', async () => {
    // Arrange
    const url = 'http://localhost:5000/simple-api/query';
    fetchMock
      .reset()
      .get(url, [{ username: 'SUPERTEST' }, { username: 'SUPERTEST1' }]);
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
    const input = screen.getByRole('combobox') as HTMLInputElement;
    const expectedVal = 'SUPERTEST';
    // Act
    userEvent.click(input);
    userEvent.type(input, expectedVal);
    // screen.debug(input);
    // await waitUntil(() => {
    //   screen.debug(screen.getByRole('listbox'));
    //   rerender(
    //     <Provider store={store}>
    //       <SideBar />
    //     </Provider>,
    //   );
    //   return screen.getAllByRole('option').length > 0;
    // }, 3000);
    // screen.debug(screen.getByRole('listbox'));
    // Assert
    expect(input.value).toBe(expectedVal);
    expect(await screen.findByRole('listbox')).toBeInTheDocument();
  });
});
