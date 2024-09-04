import { db } from '../../database';
import { IUser } from '../../models';

export const updateByUsERId = async (
  userId: number,
  userInfo: Omit<IUser, 'password'>
): Promise<void | Error> => {
  try {
    const result = await db('user').update(userInfo).where('id', '=', userId);

    if (result > 0) return;

    return Error('Error updating user');
  } catch (err) {
    console.log(err);
    return Error('Error updating user');
  }
};
