<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Country } from '../types/Country.ts';
import { FilterType } from '../types/FilterType.ts';
import Countries from '../components/Countries.vue';
import Filters from '../components/Filters.vue';
import { useCountries } from '../composables/useCountries.ts';

const { getAll } = useCountries();

const data = ref<Country[]>([]);
const filter = ref<{ option: FilterType, filterValue: string }>({ option: 'none', filterValue: '' });
const filterOptions: {key: FilterType, label: string}[] = [
  { key: 'none', label: 'No filters' },
  { key: 'country', label: 'Country name' },
  { key: 'capital', label: 'Capital' },
  { key: 'language', label: 'Language' },
  { key: 'currency', label: 'Currency' }
];

const isValidFilterValue = computed(() => {
  const lettersAndSpacesOnlyRegex = /^[a-zA-Z\s]*$/;
  return lettersAndSpacesOnlyRegex.test(filter.value.filterValue);
});


const isFilterDisabled = computed(() => filter.value.option === 'none' || !filter.value.filterValue || filter.value.filterValue.length < 3 || !isValidFilterValue);

const handleFilterChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const filterOption = target.value as FilterType;
  if (filter.value.option === filterOption) {
    return;
  }
  filter.value = { option: filterOption, filterValue: '' };
};

onMounted(async () => {
  data.value = await getAll();
});
</script>

<template>
  <div>
    <h1>Rest Countries</h1>
    <div>
      <Filters>
        <div class="input-wrapper">
          <label for="currency">Filter by:</label>
          <select @change="handleFilterChange">
            <option v-for="option in filterOptions" :key="option.key" :value="option.key"
                    :selected="option.key === filter.option">{{ option.label }}
            </option>
          </select>
        </div>
        <div class="input-wrapper">
          <label for="filter-value">Value</label>
          <input :disabled="filter.option==='none'" id="filter-value" :class="{error: !isValidFilterValue }" v-model="filter.filterValue" />
        </div>
        <button :disabled="isFilterDisabled">Filter!</button>
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
