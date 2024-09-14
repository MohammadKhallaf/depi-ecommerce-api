const express = require("express");
const productController = require("../controllers/productController");
const { auth, adminAuth } = require("../middleware/auth");
const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProduct);
router.post("/", auth, adminAuth, productController.createProduct);
router.put("/:id", auth, adminAuth, productController.updateProduct);
router.delete("/:id", auth, adminAuth, productController.deleteProduct);

module.exports = router;
