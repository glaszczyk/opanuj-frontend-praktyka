import { AxiosService } from '../services/AxiosService.ts';

const BASE_URL = 'https://restcountries.com/v3.1/';

export const useCountries = () => {
  const httpService = new AxiosService(BASE_URL)

  const getAll = async () => await httpService.getAll();

  const getBy = async (path: string) => await httpService.filter(path);

  return {
    getAll, getBy
  }

}