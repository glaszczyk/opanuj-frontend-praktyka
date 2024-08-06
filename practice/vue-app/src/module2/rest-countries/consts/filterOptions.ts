import { FiltersConfig } from '../types/FiltersConfig.ts';
import { FilterType } from '../types/FilterType.ts';

export const filterOptions: FiltersConfig<FilterType> = [
{ option: 'none', label: 'All countries', default: true },
{ option: 'name', label: 'Country name' },
{ option: 'capital', label: 'Capital' },
{ option: 'lang', label: 'Language' },
{ option: 'currency', label: 'Currency' }
];
