const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.render('index', { products, user: req.session.user });
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('product', { product });
});

module.exports = router;
