import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/Validation';
import { StatusCodes } from 'http-status-codes';

interface ITask {
  title: string;
  description: string;
  userId: number;
}

export const createTaskValidation = validation({
  body: yup.object().shape({
    title: yup.string().required().min(5),
    description: yup.string().required().min(10),
    userId: yup.number().integer().required().moreThan(0),
  }),
});

export const createTask = async (
  req: Request<{}, {}, ITask>,
  res: Response
) => {
  console.log(req.body);
  return res.status(StatusCodes.CREATED).json(1)
};
