const validateBody = (schema, options = {}) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
            ...options,
        });

        if (error) {
            return res.status(400).json({
                message: "Validation failed",
                details: error.details.map((err) => err.message),
            });
        }

        req.body = value;
        next();
    };
};

export default validateBody;
