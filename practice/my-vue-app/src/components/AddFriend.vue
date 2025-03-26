<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['add-friend'])

const firstName = ref('')
const lastName = ref('')

const handleSubmit = () => {
  if (!firstName.value.trim() || !lastName.value.trim()) return

  emit('add-friend', {
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    id: Date.now(), // simple unique ID
  })

  firstName.value = ''
  lastName.value = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="add-friend-form">
    <div>
      <label for="firstName">First Name:</label>
      <input id="firstName" v-model="firstName" type="text" required />
    </div>
    <div>
      <label for="lastName">Last Name:</label>
      <input id="lastName" v-model="lastName" type="text" required />
    </div>
    <button type="submit">Add Friend</button>
  </form>
</template>

<style scoped>
.add-friend-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  margin-bottom: 2rem;
}

.add-friend-form div {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.add-friend-form input {
  padding: 0.5rem;
}
</style>
