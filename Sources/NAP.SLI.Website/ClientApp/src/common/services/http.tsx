import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import ContentDisposition from 'content-disposition';
import FileSaver from 'file-saver';
import storage from './storage';
import store from '../../store';
import { hide, error } from '../components/toast/reducer';
import { logout } from '../../features/account/authentication/reducer';
import { checkSuccess, UMTime } from '../../features/error/UM/reducer';
import { RouteLinks } from '../utils/RouteUtils';
import { history } from '../../App';
import { isNullOrWhiteSpaces } from '../utils/StringUtils';

const getConfig = (): AxiosRequestConfig => {
  const headers: any = {};
  const token = storage.getToken();
  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }

  const umToken = window.configuration.umToken;
  if (umToken) {
    headers['UMToken'] = umToken;
  }

  return {
    headers: headers
  };
};

const handleError = (e: AxiosError) => {
  if (e.response) {
    switch (e.response.status) {
      case 401:
        store.dispatch(logout());
        return new Error('Handled');
      case 403:
        store.dispatch(error('You are not authorized to use this function'));
        return new Error('Handled');
      case 503:
        const umTime = e.response.data as UMTime;
        store.dispatch(checkSuccess({ ...umTime }));
        history.push(RouteLinks.ERROR_UM);
        return new Error('Handled');
      default:
        store.dispatch(error(e.message));
    }
  } else {
    store.dispatch(error(e.message));
  }

  return e;
};

export const post = async function <T>(url: string, data?: any) {
  try {
    store.dispatch(hide());
    const config = getConfig();
    return await axios.post<T>(url, data, config);
  } catch (e) {
    return Promise.reject(handleError(e));
  }
};

export const download = async (url: string, data?: any) => {
  try {
    store.dispatch(hide());
    const config = getConfig();
    const blobResponse = await axios.post<Blob>(url, { ...config, responseType: 'blob' }, data);
    if (blobResponse == null || blobResponse.data == null) {
      return Promise.reject({ message: 'Error downloading the file' });
    }

    if (blobResponse.data.size === 0 || blobResponse.status === 204) {
      return Promise.reject({ message: 'There is no data' });
    }

    let fileName = '';
    const contentDispositionValue = blobResponse.headers['content-disposition'];
    if (contentDispositionValue) {
      const contentDisposition = ContentDisposition.parse(contentDispositionValue);
      if (contentDisposition && contentDisposition.parameters && contentDisposition.parameters.filename) {
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
    return Promise.reject(handleError(e));
  }
};