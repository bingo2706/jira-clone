import Joi from "joi";

export const taskValidationSchema = Joi.object({
    name: Joi.string().required().label("Tên công việc"),
    statusId: Joi.number().required().label("Trạng thái"),
}).unknown();
