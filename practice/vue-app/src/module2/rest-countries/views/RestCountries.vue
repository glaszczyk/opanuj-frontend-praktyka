<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useFilters } from '../composables/useFilters.ts';
import { Country } from '../types/Country.ts';
import { FiltersConfig } from '../types/FiltersConfig.ts';
import { FilterType } from '../types/FilterType.ts';
import Countries from '../components/Countries.vue';
import Filters from '../components/Filters.vue';
import { useCountries } from '../composables/useCountries.ts';

const filterOptions: FiltersConfig<FilterType> = [
  { option: 'none', label: 'All countries', default: true },
  { option: 'name', label: 'Country name' },
  { option: 'capital', label: 'Capital' },
  { option: 'lang', label: 'Language' },
  { option: 'currency', label: 'Currency' }
];

const data = ref<Country[]>([]);
const { filter, isFilterButtonEnabled, isValidFilterValue, handleFilterChange } = useFilters<FilterType>(filterOptions);
const { getAll, getBy } = useCountries();

onMounted(async () => {
  data.value = await getAll();
});

const handleFilterData = async () => {
  if (filter.value.option === 'none') {
    data.value = await getAll();
  } else {
    const path = `${filter.value.option}/${filter.value.filterValue}`;
    data.value = await getBy(path);
  }
};
</script>

<template>
  <div>
    <h1>Rest Countries</h1>
    <div>
      <Filters>
        <div class="input-wrapper">
          <label for="currency">Display:</label>
          <select @change="handleFilterChange">
            <option v-for="item in filterOptions" :key="item.option" :value="item.option"
                    :selected="item.option === filter.option">{{ item.label }}
            </option>
          </select>
        </div>
        <div class="input-wrapper">
          <label for="filter-value"> With value</label>
          <input :disabled="filter.option==='none'" id="filter-value" :class="{error: !isValidFilterValue }"
                 v-model="filter.filterValue" />
        </div>
        <button :disabled="!isFilterButtonEnabled" @click="handleFilterData">Get!</button>
      </Filters>
      <Countries :data="data" />
    </div>
  </div>
</template>


<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 200px;
}

.error {
  border: 2px solid red;
}
</style>
