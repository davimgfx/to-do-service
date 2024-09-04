import { db } from '../../database';

export const countTasks = async (filter = ''): Promise<number | Error> => {
  try {
    const [{ count }] = await db('task')
      .where('title', 'like', `%${filter}%`)
      .count<[{ count: number }]>('* as count');

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error('Error counting tasks');
  } catch (error) {
    console.log(error);
    return new Error('Error counting task');
  }
};
