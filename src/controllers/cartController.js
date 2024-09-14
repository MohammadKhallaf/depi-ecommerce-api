const Cart = require("../models/Cart");

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    res.send(cart || { items: [] });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }
    cart.items = req.body.items;
    await cart.save();
    res.send(cart);
  } catch (error) {
    res.status(400).send(error);
  }
};
