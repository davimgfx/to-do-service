import { ITask } from '../../models';
import { db } from '../../database';

export const createTask = async (
  task: Omit<ITask, 'id'>
): Promise<number | Error> => {
  try {
    const [result] = await db('task').insert(task);

    return result;
  } catch (err) {

    return Error('Erro ao criar tarefa');
  }
};
