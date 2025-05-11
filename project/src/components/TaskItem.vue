<script setup lang="ts">
import { ref } from 'vue';
import type { Task } from '@/types/Task';
import { TaskService } from '@/services/TaskService';

const props = defineProps<{
  task: Task;
}>();

const emit = defineEmits(['taskUpdated', 'taskDeleted']);

const isEditing = ref(false);
const editedTitle = ref(props.task.title);
const editedDescription = ref(props.task.description);
const isLoading = ref(false);

const toggleTaskStatus = async () => {
  try {
    isLoading.value = true;
    const updatedTask = await TaskService.toggleTaskStatus(props.task.id);
    emit('taskUpdated', updatedTask);
  } catch (error) {
    console.error('Error toggling task status:', error);
  } finally {
    isLoading.value = false;
  }
};

const deleteTask = async () => {
  if (!confirm('Are you sure you want to delete this task?')) return;
  
  try {
    isLoading.value = true;
    await TaskService.deleteTask(props.task.id);
    emit('taskDeleted', props.task.id);
  } catch (error) {
    console.error('Error deleting task:', error);
  } finally {
    isLoading.value = false;
  }
};

const startEditing = () => {
  editedTitle.value = props.task.title;
  editedDescription.value = props.task.description;
  isEditing.value = true;
};

const cancelEditing = () => {
  isEditing.value = false;
};

const saveTask = async () => {
  if (!editedTitle.value.trim()) return;
  
  try {
    isLoading.value = true;
    const updatedTask = await TaskService.updateTask(props.task.id, {
      title: editedTitle.value,
      description: editedDescription.value
    });
    
    emit('taskUpdated', updatedTask);
    isEditing.value = false;
  } catch (error) {
    console.error('Error updating task:', error);
  } finally {
    isLoading.value = false;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};
</script>

<template>
  <div class="task-item card" :class="{ 'task-completed': task.completed }">
    <div class="card-body">
      <div v-if="!isEditing" class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            :checked="task.completed"
            @change="toggleTaskStatus"
            :disabled="isLoading"
            class="task-checkbox"
          />
          <div>
            <h3 class="task-title" :class="{ 'task-title-completed': task.completed }">
              {{ task.title }}
            </h3>
            <p class="task-description" v-if="task.description">
              {{ task.description }}
            </p>
            <p class="task-date">
              Created: {{ formatDate(task.createdAt) }}
              <span v-if="task.updatedAt">(Updated: {{ formatDate(task.updatedAt) }})</span>
            </p>
          </div>
        </div>
        <div class="task-actions flex gap-2">
          <button @click="startEditing" class="btn btn-ghost" :disabled="isLoading">
            <span class="material-icons">edit</span>
          </button>
          <button @click="deleteTask" class="btn btn-ghost" :disabled="isLoading">
            <span class="material-icons">delete</span>
          </button>
        </div>
      </div>

      <div v-else class="task-edit-form">
        <div class="form-group">
          <label for="taskTitle" class="form-label">Title</label>
          <input
            id="taskTitle"
            v-model="editedTitle"
            class="form-control"
            placeholder="Task title"
            :disabled="isLoading"
          />
        </div>
        <div class="form-group">
          <label for="taskDescription" class="form-label">Description</label>
          <textarea
            id="taskDescription"
            v-model="editedDescription"
            class="form-control"
            placeholder="Task description (optional)"
            rows="3"
            :disabled="isLoading"
          ></textarea>
        </div>
        <div class="flex gap-2 mt-4">
          <button @click="saveTask" class="btn btn-primary" :disabled="isLoading || !editedTitle.trim()">
            Save
          </button>
          <button @click="cancelEditing" class="btn btn-ghost" :disabled="isLoading">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-item {
  margin-bottom: 16px;
  animation: slideIn 0.3s ease;
}

.task-completed {
  border-left: 4px solid var(--success-500);
  background-color: var(--neutral-50);
}

.task-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  transition: all 0.2s ease;
}

.task-title-completed {
  text-decoration: line-through;
  color: var(--neutral-500);
}

.task-description {
  font-size: 14px;
  color: var(--neutral-600);
  margin: 4px 0;
}

.task-date {
  font-size: 12px;
  color: var(--neutral-500);
  margin: 4px 0 0;
}

.task-checkbox {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  cursor: pointer;
  accent-color: var(--primary-500);
}

.task-actions {
  opacity: 0.5;
  transition: opacity 0.2s ease;
}

.task-item:hover .task-actions {
  opacity: 1;
}

.material-icons {
  font-size: 18px;
  line-height: 1;
}

.task-edit-form {
  animation: fadeIn 0.3s ease;
}
</style>