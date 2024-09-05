import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/Validation';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../../models';
import { userProvider } from '../../providers';

interface IBodyProps extends Omit<IUser, 'id'> {}

export const createUserValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3).max(50),
      email: yup.string().required().min(3).max(150),
      password: yup.string().required().min(6).max(50),
    })
  ),
}));

export const createUser = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const result = await userProvider.createUser(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  } 
  return res.status(StatusCodes.CREATED).json(result);
};
