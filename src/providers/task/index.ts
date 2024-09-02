import { createTask } from './CreateTask';
import { deleteByTaskId } from './DeleteByTaskId';
import { getByTaskId } from './GetByTaskId';
import { updateByTaskId } from './UpdateByTaskId';
import { getAllTasks } from './GetAllTasks';
import { countTasks } from './CountTasks';

export const taskProvider = {
  createTask,
  deleteByTaskId,
  getByTaskId,
  getAllTasks,
  updateByTaskId,
  countTasks
};
