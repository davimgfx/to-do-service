import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";

interface IParamProps {
    id?: number;
}

export const getByTaskIdValidation = validation({
    params: yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  });

  export const getByTaskId = async (req: Request<IParamProps>, res: Response) => {

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Not implemented');
  }