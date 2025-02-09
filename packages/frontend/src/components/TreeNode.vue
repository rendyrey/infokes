// src/components/TreeNode.vue
<template>
    <div class="tree-node">
        <div class="node-content" :class="{ 'selected': isSelected }" @click="selectDirectory">
            <span class="expand-icon" v-if="hasChildren" @click="toggleExpand">
                {{ isExpanded ? '▼' : '▶' }}
            </span>
            <span class="folder-icon"><font-awesome-icon icon="fa-solid fa-folder" /></span>
            {{ directory.name }}
        </div>
        <div v-if="isExpanded && hasChildren" class="children">
            <TreeNode v-for="child in childDirectories" :key="child.id" :directory="child" class="child-node" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Directory } from '@/types/directory';
import { useDirectoryStore } from '@/stores/directory';

const props = defineProps<{
    directory: Directory;
}>();

const store = useDirectoryStore();
const isExpanded = ref(false);

const hasChildren = computed(() =>
    store.hasChildren(props.directory.id)
);

const childDirectories = computed(() =>
    store.getChildDirectories(props.directory.id)
);

const isSelected = computed(() =>
    store.selectedDirectory?.id === props.directory.id
);

const toggleExpand = () => {
    isExpanded.value = !isExpanded.value;
};

const selectDirectory = () => {
    store.setSelectedDirectory(props.directory);
};
</script>

<style scoped>
.tree-node {
    padding: 2px 0;
}

.node-content {
    display: flex;
    align-items: center;
    padding: 4px 8px;
    cursor: pointer;
    user-select: none;
}

.node-content:hover {
    background-color: #f0f0f0;
}

.node-content.selected {
    background-color: #e0e0e0;
}

.expand-icon {
    margin-right: 4px;
    font-size: 12px;
    width: 12px;
}

.folder-icon {
    margin-right: 8px;
}

.children {
    margin-left: 20px;
}

.child-node {
    border-left: 1px solid #e0e0e0;
}
</style>