import { db } from '../../database';
import { ITask } from '../../models';
import { createTask } from './CreateTask';

export const taskProvider = {
   createTask,

}