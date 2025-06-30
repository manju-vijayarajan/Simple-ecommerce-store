const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const router = express.Router();

router.post('/', async (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  const { productId, qty } = req.body;
  const product = await Product.findById(productId);
  await Order.create({
    user: req.session.user,
    product: product.name,
    quantity: qty
  });
  res.redirect('/products');
});

module.exports = router;
