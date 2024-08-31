import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/Validation';
import { StatusCodes } from 'http-status-codes';
import { ITask } from '../../models';
import { taskProvider } from '../../providers';

interface IBodyProps extends Omit<ITask, 'id'> {}

export const createTaskValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      title: yup.string().required().min(5),
      description: yup.string().required().min(10),
      user_id: yup.number().integer().required().moreThan(0),
      completed: yup.boolean().required(),
    })
  ),
}));

export const createTask = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const result = await taskProvider.createTask(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  } 
  return res.status(StatusCodes.CREATED).json(result);
};
