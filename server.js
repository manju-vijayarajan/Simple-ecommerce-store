const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'secret123',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected"));

app.use('/', require('./routes/auth'));
app.use('/products', require('./routes/product'));
app.use('/orders', require('./routes/order'));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));