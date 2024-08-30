import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";

interface IParamProps{
    id?: number;
}

interface IBodyProps{
    title: string;
    description: string;
}

export const updateByTaskIdValidation = validation({
    params: yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    }),
    body: yup.object().shape({
        title: yup.string().required().min(5),
        description: yup.string().required().min(10),
    })
});

export const updateByTaskId = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Not implemented');
}