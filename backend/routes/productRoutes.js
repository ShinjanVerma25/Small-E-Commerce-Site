const express = require("express");

const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const authenticate = require("../middleware/authMiddleware");

const {
    productValidation,
    idValidation,
    checkProductValidation
} = require("../validators/productValidator");

const router = express.Router();

// Public
router.get("/", getProducts);

router.get(
    "/:id",
    idValidation,
    checkProductValidation,
    getProduct
);

// Protected
router.post(
    "/",
    authenticate,
    productValidation,
    checkProductValidation,
    createProduct
);

router.put(
    "/:id",
    authenticate,
    idValidation,
    productValidation,
    checkProductValidation,
    updateProduct
);

router.delete(
    "/:id",
    authenticate,
    idValidation,
    checkProductValidation,
    deleteProduct
);

module.exports = router;