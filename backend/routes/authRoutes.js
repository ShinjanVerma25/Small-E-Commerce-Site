const express = require("express");

const {
    register,
    login,
    refreshToken,
    logout,
    getMe
} = require("../controllers/authController");

const {
    registerValidation,
    loginValidation,
    checkValidation
} = require("../validators/authValidator");

const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/register",
    registerValidation,
    checkValidation,
    register
);

router.post(
    "/login",
    loginValidation,
    checkValidation,
    login
);

router.post("/refresh-token", refreshToken);

router.post("/logout", authenticate, logout);

router.get("/me", authenticate, getMe);

module.exports = router;