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
          <div v-for="dir in selectedDirectoryContents" :key="dir.id" class="directory-item">
            <span class="folder-icon">📁</span>
            {{ dir.name }}
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
import { onMounted, computed } from 'vue';
import { useDirectoryStore } from '@/stores/directory';
import TreeNode from '@/components/TreeNode.vue';

const store = useDirectoryStore();

const loading = computed(() => store.loading);
const error = computed(() => store.error);
const rootDirectories = computed(() => store.rootDirectories);
const selectedDirectory = computed(() => store.selectedDirectory);
const selectedDirectoryContents = computed(() =>
  selectedDirectory.value
    ? store.getChildDirectories(selectedDirectory.value.id)
    : []
);

onMounted(async () => {
  await store.fetchDirectories();
});
</script>

<style scoped>
.file-explorer {
  display: flex;
  height: 100vh;
  border: 1px solid #ccc;
}

.left-panel {
  width: 300px;
  border-right: 1px solid #ccc;
  overflow: auto;
  padding: 16px;
}

.right-panel {
  flex: 1;
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

.directory-item {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
}

.directory-item:hover {
  background-color: #f0f0f0;
}

.folder-icon {
  margin-right: 8px;
}
</style>