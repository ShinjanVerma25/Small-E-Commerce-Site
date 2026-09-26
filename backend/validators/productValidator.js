const { body, param, validationResult } = require("express-validator");

const productValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Product name is required"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required"),

    body("price")
        .isNumeric()
        .withMessage("Price must be a number"),

    body("stock")
        .isInt({ min: 0 })
        .withMessage("Stock must be a valid number")
];

const idValidation = [
    param("id")
        .isMongoId()
        .withMessage("Invalid product ID")
];

const checkProductValidation = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    next();
};

module.exports = {
    productValidation,
    idValidation,
    checkProductValidation
};