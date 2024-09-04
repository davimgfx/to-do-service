import { db } from '../../database';
import { ITask } from '../../models';

export const getByTaskId = async (taskId: number): Promise<ITask | Error> => {
  try {
    const result = await db('task')
      .select('*')
      .where('id', '=', taskId)
      .first();

    if (result) return result;

    return Error('Error get task');
  } catch (err) {
    console.log(err);
    return Error('Error get task');
  }
};
