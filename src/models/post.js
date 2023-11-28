import { Schema, model } from 'mongoose';

const postSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
  },
  imagenPerfil: {
    type: String,
    default: 'url_imagen1.jpg',
  },
  like: {
    type: String,
    default: '0',
  },
  numComentarios: {
    type: Number,
    default: 0,
  },
  comentarios: [{
    type: Schema.Types.ObjectId, // Corregido a Schema.Types.ObjectId
    ref: 'Comment' // Nombre del modelo de comentarios
  }],
  horaPublicacion: {
    type: String,
    default: new Date().toISOString(),
  },
}, {
  collection: 'Posts', // Define la colección en la base de datos
  versionKey: false,
});

const Post = model('Post', postSchema);

export default Post;