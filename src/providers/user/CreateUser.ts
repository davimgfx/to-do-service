import { IUser } from '../../models';
import { db } from '../../database';
import { PasswordCrypto } from '../../shared/services';

export const createUser = async (
  user: Omit<IUser, 'id'>
): Promise<number | Error> => {
  try {
    const hashPassword = await PasswordCrypto.hashPassword(user.password)

    const [result] = await db('user').insert({
      ...user,
      password: hashPassword,
    });

    return result;
  } catch (err) {
    console.log(err);
    return Error('Error creating user');
  }
};
