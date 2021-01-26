/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="react-scripts" />
import { AppDispatch as _AppDispatch } from './app/store';
import { AppState as _AppState } from './app/reducer';

declare global {
  interface Window {
    configuration: {
      env: string;
      sentryDsn: string;
      umToken: string | null;
    };
  }

  type ResultData = {
    isSuccess: boolean;
    errCode: number;
    errMsg: string;
  };

  type SelectOption<T> = {
    label: string;
    value: T;
  };

  type Func = () => void;

  namespace Formik {
    type SetFieldValueFunc = (
      field: string,
      value: any,
      shouldValidate?: boolean,
    ) => void;
  }

  type Customer = {
    username: string;
    custId: number;
    roleId: number;
  };

  type AppDispatch = _AppDispatch;
  type AppState = _AppState;

  type KeyValueObject = {
    [key: string]: any;
  };

  type GernericKeyValueObject<T> = {
    [key: string]: T;
  };

  type InputValue = string | ReadonlyArray<string> | number | undefined;

  type InputKeyValueObject = {
    [key: string]: InputValue;
  };
}
