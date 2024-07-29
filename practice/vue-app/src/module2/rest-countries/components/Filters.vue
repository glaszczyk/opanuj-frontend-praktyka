<script setup lang="ts">
import { computed } from 'vue';
import { FilterModel } from '../types/FilterModel.ts';
import { FilterType } from '../types/FilterType.ts';

const filter = defineModel<FilterModel>({required: true});
const emit = defineEmits(['handleFilter']);

const handleFilterChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const filterOption = target.value as FilterType;
  if (filter.value.option === filterOption) {
    return;
  }
  filter.value = { option: filterOption, filterValue: '' };
};

const isValidFilterValue = computed(() => {
  const lettersAndSpacesOnlyRegex = /^[a-zA-Z\s]*$/;
  return lettersAndSpacesOnlyRegex.test(filter.value.filterValue);
});

const isFilterButtonEnabled = computed(() =>
  filter.value.option === 'none' ||
  (filter.value.filterValue &&
    filter.value.filterValue.length > 2 &&
    isValidFilterValue.value)
);

</script>

<template>
  <div class="filters-wrapper">
    <div class="input-wrapper">
      <label for="currency">Display:</label>
      <select @change="handleFilterChange">
        <slot />
      </select>
    </div>
    <div class="input-wrapper">
      <label for="filter-value"> With value</label>
      <input :disabled="filter.option==='none'" id="filter-value" :class="{error: !isValidFilterValue }"
             v-model="filter.filterValue" />
    </div>
    <button :disabled="!isFilterButtonEnabled" @click="emit('handleFilter')">Get!</button>
  </div>
</template>

<style scoped>
.filters-wrapper {
  display: flex;
  column-gap: 1rem;
  margin: 1rem 0;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 200px;
}

.error {
  border: 2px solid red;
}

</style>