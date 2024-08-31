import { Router } from 'express';
import { taskController } from '../controllers';

const router = Router();

router.get('/', (req, res) => {
    return res.send('Hello World!');
  });

// Tasks
router.get('/v1/tasks', taskController.getAllTasksValidation, taskController.getAllTasks);
router.get('/v1/task/:id', taskController.getByTaskIdValidation, taskController.getByTaskId);
router.post('/v1/task', taskController.createTaskValidation, taskController.createTask);
// router.put('/v1/task/:id', taskController.updateByTaskIdValidation, taskController.updateByTaskId);
// router.delete('/v1/task/:id', taskController.deleteByTaskIdValidation, taskController.deleteByTaskId);

export { router };
