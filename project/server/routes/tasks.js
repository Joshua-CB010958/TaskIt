import express from 'express';
import { 
  getAllTasks, 
  getTaskById, 
  createTask, 
  updateTask, 
  deleteTask, 
  toggleTaskStatus 
} from '../controllers/taskController.js';

const router = express.Router();

// GET all tasks
router.get('/', getAllTasks);

// GET specific task
router.get('/:id', getTaskById);

// POST create new task
router.post('/', createTask);

// PUT update task
router.put('/:id', updateTask);

// PATCH toggle task status
router.patch('/:id/toggle', toggleTaskStatus);

// DELETE task
router.delete('/:id', deleteTask);

export default router;