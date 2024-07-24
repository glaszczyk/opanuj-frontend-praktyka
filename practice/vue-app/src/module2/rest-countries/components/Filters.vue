<script setup lang="ts">

</script>

<template>
  <div class="filters-wrapper">
    <slot/>
  </div>
</template>

<style scoped>
.filters-wrapper {
  display: flex;
  column-gap: 1rem;
  margin: 1rem 0;
}

</style>