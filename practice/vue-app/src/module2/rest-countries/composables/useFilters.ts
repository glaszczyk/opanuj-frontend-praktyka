import { computed, ref, UnwrapRef } from 'vue';
import { FiltersConfig } from '../types/FiltersConfig.ts';

export const useFilters = <O>(filterOptions: FiltersConfig<O>) => {
  const defaultValue = filterOptions.filter(item => item.default)[0] || filterOptions[0];

  const filter = ref<{ option: O; filterValue: string }>(
    { option: defaultValue.option, filterValue: '' }
  );

  const isValidFilterValue = computed(() => {
    const lettersAndSpacesOnlyRegex = /^[a-zA-Z\s]*$/;
    return lettersAndSpacesOnlyRegex.test(filter.value.filterValue);
  });

  const isFilterButtonEnabled = computed(() =>
    filter.value.option === 'none' ||
    (filter.value.option !== 'none' &&
      filter.value.filterValue &&
      filter.value.filterValue.length > 2 &&
      isValidFilterValue.value)
  );

  const handleFilterChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    const filterOption = target.value as UnwrapRef<O>;
    if (filter.value.option === filterOption) {
      return;
    }
    filter.value = { option: filterOption, filterValue: '' };
  };

  return {
    filter,
    isValidFilterValue,
    isFilterButtonEnabled,
    handleFilterChange
  };

};