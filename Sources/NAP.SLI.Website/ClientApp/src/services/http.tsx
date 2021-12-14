import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import ContentDisposition from 'content-disposition';
import FileSaver from 'file-saver';
import storage from './storage';
import store from 'app/store';
import {} from 'react-router-dom';
import { hide, error } from 'components/toast/reducer';
import { updateUM, UMTime } from 'features/error/UM/reducer';
import { isNullOrWhiteSpaces } from 'utils/StringUtils';
import { handleException } from 'utils/ExceptionUtils';

const getConfig = (): AxiosRequestConfig => {
  const headers: KeyValueObject = {};
  const token = storage.getToken();
  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }

  const umToken = window.configuration.umToken;
  if (umToken) {
    headers['UMToken'] = umToken;
  }

  return {
    headers: headers,
  };
};

const handleError = (e: AxiosError): AxiosError | undefined => {
  if (e.response) {
    switch (e.response.status) {
      case 401:
        storage.remove();
        store.dispatch(() => {
          // TODO: fix
          // history.push(RouteLinks.LOGIN);
        });
        return;
      case 403:
        store.dispatch(error('You are not authorized to use this function'));
        return;
      case 503: {
        const umTime = e.response.data as UMTime;
        store.dispatch(() => {
          updateUM(umTime);
          // TODO: fix
          // history.push(RouteLinks.ERROR_UM);
        });
        return;
      }
      default:
        store.dispatch(error(e.message));
    }
  } else {
    store.dispatch(error(e.message));
  }

  handleException(e);
  return e;
};

export const post = async function <T>(url: string, data?: unknown) {
  try {
    store.dispatch(hide());
    const config = getConfig();
    return await axios.post<T>(url, data, config);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return Promise.reject(handleError(e));
    } else {
      return Promise.reject();
    }
  }
};

export const get = async function <T>(url: string) {
  try {
    store.dispatch(hide());
    const config = getConfig();
    return await axios.get<T>(url, config);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return Promise.reject(handleError(e));
    } else {
      return Promise.reject();
    }
  }
};

export const download = async (url: string, data?: unknown) => {
  try {
    store.dispatch(hide());
    const config = getConfig();
    const blobResponse = await axios.post<Blob>(url, data, {
      ...config,
      responseType: 'blob',
    });
    if (blobResponse == null || blobResponse.data == null) {
      return Promise.reject({ message: 'Error downloading the file' });
    }

    if (blobResponse.data.size === 0 || blobResponse.status === 204) {
      return Promise.reject({ message: 'There is no data' });
    }

    let fileName = '';
    const contentDispositionValue = blobResponse.headers['content-disposition'];
    if (contentDispositionValue) {
      const contentDisposition = ContentDisposition.parse(
        contentDispositionValue,
      );
      if (
        contentDisposition &&
        contentDisposition.parameters &&
        contentDisposition.parameters.filename
      ) {
        fileName = contentDisposition.parameters.filename;
      }
    }

    const xFileNameValue = blobResponse.headers['x-filename'];
    if (isNullOrWhiteSpaces(fileName) && xFileNameValue) {
      fileName = decodeURIComponent(xFileNameValue);
    }

    if (isNullOrWhiteSpaces(fileName)) {
      return Promise.reject({ message: 'No filename' });
    }

    FileSaver.saveAs(blobResponse.data, fileName);
    return blobResponse;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return Promise.reject(handleError(e));
    } else {
      return Promise.reject();
    }
  }
};
