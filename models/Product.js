var mongoose = require('mongoose');

const { Schema } = mongoose;

var productSchema = new Schema({
  name: String,
  description: String,
  price: Number,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
