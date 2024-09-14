const express = require("express");
const wishlistController = require("../controllers/wishlistController");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, wishlistController.getWishlist);
router.put("/", auth, wishlistController.updateWishlist);

module.exports = router;
