import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: Number, required: true, enum: [0, 1], default: 0 },
  shippingAddress1: { type: String, required: true },
  shippingAddress2: { type: String },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
  totalPrice: { type: Number, required: true, default: 0 },
  dateOrder: { type: Date, required: true, default: Date.now },
})

const Order = mongoose.model('Order', orderSchema)

export default Order
