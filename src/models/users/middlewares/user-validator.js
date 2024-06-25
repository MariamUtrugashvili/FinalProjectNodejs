const { check, validationResult } = require('express-validator');

const userValidationRules = () => {
    return [
        check('username')
            .notEmpty()
            .withMessage('Username is required')
            .isLength({ min: 3 })
            .withMessage('Username must be at least 3 characters long'),

        check('email')
            .isEmail()
            .withMessage('Valid email is required'),

        check('password')
            .notEmpty()
            .withMessage('Password is required')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long')
            .matches(/\d/)
            .withMessage('Password must contain at least one number')
            .matches(/[a-z]/)
            .withMessage('Password must contain at least one lowercase letter')
            .matches(/[A-Z]/)
            .withMessage('Password must contain at least one uppercase letter')
            .matches(/[!@#$%^&*(),.?":{}|<>]/)
            .withMessage('Password must contain at least one special character'),

        check('role')
            .isIn(['user', 'admin'])
            .withMessage('Role must be either user or admin'),
    ];
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(400).json({
        success: false,
        errors: extractedErrors,
    });
}

module.exports = {
    userValidationRules,
    validate,
};
