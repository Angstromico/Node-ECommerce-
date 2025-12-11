import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  phone: { type: String, required: false },
  city: { type: String, required: true },
  country: { type: String, required: true },
  street: { type: String, required: true },
  zip: { type: String, required: true },
  apartment: { type: String, required: false },
})

const User = mongoose.model('User', userSchema)

export default User
