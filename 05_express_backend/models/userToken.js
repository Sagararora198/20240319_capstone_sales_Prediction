import mongoose from 'mongoose'
import Users from './user.js';

const TokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Users,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

const UserToken = mongoose.model("UserToken", TokenSchema);
export default UserToken