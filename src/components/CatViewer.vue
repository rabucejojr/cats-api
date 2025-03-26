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
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white p-6">
    <div class="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-2xl shadow-lg text-center">
      <h2 class="text-3xl font-extrabold mb-4 text-white drop-shadow-lg">🐱 Random Cat Generator</h2>

      <button
        @click="fetchRandom"
        :disabled="loading"
        class="px-6 py-3 bg-yellow-400 text-gray-800 font-bold rounded-full shadow-lg transition-all hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {{ loading ? 'Fetching...' : 'Get a Cute Cat 😻' }}
      </button>

      <p v-if="loading" class="mt-4 text-lg font-medium animate-pulse">Loading...</p>
      <p v-if="error" class="mt-4 text-lg text-red-500 font-semibold">{{ error }}</p>

      <div v-if="cats.length" class="mt-6">
        <img
          :src="cats[0]"
          alt="Random Cat"
          class="w-80 h-80 object-cover rounded-2xl shadow-2xl border-4 border-white hover:scale-105 transition-all duration-300"
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
