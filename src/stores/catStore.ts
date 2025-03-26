import { defineStore } from 'pinia'
import axios from 'axios'

interface Cat {
  id: string;
  tags: string[];
  mimetype: string;
  createdAt: string;
}

export const useCatStore = defineStore('catStore', {
  state: () => ({
    cats: [] as string[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchRandomCat() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get<Cat>('https://cataas.com/cat?json=true')
        this.cats = [`https://cataas.com/cat/${response.data.id}`]
      } catch {
        this.error = 'Failed to fetch cat image'
      } finally {
        this.loading = false
      }
    },
    async fetchCatsByTag(tag: string) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get<Cat[]>(`https://cataas.com/api/cats?tags=${tag}`)
        this.cats = response.data.map(cat => `https://cataas.com/cat/${cat.id}`)
      } catch {
        this.error = 'Failed to fetch cat images'
      } finally {
        this.loading = false
      }
    }
  }
})
