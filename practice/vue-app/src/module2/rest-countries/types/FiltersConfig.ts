export type FiltersConfig<O> = {
  option: O;
  default?: boolean;
  [key: string]: any;
}[];
