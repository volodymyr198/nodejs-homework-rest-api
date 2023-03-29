const validation = schema => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: `missing required ${error.details[0].context.label} field`,
            });
        }
        next();
    };
};

module.exports = validation;
