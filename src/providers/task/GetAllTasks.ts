import { db } from "../../database";
import { ITask } from "../../models";

export const getAllTasks = async (page: number, limit: number, filter: string, user_id: number): Promise<ITask[] | Error> => {
  try {
    const query = db("task")
      .select('*')
      .offset((page - 1) * limit)
      .limit(limit);

    if (user_id > 0) {
      query.where('user_id', user_id);
    }

    if (filter) {
      query.andWhere('title', 'like', `%${filter}%`);
    }

    const result = await query;

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Error getting tasks');
  }
};
