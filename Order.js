const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  user: String,
  product: String,
  quantity: Number
});
module.exports = mongoose.model('Order', OrderSchema);