import { download, post } from 'services/http';
import { QueryData } from '../types';

type QueryArg = {
  refNo: number;
  custId: number;
};

type ExcelArg = QueryArg & {
  username: string;
};

const actionName = 'bet-list';

export const query = async (payload: QueryArg) => {
  const { data } = await post<QueryData>(
    `/api/${actionName}/getByRefNo`,
    payload,
  );
  return data;
};

export const excel = async (payload: ExcelArg) => {
  return await download(`/api/${actionName}/excel`, payload);
};
