const express = require("express");
const cartController = require("../controllers/cartController");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, cartController.getCart);
router.put("/", auth, cartController.updateCart);

module.exports = router;
