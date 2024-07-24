<script setup lang="ts">
import { Country } from '../types/Country.ts';

type CountriesProps = {
  data: Country[];
}

const props = defineProps<CountriesProps>();

const languageList = (languages: Country['languages']) => {
  if (!languages) {
    return '';
  }
  return Object.values(languages).map((language) => language).join(', ');
};
</script>

<template>
  <div v-if="!data.length">No data...</div>
  <table v-else>
    <thead>
    <tr>
      <td>Name</td>
      <td>Capital</td>
      <td>Population</td>
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
      <td>{{flag}}</td>
      <td><span v-for="currency in currencies">{{currency.name}}</span> </td>
      <td>{{languageList(languages)}}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>