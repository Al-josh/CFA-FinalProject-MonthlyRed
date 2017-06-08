var mongoose = require('mongoose');
const { Schema } = mongoose;

var orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  cart: { type: Object, required: true },
  paymentId: { type: String, required: true },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
