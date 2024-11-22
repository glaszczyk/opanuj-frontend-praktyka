import { Country } from './Country.ts';

export type SortOrder = 'asc' | 'desc' | 'off';

export type SortFields = Extract<keyof Country, 'name' | 'population'>;

export type SortOptions = {
  field: SortFields, sortOrder: SortOrder
}