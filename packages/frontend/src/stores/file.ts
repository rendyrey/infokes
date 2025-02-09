import { defineStore } from 'pinia'
import axios from 'axios'
import type { File } from '@/types/file'

interface FileState {
  files: File[]
  loading: boolean
  error: string | null
}

export const useFileStore = defineStore('file', {
  state: (): FileState => ({
    files: [],
    loading: false,
    error: null,
  }),
  getters: {
    getDirectoryFiles: (state) => (directoryId: number) =>
      state.files.filter((file) => file.directory_id === directoryId),
  },
  actions: {
    async fetchDirectoryFiles(directoryId: number) {
      this.loading = true
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/files/${directoryId}`)
        this.files = response.data
      } catch (error) {
        this.error = 'Failed to fetch files'
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
})
