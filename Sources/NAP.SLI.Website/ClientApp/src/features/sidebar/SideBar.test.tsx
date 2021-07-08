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
import waitUntil from 'async-wait-until';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';

jest.mock('app/store');

const mockStore = configureStore<
  DeepPartial<AppState>,
  ThunkDispatch<DeepPartial<AppState>, unknown, Action<string>>
>([thunk]);

describe('SideBar', () => {
  // let input: HTMLInputElement;
  // let submitBtn: HTMLButtonElement;
  // beforeEach(() => {
  //   const store = mockStore({
  //     sidebar: {
  //       username: undefined,
  //       message: undefined,
  //       customer: undefined,
  //     },
  //   });
  //   const {rerender} = render(
  //     <Provider store={store}>
  //       <SideBar />
  //     </Provider>,
  //   );
  //   input = screen.getByRole('combobox') as HTMLInputElement;
  //   submitBtn = screen.getByText('Search') as HTMLButtonElement;
  // });
  // afterEach(cleanup);

  // it('should work', async () => {
  //   const url = 'http://localhost:5000/simple-api/query';
  //   fetchMock
  //     .reset()
  //     .get(url, [{ username: 'SUPERTEST' }, { username: 'SUPERTEST1' }]);
  //   const store = mockStore({
  //     sidebar: {
  //       username: '',
  //       message: undefined,
  //       customer: undefined,
  //     },
  //   });
  //   const wrapper = mount(
  //     <Provider store={store}>
  //       <SideBar />
  //     </Provider>,
  //   );
  //   const input = wrapper.find('.rbt-input-main');
  //   // console.log(input.debug());
  //   input.simulate('focus');
  //   input.simulate('click');
  //   input.simulate('keydown', { keyCode: 72 });
  //   // input.simulate('change', { target: { value: 'SUPERTEST' } });
  //   // console.log(wrapper.debug());
  //   console.log(input.debug());
  //   await waitUntil(() => {
  //     wrapper.update();
  //     // console.log(input.debug());
  //     // console.log(wrapper.find('.dropdown-item').debug());
  //     return wrapper.find('a.dropdown-item').length > 1;
  //   }, 3000);
  //   console.log(wrapper.find('a.dropdown-item').debug());
  //   expect(wrapper.find('a.dropdown-item').length).toBe(1);
  //   expect(wrapper.find('a.dropdown-item').length).toBe('Type to search ...');
  // });

  it('should show dropdown when typing', async () => {
    // Arange
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
    const { rerender } = render(
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
