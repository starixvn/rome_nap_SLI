import './ToastContainer.scss';
import React from 'react';
import { Toast, ToastBody } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { hide } from './reducer';

const ToastContainer = () => {
  const dispatch = useDispatch();
  const { message, color } = useSelector((state: RootState) => state.toast);
  const isOpen = message !== undefined;

  return (
    <div aria-live="polite" aria-atomic="true" className="toast-container d-flex justify-content-center align-items-center">
      <Toast isOpen={isOpen} fade className={'bg-' + color} onClick={() => dispatch(hide())}>
        <ToastBody>
          {message}
        </ToastBody>
      </Toast>
    </div>
  );

};

export default ToastContainer;