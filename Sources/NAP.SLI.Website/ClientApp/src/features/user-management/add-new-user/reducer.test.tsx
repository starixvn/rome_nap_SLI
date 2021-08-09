import * as http from 'services/http';
import reducer, { toggleModal, addNew } from './reducer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Action, DeepPartial, ThunkDispatch } from '@reduxjs/toolkit';
import store from 'app/store';

jest.mock('services/http');
jest.mock('utils/ExceptionUtils');

const mockHttp = http as jest.Mocked<typeof http>;

describe('reducer', () => {
  test('initialState', () => {
    // Act
    const state = store.getState().addNewUser;

    // Assert
    expect(state).toEqual({
      isOpen: false,
    });
  });

  test('toggleModal', () => {
    // Act
    const state = reducer(undefined, toggleModal());

    // Assert
    expect(state).toEqual({
      isOpen: true,
    });
  });

  describe('addNewUser', () => {
    const mockStore = configureStore<
      DeepPartial<AppState>,
      ThunkDispatch<DeepPartial<AppState>, unknown, Action<string>>
    >([thunk]);
    const store = mockStore({});

    const addNewUserProps = {
      username: 'username',
      password: 'password',
      firstName: 'firstname',
      lastName: 'lastname',
      groupId: 1,
    };

    beforeEach(() => {
      store.clearActions();
    });

    test('fulfilled', async () => {
      // Arrange
      const data = {
        isSuccess: true,
      };
      mockHttp.post.mockResolvedValueOnce({
        headers: {},
        config: {},
        status: 200,
        statusText: 'OK',
        data,
      });

      // Act
      await store.dispatch(addNew(addNewUserProps));

      // Assert
      const actions = store.getActions();
      expect(actions[0].type).toEqual(addNew.pending.type);
      expect(actions[1].type).toEqual(addNew.fulfilled.type);
      expect(actions[1].payload).toEqual(data);
    });

    test('rejected', async () => {
      // Arrange
      const err = new Error('test');
      mockHttp.post.mockRejectedValueOnce(err);

      // Act
      await store.dispatch(addNew(addNewUserProps));

      // Assert
      const actions = store.getActions();
      expect(actions[0].type).toEqual(addNew.pending.type);
      expect(actions[1].type).toEqual(addNew.rejected.type);
      expect(actions[1].payload).toEqual(err);
    });
  });
});
