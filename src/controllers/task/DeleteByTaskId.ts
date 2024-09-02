import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";
import { taskProvider } from "../../providers";

interface IParamProps {
    id?: number;
}

export const deleteByTaskIdValidation = validation(getSchema => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));


  export const deleteByTaskId = async (req: Request<IParamProps>, res: Response) => {
    if (!req.params.id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: 'id is required',
        }
      });
    }
    
    const { id } = req.params;

    const result = await taskProvider.deleteByTaskId(Number(id));

    if (result instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: result.message,
        },
      });
    } 
    return res.status(StatusCodes.OK).json(result);

  }