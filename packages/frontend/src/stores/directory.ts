import { defineStore } from 'pinia'
import axios from 'axios'
import type { Directory } from '@/types/directory'

interface DirectoryState {
  directories: Directory[]
  selectedDirectory: Directory | null
  loading: boolean
  error: string | null
}

export const useDirectoryStore = defineStore('directory', {
  state: (): DirectoryState => ({
    directories: [],
    selectedDirectory: null,
    loading: false,
    error: null,
  }),
  getters: {
    rootDirectories: (state) => state.directories.filter((dir) => dir.parent_id === null),

    getChildDirectories: (state) => (parentId: number) =>
      state.directories.filter((dir) => dir.parent_id === parentId),

    hasChildren: (state) => (directoryId: number) =>
      state.directories.some((dir) => dir.parent_id === directoryId),
  },
  actions: {
    async fetchDirectories() {
      this.loading = true
      try {
        const response = await axios.get('http://localhost:3000/api/v1/directories')
        console.log(response.data)
        this.directories = response.data.data;
      } catch (error) {
        this.error = 'Failed to fetch directories'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    setSelectedDirectory(directory: Directory | null) {
      this.selectedDirectory = directory
    },
  },
})
