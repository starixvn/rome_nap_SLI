import reducer, { toggleModal } from './reducer';

jest.mock('../../../common/components/toast/reducer');
jest.mock('../reducer');
jest.mock('../../../common/utils/ExceptionUtils');
jest.mock('../../../common/services/http');

const initialState = {
  isOpen: false,
};

describe('reducer', () => {
  test('toggleModal', () => {
    const state = reducer(initialState, toggleModal());
    console.log(state);
    toggleModal();
  });
});
