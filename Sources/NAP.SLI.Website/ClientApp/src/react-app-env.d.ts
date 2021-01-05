/// <reference types="react-scripts" />
import { AppDispatch as _AppDispatch, RootState as _RootState } from './store';

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
    type SetFieldValueFunc = (field: string, value: any, shouldValidate?: boolean) => void;
  }

  type Customer = {
    username: string;
    custId: number;
    roleId: number;
  };

  type AppDispatch = _AppDispatch;
  type RootState = _RootState;
}
