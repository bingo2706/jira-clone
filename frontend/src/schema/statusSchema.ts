import Joi from "joi";

export const statusValidationSchema = Joi.object({
    name: Joi.string().required().label("Tên trạng thái"),
}).unknown();
