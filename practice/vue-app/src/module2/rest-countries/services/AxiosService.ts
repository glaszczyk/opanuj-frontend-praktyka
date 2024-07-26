import axios, { isAxiosError } from 'axios';

export class AxiosService implements HttpService {
  private httpService;

  constructor(baseURL: `https://${string}`) {
    this.httpService = axios.create({ baseURL: baseURL });
  }

  getAll = async () => {
    try {
      const response = await this.httpService.get('all');
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error('Failed to fetch countries with Axios error:', error);
        throw error; // or return [];
      }
      console.error('Failed to fetch countries with general error:', error);
      throw error; // or return [];}
    }
  };
  filter = async (path: string) => {
    try {
      const response = await this.httpService.get(path);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error('Failed to fetch countries with Axios error:', error);
        throw error; // or return [];
      }
      console.error('Failed to fetch countries with general error:', error);
      throw error; // or return
    }
  };
}