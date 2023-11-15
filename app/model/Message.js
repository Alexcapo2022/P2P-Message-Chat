// model/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, {
  collection: 'Chat' // Especifica el nombre de la colección
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
