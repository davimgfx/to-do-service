import { Request, Response } from 'express';
import { validation } from '../../shared/middlewares';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { ITask } from '../../models';

interface IParamProps {
  id: number;
}

interface IBodyProps extends Omit<ITask, 'user_id' | 'id'> {
  title: string;
  description: string;
  completed: boolean;
}

export const updateByTaskIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
  body: getSchema<IBodyProps>(
    yup.object().shape({
      title: yup.string().required().min(5),
      description: yup.string().required().min(10),
      completed: yup.boolean().required(),
    })
  ),
}));

export const updateByTaskId = async (
  req: Request<IParamProps, {}, IBodyProps>,
  res: Response
) => {
  // Implementation here
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Not implemented');
};
