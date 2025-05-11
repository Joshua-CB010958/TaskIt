import { v4 as uuidv4 } from 'uuid';
import { tasks } from '../models/taskModel.js';

// GET all tasks
export const getAllTasks = (req, res) => {
  const { status } = req.query;
  
  let filteredTasks = [...tasks];
  
  if (status === 'active') {
    filteredTasks = filteredTasks.filter(task => !task.completed);
  } else if (status === 'completed') {
    filteredTasks = filteredTasks.filter(task => task.completed);
  }
  
  res.status(200).json(filteredTasks);
};

// GET task by ID
export const getTaskById = (req, res) => {
  const { id } = req.params;
  const task = tasks.find(task => task.id === id);
  
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  res.status(200).json(task);
};

// POST create task
export const createTask = (req, res) => {
  const { title, description } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'Task title is required' });
  }
  
  const newTask = {
    id: uuidv4(),
    title,
    description: description || '',
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
};

// PUT update task
export const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  // Update task
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title || tasks[taskIndex].title,
    description: description !== undefined ? description : tasks[taskIndex].description,
    completed: completed !== undefined ? completed : tasks[taskIndex].completed,
    updatedAt: new Date().toISOString()
  };
  
  res.status(200).json(tasks[taskIndex]);
};

// PATCH toggle task status
export const toggleTaskStatus = (req, res) => {
  const { id } = req.params;
  
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  // Toggle completed status
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  tasks[taskIndex].updatedAt = new Date().toISOString();
  
  res.status(200).json(tasks[taskIndex]);
};

// DELETE task
export const deleteTask = (req, res) => {
  const { id } = req.params;
  
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  // Remove task
  const deletedTask = tasks.splice(taskIndex, 1)[0];
  
  res.status(200).json(deletedTask);
};