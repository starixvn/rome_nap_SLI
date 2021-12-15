import { download, post } from 'services/http';
import { QueryData } from '../types';

export type QueryArg = {
  custId: number;
  fromDate: string;
  toDate: string;
};

const actionName = 'bet-list';

export const query = async (payload: QueryArg) => {
  const { data } = await post<QueryData>(
    `/api/${actionName}/getByDate`,
    payload,
  );
  return data;
};

export const excel = async (payload: QueryArg) => {
  return await download(`/api/${actionName}/excel`, payload);
};
