import { db } from '../../database';
import { IUser } from '../../models';

export const getByUserId = async (userId: number): Promise<IUser | Error> => {
  try {
    const result = await db('user')
      .select('*')
      .where('id', '=', userId)
      .first();

    if (result) return result;

    return Error('Error get user');
  } catch (err) {
    console.log(err);
    return Error('Error get user');
  }
};
