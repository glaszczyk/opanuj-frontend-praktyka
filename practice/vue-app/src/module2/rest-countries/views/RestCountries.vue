<script setup lang="ts">
import Countries from '../components/Countries.vue';
import Filters from '../components/Filters.vue';
import { useCountries } from '../composables/useCountries.ts';
import { filterOptions } from '../consts/filterOptions.ts';

const { handleFilterData, handleSortData, data, filter } = useCountries(filterOptions);

</script>

<template>
  <div>
    <h1>Rest Countries</h1>
    <div>
      <Filters v-model="filter" @handle-filter="handleFilterData">
        <option v-for="item in filterOptions" :key="item.option" :value="item.option"
                :selected="item.option === filter.option">{{ item.label }}
        </option>
      </Filters>
      <Countries :data="data" @handle-sort="handleSortData" />
    </div>
  </div>
</template>

<style scoped>
</style>
