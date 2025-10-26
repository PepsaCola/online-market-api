import Joi from "joi";

export const reviewSchema = Joi.object({
    user: Joi.string().required().messages({
        "any.required": "User ID is required",
        "string.base": "User ID must be a string",
    }),
    product: Joi.string().required().messages({
        "any.required": "Product ID is required",
        "string.base": "Product ID must be a string",
    }),
    rate: Joi.number().integer().min(1).max(5).required().messages({
        "number.base": "Rate must be a number",
        "number.min": "Minimum rate is 1",
        "number.max": "Maximum rate is 5",
        "any.required": "Rate is required",
    }),
    text: Joi.string().min(3).max(500).required().messages({
        "string.base": "Text must be a string",
        "string.min": "Text must be at least 3 characters long",
        "string.max": "Text cannot exceed 500 characters",
        "any.required": "Text is required",
    }),
});
export const reviewUpdateSchema = Joi.object({
    rate: Joi.number().min(1).max(5),
    text: Joi.string().min(3).max(500),
});
