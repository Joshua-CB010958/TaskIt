<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Task, TaskFilter } from '@/types/Task';
import { TaskService } from '@/services/TaskService';
import TaskItem from './TaskItem.vue';
import TaskForm from './TaskForm.vue';
import TaskFilterComponent from './TaskFilter.vue'; // ✅ Renamed to avoid conflict

const tasks = ref<Task[]>([]);
const isLoading = ref(true);
const error = ref('');
const activeFilter = ref<TaskFilter>('all');

const fetchTasks = async () => {
  try {
    isLoading.value = true;
    error.value = '';
    
    const filter = activeFilter.value === 'all' ? undefined : activeFilter.value;
    tasks.value = await TaskService.getAllTasks(filter);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    error.value = 'Failed to load tasks. Please try again.';
    tasks.value = [];
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchTasks);

const handleTaskCreated = (newTask: Task) => {
  if (activeFilter.value === 'completed') {
    fetchTasks();
  } else {
    tasks.value = [newTask, ...tasks.value];
  }
};

const handleTaskUpdated = (updatedTask: Task) => {
  const taskIndex = tasks.value.findIndex(t => t.id === updatedTask.id);
  
  if (taskIndex !== -1) {
    if (
      (activeFilter.value === 'active' && updatedTask.completed) ||
      (activeFilter.value === 'completed' && !updatedTask.completed)
    ) {
      tasks.value = tasks.value.filter(t => t.id !== updatedTask.id);
    } else {
      tasks.value[taskIndex] = updatedTask;
    }
  }
};

const handleTaskDeleted = (taskId: string) => {
  tasks.value = tasks.value.filter(t => t.id !== taskId);
};

const handleFilterChange = (filter: TaskFilter) => {
  activeFilter.value = filter;
  fetchTasks();
};

const statusMessage = computed(() => {
  if (isLoading.value) return 'Loading tasks...';
  if (error.value) return error.value;
  if (tasks.value.length === 0) {
    return activeFilter.value === 'all'
      ? 'No tasks yet. Add your first task above!'
      : activeFilter.value === 'active'
        ? 'No active tasks. All tasks are completed!'
        : 'No completed tasks yet.';
  }
  return '';
});
</script>

<template>
  <div class="task-list-container">
    <TaskForm @taskCreated="handleTaskCreated" />
    
    <TaskFilterComponent
      :activeFilter="activeFilter"
      @filterChange="handleFilterChange"
    />
    
    <div v-if="isLoading" class="loading-spinner">
      <div class="spinner"></div>
    </div>
    
    <div v-else-if="statusMessage" class="status-message">
      {{ statusMessage }}
    </div>
    
    <div v-else class="task-list">
      <transition-group name="task-list">
        <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @taskUpdated="handleTaskUpdated"
          @taskDeleted="handleTaskDeleted"
        />
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
.task-list-container {
  padding: 16px 0;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
}

.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: var(--primary-500);
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.status-message {
  text-align: center;
  padding: 32px 0;
  color: var(--neutral-500);
  font-size: 16px;
}

.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.3s ease;
}

.task-list-enter-from,
.task-list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.task-list-move {
  transition: transform 0.5s ease;
}
</style>
