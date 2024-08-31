import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/Validation';
import { StatusCodes } from 'http-status-codes';
import { ITask } from '../../models';

interface IBodyProps extends Omit<ITask, 'id'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      title: yup.string().required().min(5),
      description: yup.string().required().min(10),
      userId: yup.number().integer().required().moreThan(0),
      completed: yup.boolean().required()
    })
  ),
}));

export const createTask = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  console.log(req.body);

  return res.status(StatusCodes.CREATED).json(1);
};
