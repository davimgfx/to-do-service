import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/Validation';
import { StatusCodes } from 'http-status-codes';

interface ITask {
  title: string;
  description: string;
  userId: string;
}

export const createTaskValidation = validation({
  body: yup.object().shape({
    title: yup.string().required().min(5),
    description: yup.string().required().min(10),
    userId: yup.string().required(),
  })
});


export const createTask = async (
  req: Request<{}, {}, ITask>,
  res: Response
) => {

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Not implemented');
};
