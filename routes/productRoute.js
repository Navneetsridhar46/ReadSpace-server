const express = require("express");

const {
    createProduct,
    getaProduct,
    getAllProduct,
    searchProducts,
    deleteProduct,
    updateProduct
} = require ('../controller/productController')
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
router.post("/", authMiddleware, isAdmin, createProduct);
router.post("/search", searchProducts);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/", getAllProduct);
router.get("/:id", getaProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);


module.exports = router;