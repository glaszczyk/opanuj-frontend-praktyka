export type FiltersConfig<O> = {
  option: O;
  label: string;
  default?: boolean;
  [key: string]: any;
}[];
