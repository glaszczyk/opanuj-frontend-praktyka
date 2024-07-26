interface HttpService {
  getAll: () => Promise<any>;
  filter: (path: string) => Promise<any>;
}