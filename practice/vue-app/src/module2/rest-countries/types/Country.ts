export type Country = {
  name: { common: string, official: string };
  capital: string[];
  flag: `https://${string}`
  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];
  languages: Record<string, string>,
  population: number;
};