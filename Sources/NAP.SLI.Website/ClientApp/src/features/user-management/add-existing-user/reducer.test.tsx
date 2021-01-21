import { StateObservable, ActionsObservable, Epic } from 'redux-observable';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reducer, { add, toggleModal, State } from './reducer';
import * as ExceptionUtils from 'utils/ExceptionUtils';
import * as http from 'services/http';
import * as userManagementReducer from '../reducer';
import * as toastReducer from 'components/toast/reducer';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('utils/ExceptionUtils');
jest.mock('services/http');
jest.mock('components/toast/reducer', () => {
  const actual = jest.requireActual('components/toast/reducer');
  return {
    ...actual,
    success: jest.fn(),
    error: jest.fn(),
  };
});
jest.mock('../reducer', () => {
  const actual = jest.requireActual('../reducer');
  return {
    ...actual,
    query: jest.fn(),
  };
});

const mockHttp = http as jest.Mocked<typeof http>;
const mockExceptionUtils = ExceptionUtils as jest.Mocked<typeof ExceptionUtils>;
const mockToastReducer = toastReducer as jest.Mocked<typeof toastReducer>;
const mockUserManagementReducer = userManagementReducer as jest.Mocked<
  typeof userManagementReducer
>;

const getInitialState = (initial?: Partial<State>) =>
  reducer(initial as State, {} as never);

describe('reducer', () => {
  test('initialState', () => {
    // Act
    const initialState = getInitialState();

    // Assert
    expect(initialState).toEqual({
      isOpen: false,
    });
  });

  test('toggleModal', async () => {
    // Arrange
    const initialState = getInitialState();

    // Act
    const state = reducer(initialState, toggleModal());

    // Assert
    expect(state).toEqual({
      isOpen: true,
    });
  });

  describe('add', () => {
    const props = {
      username: 'username',
      groupId: 1,
    };
    const mockCallback = jest.fn();
    mockToastReducer.success.mockImplementationOnce(() => () => jest.fn());
    mockUserManagementReducer.query.mockImplementationOnce(() => jest.fn());

    beforeEach(() => {
      mockCallback.mockClear();
      mockExceptionUtils.handleException.mockClear();
    });

    test('should call handleException if exception happened', async () => {
      // Arrange
      const err = new Error('test');
      mockHttp.post.mockRejectedValueOnce(err);
      const addAction = add(props, mockCallback);
      const store = mockStore(getInitialState({ isOpen: true }));

      // Act
      //reducer(initialState, add(props, mockCallback));
      await store.dispatch(add(props, mockCallback));

      // Assert
      expect(mockExceptionUtils.handleException).toHaveBeenCalledTimes(1);
      expect(mockExceptionUtils.handleException.mock.calls[0][0]).toEqual(err);
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    // test('should call success toast if request is successful', async () => {
    //   // Arrange
    //   mockHttp.post.mockResolvedValueOnce({
    //     headers: {},
    //     config: {},
    //     status: 200,
    //     statusText: 'OK',
    //     data: {
    //       isSuccess: true,
    //     },
    //   });

    //   // Act
    //   await store.dispatch(add(props, mockCallback));

    //   // Assert
    //   expect(mockToastReducer.success).toBeCalledTimes(1);
    //   // expect(store.getState().addExistingUser).toEqual({
    //   //   isOpen: true,
    //   // });
    //   expect(mockUserManagementReducer.query).toBeCalledTimes(1);
    //   // expect(mockExceptionUtils.handleException).toHaveBeenCalledTimes(0);
    //   expect(mockCallback).toHaveBeenCalledTimes(1);
    // });
  });
});
