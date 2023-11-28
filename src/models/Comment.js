const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: false
  },
  // Otros campos específicos de comentario
},{collection:'comments',
  versionKey: false});

module.exports = mongoose.model('Comment', commentSchema);