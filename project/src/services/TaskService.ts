import axios from 'axios';
import type { Task, TaskCreateInput, TaskUpdateInput } from '@/types/Task';

const API_URL = 'http://localhost:3000/api/tasks';

export const TaskService = {
  async getAllTasks(filter?: string): Promise<Task[]> {
    const params = filter ? { status: filter } : {};
    const response = await axios.get<Task[]>(API_URL, { params });
    return response.data;
  },

  async getTaskById(id: string): Promise<Task> {
    const response = await axios.get<Task>(`${API_URL}/${id}`);
    return response.data;
  },

  async createTask(task: TaskCreateInput): Promise<Task> {
    const response = await axios.post<Task>(API_URL, task);
    return response.data;
  },

  async updateTask(id: string, task: TaskUpdateInput): Promise<Task> {
    const response = await axios.put<Task>(`${API_URL}/${id}`, task);
    return response.data;
  },

  async toggleTaskStatus(id: string): Promise<Task> {
    const response = await axios.patch<Task>(`${API_URL}/${id}/toggle`);
    return response.data;
  },

  async deleteTask(id: string): Promise<Task> {
    const response = await axios.delete<Task>(`${API_URL}/${id}`);
    return response.data;
  }
};