import store from 'app/store';
import reducer, { toggleModal } from './reducer';

describe('reducer', () => {
  test('initialState', () => {
    // Act
    const state = store.getState().addExistingUser;

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
});
