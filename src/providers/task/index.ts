import { createTask } from './CreateTask';
import { deleteByTaskId } from './DeleteByTaskId';
import { getByTaskId } from './GetByTaskId';
import { updateByTaskId } from './UpdateByTaskId';
import { getAllTasksByUserId } from './GetAllTasksByUserId';
import { countTasks } from './CountTasks';

export const taskProvider = {
  createTask,
  deleteByTaskId,
  getByTaskId,
  getAllTasksByUserId,
  updateByTaskId,
  countTasks,
};
