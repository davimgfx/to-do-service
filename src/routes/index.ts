import { Router } from 'express';
import { taskController, userController } from '../controllers';
import { ensureAuthenticated } from '../shared/middlewares';

const router = Router();

router.get('/', (req, res) => {
  return res.send('Hello World!');
});

// Tasks
router.get(
  '/v1/tasks',
  ensureAuthenticated,
  taskController.getAllTasksByUserIdValidation,
  taskController.getAllTasksByUserId
);
router.get(
  '/v1/task/:id',
  ensureAuthenticated,
  taskController.getByTaskIdValidation,
  taskController.getByTaskId
);
router.post(
  '/v1/task',
  ensureAuthenticated,
  taskController.createTaskValidation,
  taskController.createTask
);
router.put(
  '/v1/task/:id',
  ensureAuthenticated,
  taskController.updateByTaskIdValidation,
  taskController.updateByTaskId
);
router.delete(
  '/v1/task/:id',
  ensureAuthenticated,
  taskController.deleteByTaskIdValidation,
  taskController.deleteByTaskId
);

// Users
router.post(
  '/v1/auth/login',
  userController.signInValidation,
  userController.signIn
);
router.post(
  '/v1/auth/register',
  userController.createUserValidation,
  userController.createUser
);

export { router };
