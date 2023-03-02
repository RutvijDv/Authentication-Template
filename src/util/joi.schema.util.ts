import Joi from "joi";
import { ILoginRequest, IRegisterRequest, IForgetRequest, IUpdateProfileRequest, IResetRequest} from "../util/interface.util";

export const loginSchema = Joi.object<ILoginRequest>({
    email: Joi.string().email().required(),
    password: Joi.string().required().label("password"),
});
  
export const registerSchema = Joi.object<IRegisterRequest>({
    firstName:  Joi.string().required(),
    lastName:  Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(40).required(),
    phone: Joi.number().required(),
});
    
export const forgetSchema = Joi.object<IForgetRequest>({
    email: Joi.string().email().required(),
});

export const resetSchema = Joi.object<IResetRequest>({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).max(40).required(),
});

export const updateProfileSchema = Joi.object<IUpdateProfileRequest>({
    firstName:  Joi.string(),
    lastName:  Joi.string(),
    phone: Joi.number(),
});

export interface IParams {
    author: string;
    categories: Array<string>;
    dateFrom: Date;
    dateTo: Date;
    sortBy: string;
    descending: boolean;
    perPage: number,
    page: number,
}