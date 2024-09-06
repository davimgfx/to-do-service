import { db } from '../../database';
import { ITask } from '../../models';

export const updateByTaskId = async (
  id: number,
  task: Omit<ITask, 'id' | 'user_id'>
): Promise<void | Error> => {
  try {
    const result = await db('task').update(task).where('id', '=', id);

    if (result > 0) return;

    return Error('Erro para atualizar a task');
  } catch (err) {
    return Error('Error para atualizar a task');
  }
};
