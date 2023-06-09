import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const noteStore = defineStore('Notes', {
  actions: {
    async fetchRecipe() {
      return (await axios.get('/recipe')).data
    },
    async fetchRecipeById(id) {
      return (await axios.get(`/recipe/${id}`)).data
    },
    async addNoteById(id) {
      return (await axios.post(`${id}`)).data
    }
  }
})
