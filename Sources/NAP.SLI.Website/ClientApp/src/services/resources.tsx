import { post } from './http';

type Resources = {
  [key: number]: string;
};

export const getBetTypeNames = async (betTypes: number[]) => {
  const { data } = await post<string[]>(`/api/report/BetTypeNames`, betTypes);
  const resources: Resources = {};
  betTypes.forEach((x, i) => (resources[x] = data[i]));
  return resources;
};

export const getSportTypeNames = async (sportTypes: number[]) => {
  const { data } = await post<string[]>(
    `/api/report/SportTypeNames`,
    sportTypes,
  );
  const resources: Resources = {};
  sportTypes.forEach((x, i) => (resources[x] = data[i]));
  return resources;
};
