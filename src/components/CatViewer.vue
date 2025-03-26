<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useCatStore } from '@/stores/catStore'

const catStore = useCatStore()

const cats = computed(() => catStore.cats)
const loading = computed(() => catStore.loading)
const error = computed(() => catStore.error)

const fetchRandom = () => {
  catStore.fetchRandomCat()
}

onMounted(() => {
  fetchRandom()
})
</script>

<template>
  <div>
    <h2>Random Cat</h2>
    <button @click="fetchRandom" :disabled="loading">Get New Cat</button>
    <p v-if="loading">Loading...</p>
    <p v-if="error" class="error">{{ error }}</p>
    <img v-if="cats.length" :src="cats[0]" alt="Random Cat" style="max-width: 300px;">
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>
