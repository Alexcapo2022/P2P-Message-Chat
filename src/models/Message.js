import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  user: { type: String, required: true },
  content: { type: String },
  image: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const Message = model('Message', messageSchema);

export default Message;

