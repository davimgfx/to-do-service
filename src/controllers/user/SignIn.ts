import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/Validation';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../../models';
import { userProvider } from '../../providers';
import { JWTService, PasswordCrypto } from '../../shared/services';

interface IBodyProps extends Omit<IUser, 'id' | 'name'> {}

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().min(3).max(150),
      password: yup.string().required().min(6).max(50),
    })
  ),
}));

export const signIn = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const { email, password } = req.body;

  const result = await userProvider.getByUserEmail(email);

  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email or password incorrect',
      },
    });
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(
    password,
    result.password
  );

  if (passwordMatch) {
    const accessToken = JWTService.signIn({ uid: result.id });

    if (accessToken === 'JWT_SECRET_NOT_FOUND') {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ errors: { default: 'Error created the access token' } });
    }

    return res.status(StatusCodes.OK).json({
      accessToken,
    });
    
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email or password incorrect',
      },
    });
  }
};
