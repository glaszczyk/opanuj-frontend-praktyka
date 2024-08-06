import { onMounted, ref } from 'vue';
import { AxiosService } from '../services/AxiosService.ts';
import { Country } from '../types/Country.ts';
import { FilterModel } from '../types/FilterModel.ts';
import { FiltersConfig } from '../types/FiltersConfig.ts';
import { FilterType } from '../types/FilterType.ts';
import { SortOptions } from '../types/SortOptions.ts';

const BASE_URL = 'https://restcountries.com/v3.1/';

export const useCountries = (filterOptions: FiltersConfig<FilterType>) => {
    const httpService = new AxiosService(BASE_URL);
    const fetchedData = ref<Country[]>([]);
    const data = ref<Country[]>([]);
    const defaultValue = filterOptions.filter(item => item.default)[0] || filterOptions[0];

    const filter = ref<FilterModel>(
      { option: defaultValue.option, filterValue: '' }
    );


    const getAll = async () => await httpService.getAll();

    const getBy = async (path: string) => await httpService.filter(path);

    const clone = (list: any[]) => [...list];

    onMounted(async () => {
      fetchedData.value = await getAll();
      data.value = clone(fetchedData.value);
    });

    const handleFilterData = async () => {
      if (filter.value.option === 'none') {
        fetchedData.value = await getAll();
      } else {
        const path = `${filter.value.option}/${filter.value.filterValue}`;
        fetchedData.value = await getBy(path);
      }
      data.value = clone(fetchedData.value);
    };

  const sortData = ({ field, sortOrder }: SortOptions) => {
    const clonedFetchedData = clone(fetchedData.value);
    if (sortOrder === 'off') {
      data.value = clonedFetchedData;
      return;
    }

    const compare = (a: Country, b: Country) => {
      if (field === 'population') {
        return sortOrder === 'asc' ? a.population - b.population : b.population - a.population;
      }
      return sortOrder === 'asc' ? a.name.common.localeCompare(b.name.common) : b.name.common.localeCompare(a.name.common);
    };

    data.value = clonedFetchedData.sort(compare);
  };

    const handleSortData = (sortOptions: SortOptions) => {
      sortData(sortOptions);
    };

    return {
      handleFilterData, handleSortData, data, filter
    };

  }
;