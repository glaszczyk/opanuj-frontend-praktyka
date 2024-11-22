<script setup lang="ts">
import { ref } from 'vue';
import { Country } from '../types/Country.ts';
import { SortFields, SortOptions } from '../types/SortOptions.ts';

type CountriesProps = {
  data: Country[];
}

const emit = defineEmits<{
  (e: 'handle-sort', sortOptions: SortOptions): void;
}>();

const props = defineProps<CountriesProps>();
const nameSortOptions = ref<SortOptions>({ field: 'name', sortOrder: 'off' });
const populationSortOptions = ref<SortOptions>({ field: 'population', sortOrder: 'off' });

const languageList = (languages: Country['languages']) => {
  if (!languages) {
    return '';
  }
  return Object.values(languages).map((language) => language).join(', ');
};

const changeSort = (field: SortFields) => {
  const sortOptions = field === 'name' ? nameSortOptions : populationSortOptions;
  const otherSortOptions = field === 'name' ? populationSortOptions : nameSortOptions;

  if (otherSortOptions.value.sortOrder !== 'off') {
    otherSortOptions.value.sortOrder = 'off';
  }

  sortOptions.value.sortOrder =
    sortOptions.value.sortOrder === 'asc' ? 'desc' :
      sortOptions.value.sortOrder === 'desc' ? 'off' : 'asc';

  emit('handle-sort', { field, sortOrder: sortOptions.value.sortOrder });
};

</script>

<template>
  <div v-if="!data.length">No data...</div>
  <table v-else>
    <thead>
    <tr>
      <td>Name
        <div>
          <button @click="changeSort('name')">{{ nameSortOptions.sortOrder }}</button>
        </div>
      </td>
      <td>Capital</td>
      <td>Population
        <div>
          <button @click="changeSort('population')">{{ populationSortOptions.sortOrder }}</button>
        </div>
      </td>
      <td>Flag</td>
      <td>Currency</td>
      <td>Languages</td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="{capital, name: {common}, currencies, flag, languages, population} in props.data" :key="common">
      <td>{{ common }}</td>
      <td>{{ capital?.join(', ') }}</td>
      <td>{{ population }}</td>
      <td>{{ flag }}</td>
      <td><span v-for="currency in currencies">{{ currency.name }}</span></td>
      <td>{{ languageList(languages) }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>