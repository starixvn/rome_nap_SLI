/// <reference types="react-scripts" />

export { };

declare global {
  interface Window {
    configuration: {
      env: string;
      sentryDsn: string;
      umToken: string | null;
    };
  }

  type Func = () => void;

  namespace Formik {
    type SetFieldValueFunc = (field: string, value: any, shouldValidate?: boolean) => void;
  }



  type Customer = {
    username: string;
    custId: number;
    roleId: number;
  };

}
