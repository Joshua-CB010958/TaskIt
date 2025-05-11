<script setup lang="ts">
import { ref, watch } from 'vue';
import type { TaskFilter } from '@/types/Task';

const props = defineProps<{
  activeFilter: TaskFilter;
}>();

const emit = defineEmits(['filterChange']);

const filters: { value: TaskFilter; label: string }[] = [
  { value: 'all', label: 'All Tasks' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' }
];

const selectedFilter = ref(props.activeFilter);

watch(selectedFilter, (newValue) => {
  emit('filterChange', newValue);
});
</script>

<template>
  <div class="task-filter mb-4">
    <div class="filter-buttons">
      <button
        v-for="filter in filters"
        :key="filter.value"
        class="btn btn-ghost filter-btn"
        :class="{ active: selectedFilter === filter.value }"
        @click="selectedFilter = filter.value"
      >
        {{ filter.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.task-filter {
  padding: 8px 0;
  border-bottom: 1px solid var(--neutral-200);
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-btn {
  border-radius: 16px;
  padding: 6px 16px;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
}

.filter-btn.active {
  background-color: var(--primary-100);
  color: var(--primary-700);
}

@media (max-width: 640px) {
  .filter-buttons {
    justify-content: center;
  }
}
</style>