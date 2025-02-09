<template>
    <div class="file-node">
      <span class="file-icon">
        <font-awesome-icon icon="fa-solid fa-file" />
      </span>
      <span class="file-name">{{ file.name }}.{{ file.file_type }}</span>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { File } from '@/types/file';
  
  defineProps<{
    file: File;
  }>();
  </script>
  
  <style scoped>
  .file-node {
    display: flex;
    align-items: center;
    padding: 4px 8px 4px 28px;
    cursor: pointer;
    user-select: none;
  }
  
  .file-node:hover {
    background-color: #f0f0f0;
  }
  
  .file-icon {
    margin-right: 8px;
    color: #666;
  }
  
  .file-name {
    font-size: 0.9em;
  }
  </style>