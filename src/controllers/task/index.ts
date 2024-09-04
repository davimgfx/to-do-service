import * as createTask from "./CreateTask"
import * as getAllTasksByUserId from "./getAllTasksByUserId "
import * as getByTaskId from "./GetByTaskId"
import * as updateByTaskId from "./UpdateByTaskId"
import * as deleteByTaskId from "./DeleteByTaskId"

export const taskController = {
    ...createTask,
    ...getAllTasksByUserId,
    ...getByTaskId,
    ...updateByTaskId,
    ...deleteByTaskId 
}