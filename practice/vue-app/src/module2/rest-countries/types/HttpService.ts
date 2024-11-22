interface HttpService {
  interceptResponse?: () => void;
  getAll: () => Promise<any>;
  filter: (path: string) => Promise<any>;
}