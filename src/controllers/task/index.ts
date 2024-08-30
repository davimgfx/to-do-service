import * as createTask from "./CreateTask"
import * as getAllTasks from "./GetAllTasks"
import * as getByTaskId from "./GetByTaskId"
import * as updateByTaskId from "./UpdateByTaskId"
import * as deleteByTaskId from "./DeleteByTaskId"

export const taskController = {
    ...createTask,
    ...getAllTasks,
    ...getByTaskId,
    ...updateByTaskId,
    ...deleteByTaskId 
}