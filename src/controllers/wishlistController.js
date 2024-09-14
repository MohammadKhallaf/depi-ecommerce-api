const Wishlist = require("../models/Wishlist");

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
      "items"
    );
    res.send(wishlist || { items: [] });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, items: [] });
    }
    wishlist.items = req.body.items;
    await wishlist.save();
    res.send(wishlist);
  } catch (error) {
    res.status(400).send(error);
  }
};
