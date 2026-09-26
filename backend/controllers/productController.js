const Product = require("../models/Product");

// Create
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            message: "Product created successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

// Get all
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.json({
            products
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

// Get one
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            product
        });
    } catch (error) {
        res.status(400).json({
            message: "Invalid product ID"
        });
    }
};

// Update
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        res.status(400).json({
            message: "Invalid product ID"
        });
    }
};

// Delete
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(
            req.params.id
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Invalid product ID"
        });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
};