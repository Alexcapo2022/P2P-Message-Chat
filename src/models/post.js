import { Schema, model } from 'mongoose';

const postSchema = new Schema({
  id: {
    type: Number,
    required: false,
  },
  PostText: {
    type: String,
    required: false,
  },
  PostImage: {
    type: String,
    default: '', // Puedes cambiarlo a la URL predeterminada si lo deseas
    required: false,
  },
  User: {
    type: String,
    required: false,
  },
  Like: {
    type: Number,
    default: 0,
  },
  NumeroDeComentarios: {
    type: Number,
    default: 0,
  },
  Comentarios: [
    {
      Usuario: {
        type: String,
        required: false,
      },
      Comentario: {
        type: String,
        required: false,
      },
    }
  ],
}, {
  collection: 'Posts',
  versionKey: false,
});

const Post = model('Post', postSchema);

export default Post;
