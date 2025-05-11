<script setup lang="ts">
import { ref } from 'vue';
import { TaskService } from '@/services/TaskService';
import type { TaskCreateInput } from '@/types/Task';

const emit = defineEmits(['taskCreated']);

const title = ref('');
const description = ref('');
const isLoading = ref(false);
const error = ref('');

const createTask = async () => {
  if (!title.value.trim()) {
    error.value = 'Task title is required';
    return;
  }
  
  error.value = '';
  isLoading.value = true;
  
  try {
    const taskData: TaskCreateInput = {
      title: title.value.trim(),
      description: description.value.trim()
    };
    
    const newTask = await TaskService.createTask(taskData);
    emit('taskCreated', newTask);
    
    // Reset form
    title.value = '';
    description.value = '';
  } catch (err) {
    console.error('Error creating task:', err);
    error.value = 'Failed to create task. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="task-form card mb-4">
    <div class="card-header">
      <h2>Add New Task</h2>
    </div>
    <div class="card-body">
      <form @submit.prevent="createTask">
        <div class="form-group">
          <label for="title" class="form-label">Title</label>
          <input
            id="title"
            v-model="title"
            class="form-control"
            placeholder="What needs to be done?"
            :disabled="isLoading"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="description" class="form-label">Description (optional)</label>
          <textarea
            id="description"
            v-model="description"
            class="form-control"
            placeholder="Add details about this task"
            rows="3"
            :disabled="isLoading"
          ></textarea>
        </div>
        
        <div v-if="error" class="error-message mb-2">{{ error }}</div>
        
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="isLoading || !title.trim()"
        >
          <span v-if="isLoading">Adding...</span>
          <span v-else>Add Task</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.task-form {
  background-color: white;
  transition: all 0.3s ease;
}

.task-form:focus-within {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.error-message {
  color: var(--error-600);
  font-size: 14px;
  padding: 4px 0;
}
</style>