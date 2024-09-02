import { db } from "../../database";

export const deleteByTaskId = async (taskId: number): Promise<number | Error> => {
  try {
    const result = await db("task").where({ id: taskId }).del();

    if(result > 0) return result;

    return Error('Error deleting task');
  } catch (err) {
    console.log(err);
    return Error('Error deleting task');
  }
}