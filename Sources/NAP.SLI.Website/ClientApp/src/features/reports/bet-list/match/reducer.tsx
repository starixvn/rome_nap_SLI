import { download, post } from 'services/http';
import { QueryData } from '../types';

export type QueryArg = {
  matchId: number;
  betType: number;
  liveIndicator: number;
  custId: number;
  roleId: number;
};

const actionName = 'bet-list';

export const query = async (payload: QueryArg) => {
  const { data } = await post<QueryData>(
    `/api/${actionName}/getByMatch`,
    payload,
  );
  return data;
};

export const excel = async (payload: QueryArg) => {
  return await download(`/api/${actionName}/excel`, payload);
};
