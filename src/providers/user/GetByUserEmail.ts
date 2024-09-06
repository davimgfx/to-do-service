import { db } from '../../database';
import { IUser } from '../../models';

export const getByUserEmail = async (email: string): Promise<IUser | Error> => {
  try {
    const result = await db('user')
      .select('*')
      .where('email', '=', email)
      .first();

    if (result) return result;

    return Error('Erro ao obter usuário');
  } catch (err) {

    return Error('Error ao obter usuário');
  }
};
