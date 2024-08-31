import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/Validation';
import { StatusCodes } from 'http-status-codes';

interface IQueryProps {
  page ?: number;
  limit ?: number;
  filter ?: string;
}

export const getAllTasksValidation = validation((getSchema) => ({
  params: getSchema<IQueryProps>(
    yup.object().shape({
      page: yup.number().integer().required().moreThan(0),
      limit: yup.number().integer().required().moreThan(0),
      filter: yup.string().required()
    })
  ),
}))

export const getAllTasks = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Not implemented');
};
