import { httpService } from '../services/httpService.ts';

export const useCountries = () => {
  const getAll = async () => await httpService.getAll();

  return {
    getAll
  }

}