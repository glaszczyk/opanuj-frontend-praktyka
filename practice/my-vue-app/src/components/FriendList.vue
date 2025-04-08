<script setup lang="ts">
defineProps<{
  friends: Array<{
    id: number
    firstName: string
    lastName: string
  }>
}>()

const emit = defineEmits(['delete-friend'])

const handleDelete = (id: number) => {
  emit('delete-friend', id)
}
</script>

<template>
  <ul class="friend-list">
    <li v-for="friend in friends" :key="friend.id" class="friend-item">
      <span>{{ friend.firstName }} {{ friend.lastName }}</span>
      <button @click="handleDelete(friend.id)" class="delete-btn" aria-label="Delete friend">
        x
      </button>
    </li>
  </ul>
</template>

<style scoped>
.friend-list {
  list-style: none;
  padding: 0;
  max-width: 300px;
}

.friend-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid #ddd;
  margin-bottom: 0.5rem;
}

.delete-btn {
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-btn:hover {
  background: #cc0000;
}
</style>
