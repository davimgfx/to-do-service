import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/Validation';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../../models';
import { userProvider } from '../../providers';
import { PasswordCrypto } from '../../shared/services';

interface IBodyProps extends Omit<IUser, 'id' | "name"> {}

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
        default: "Email or password incorrect",
      },
    });
  } 

  const passwordMatch = await PasswordCrypto.verifyPassword(password, result.password);

  if(passwordMatch){
    return res.status(StatusCodes.OK).json({ accessToken: "123" 
        });
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email or password incorrect",
      },
    });
  }
};
