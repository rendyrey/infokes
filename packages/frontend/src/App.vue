<template>
  <div class="file-explorer">
    <div class="left-panel">
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="tree-view">
        <TreeNode v-for="directory in rootDirectories" :key="directory.id" :directory="directory" />
      </div>
    </div>
    <div class="right-panel">
      <template v-if="selectedDirectory">
        <h2>Contents of {{ selectedDirectory.name }}</h2>
        <div class="directory-contents">
          <!-- Directories -->
          <div v-for="dir in selectedDirectoryContents" :key="dir.id" class="directory-item">
            <span class="folder-icon"><font-awesome-icon icon="fa-solid fa-folder" /></span>
            {{ dir.name }}
          </div>
          <!-- Files -->
          <div v-if="fileStore.loading" class="loading">Loading files...</div>
          <div v-else-if="fileStore.error" class="error">{{ fileStore.error }}</div>
          <div v-else v-for="file in directoryFilesContents" :key="file.id" class="file-item">
            <span class="file-icon">
              <font-awesome-icon :icon="getIconType(file.file_type)" />
            </span>
            {{ file.name }}.{{ file.file_type }}
          </div>
        </div>
      </template>
      <div v-else class="no-selection">
        Select a directory to view its contents
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, watch, ref } from 'vue';
import { useDirectoryStore } from '@/stores/directory';
import { useFileStore } from '@/stores/file';
import TreeNode from '@/components/TreeNode.vue';

const store = useDirectoryStore();
const fileStore = useFileStore();

const loading = computed(() => store.loading);
const error = computed(() => store.error);

const getIconType = (fileType: string): string => {
  switch (fileType) {
    case 'txt':
      return 'fa-solid fa-file-text';
    case 'doc':
    case 'docx':
      return 'fa-solid fa-file-word';
    case 'jpg':
    case 'png':
    case 'jpeg':
    case 'bmp':
      return 'fa-solid fa-file-image';
    default:
      return `fa-solid fa-file-${fileType}`;
  }
}

const rootDirectories = computed(() => {
  return store.rootDirectories;
});
const selectedDirectory = computed(() => store.selectedDirectory);
const selectedDirectoryContents = computed(() =>
  selectedDirectory.value
    ? store.getChildDirectories(selectedDirectory.value.id)
    : []
);

const directoryFilesContents = computed(() => {
  return fileStore.files;
});

// Watch for changes in selected directory
watch(selectedDirectory, async (newDirectory) => {
  if (newDirectory) {
    await fileStore.fetchDirectoryFiles(newDirectory.id);
  }
});

onMounted(async () => {
  await store.fetchDirectories();
});
</script>

<style scoped>
.file-explorer {
  display: flex;
  height: 100vh;
  width: 100vw;
  border: 1px solid #ccc;
}

.left-panel {
  flex: 3;
  border-right: 1px solid #ccc;
  overflow: auto;
  padding: 16px;
}

.right-panel {
  flex: 7;
  padding: 16px;
  overflow: auto;
}

.loading,
.error,
.no-selection {
  padding: 16px;
  color: #666;
}

.error {
  color: #ff4444;
}

.directory-contents {
  margin-top: 16px;
}

.directory-item,
.file-item {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  margin-bottom: 4px;
  border-radius: 4px;
}

.directory-item:hover,
.file-item:hover {
  background-color: #f0f0f0;
}

.folder-icon,
.file-icon {
  margin-right: 8px;
  width: 20px;
}

.file-icon {
  color: #666;
}
</style>