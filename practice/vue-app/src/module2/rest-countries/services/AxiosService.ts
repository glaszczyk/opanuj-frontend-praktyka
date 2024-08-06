import axios, { isAxiosError } from 'axios';

export class AxiosService implements HttpService {
  private httpService;

  constructor(baseURL: `https://${string}`) {
    this.httpService = axios.create({ baseURL: baseURL });
    this.interceptResponse();
  }

  interceptResponse = () => {
    this.httpService.interceptors.response.use(
      (response) => {
        console.log('Incoming response', response);
        return response;
      },
      (error) => {
        if (isAxiosError(error)) {
          console.error(`Axios error intercepted`, error);
        } else {
          console.error('General error intercepted:', error);
        }
        return Promise.reject(error);
      }
    );
  };

  getAll = async () => {
    try {
      const response = await this.httpService.get('all');
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        console.log(error.response?.data);
      }
      return [];
    }
  };

  filter = async (path: string) => {
    try {
      const response = await this.httpService.get(path);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        console.log(error.response?.data);
      }
      return [];
    }
  };
}