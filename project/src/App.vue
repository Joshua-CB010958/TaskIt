<script setup lang="ts">
import { ref } from 'vue';
import TaskList from './components/TaskList.vue';

const title = ref('TaskIt');
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <div class="container">
        <h1 class="app-title">{{ title }}</h1>
        <p class="app-subtitle">Manage your tasks efficiently</p>
      </div>
    </header>
    
    <main class="app-main">
      <div class="container">
        <TaskList />
      </div>
    </main>
    
    <footer class="app-footer">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} TaskIt</p>
      </div>
    </footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  max-width: 100%;
  margin: 0;
  padding: 0;
  text-align: left;
}
</style>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: linear-gradient(135deg, var(--primary-600), var(--secondary-600));
  color: white;
  padding: 48px 0 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  text-align: center;
}

.app-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0;
  animation: fadeIn 0.5s ease;
}

.app-subtitle {
  font-size: 1.125rem;
  opacity: 0.9;
  margin: 8px 0 0;
  animation: fadeIn 0.5s ease 0.2s both;
}

.app-main {
  flex: 1;
  padding: 32px 0;
  background-color: var(--neutral-50);
}

.app-footer {
  background-color: var(--neutral-800);
  color: var(--neutral-200);
  padding: 24px 0;
  font-size: 0.875rem;
  text-align: center;
}

@media (max-width: 640px) {
  .app-header {
    padding: 32px 0 16px;
  }
  
  .app-title {
    font-size: 1.75rem;
  }
  
  .app-subtitle {
    font-size: 1rem;
  }
  
  .app-main {
    padding: 24px 0;
  }
}
</style>