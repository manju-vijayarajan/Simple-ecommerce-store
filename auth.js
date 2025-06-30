const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.get('/register', (req, res) => res.render('register'));
router.post('/register', async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  await User.create({ username: req.body.username, password: hash });
  res.redirect('/login');
});

router.get('/login', (req, res) => res.render('login'));
router.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    req.session.user = user.username;
    res.redirect('/products');
  } else {
    res.redirect('/login');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/products');
});

module.exports = router;
