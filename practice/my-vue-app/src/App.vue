<script setup lang="ts">
import { ref } from 'vue'
import AddFriend from './components/AddFriend.vue'
import FriendList from './components/FriendList.vue'

type Friend = {
  id: number
  firstName: string
  lastName: string
}

const friends = ref<Friend[]>([])

const addFriend = (friend: Omit<Friend, 'id'>) => {
  friends.value.push({
    ...friend,
    id: Date.now(),
  })
}

const deleteFriend = (id: number) => {
  friends.value = friends.value.filter((friend) => friend.id !== id)
}
</script>

<template>
  <div class="app">
    <h1>Friends List</h1>
    <AddFriend @add-friend="addFriend" />
    <FriendList :friends="friends" @delete-friend="deleteFriend" />
  </div>
</template>

<style>
.app {
  font-family: Arial, sans-serif;
  padding: 2rem;
}
</style>
