import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/Validation';
import { StatusCodes } from 'http-status-codes';
import { taskProvider } from '../../providers';

interface IQueryProps {
  user_id?: number;
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllTasksByUserIdValidation = validation((getSchema) => ({
  params: getSchema<IQueryProps>(
    yup.object().shape({
      page: yup.number().integer().optional().moreThan(0),
      limit: yup.number().integer().optional().moreThan(0),
      filter: yup.string().optional(),
      id: yup.number().integer().optional().moreThan(0),
    })
  ),
}))

export const getAllTasksByUserId = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 7;
  const filter = req.query.filter || '';
  const user_id = Number(req.query.user_id);

  if (isNaN(user_id)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: { default: 'Invalid ID' },
    });
  }

  const result = await taskProvider.getAllTasksByUserId(page, limit, filter, user_id);

  const count = await taskProvider.countTasks(filter);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message },
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message },
    });
  }

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', count);

  return res.status(StatusCodes.OK).json(result);
};
