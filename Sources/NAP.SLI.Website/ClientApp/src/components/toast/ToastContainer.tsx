import './ToastContainer.scss';
import React from 'react';
import { Toast, ToastBody } from 'reactstrap';
import { useSelector } from 'react-redux';
import { hide } from './reducer';
import { useAppDispatch } from 'app/store';

const ToastContainer = () => {
  const dispatch = useAppDispatch();
  const { message, color } = useSelector((state: AppState) => state.toast);
  const isOpen = message !== undefined;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="toast-container d-flex justify-content-center align-items-center"
    >
      <Toast
        isOpen={isOpen}
        fade
        className={'bg-' + color}
        onClick={() => dispatch(hide())}
      >
        <ToastBody>{message}</ToastBody>
      </Toast>
    </div>
  );
};

export default ToastContainer;
