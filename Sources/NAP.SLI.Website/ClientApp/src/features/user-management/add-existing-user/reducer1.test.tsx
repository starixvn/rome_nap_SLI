import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reducer, { toggleModal, add } from './reducer';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('reducer', () => {
  test('initialState', () => {
    // Arrange
    const initialState = {};
    const store = mockStore({
      addExistingUser: {},
    });
    const action = () => ({
      type: 'dummy_action',
    });

    // Act
    store.dispatch(toggleModal());

    const state = store.getState();
    console.log(state);
    // const state = reducer(undefined, action);

    // // Assert
    // expect(state).toEqual({
    //   isOpen: false,
    // });
  });

  // test('toggleModal', async () => {
  //   // Act
  //   const state = reducer(undefined, toggleModal());

  //   // Assert
  //   expect(state).toEqual({
  //     isOpen: true,
  //   });
  // });
});
