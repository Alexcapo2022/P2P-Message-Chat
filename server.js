import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./src/config/connectDB.js";

import Message from "./src/models/Message.js";
import Post from "./src/models/post.js";
import dotenv from "dotenv";
import { conexionPostgres } from "./src/config/sequelize.js";
import { categoriaRouter } from "./src/routes/categoria.routes.js";
import { autorRouter } from "./src/routes/autor.routes.js";
import { editorialRouter } from "./src/routes/editorial.routes.js";
import { libroRouter } from "./src/routes/libro.routes.js";
import { usuarioRouter } from "./src/routes/usuario.routes.js";
import { pagoRouter } from "./src/routes/pago.routes.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

//Middlewares
app.use(cors());
// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(morgan("dev"));

//RUTAS
app.get("/", (req, res) => {
   res.send("Bienvenidos al API de BookSwap");
});
app.use(categoriaRouter, autorRouter, editorialRouter,libroRouter,usuarioRouter,pagoRouter);

// Endpoint para recibir mensajes del cliente
app.post("/messages", async (req, res) => {
   const { user, content, image } = req.body;

   try {
      // Guardar el mensaje en la base de datos utilizando el modelo
      const message = new Message({ user, content, image });
      await message.save();
      res.status(201).json(message);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al guardar el mensaje en la base de datos." });
   }
});

// Ruta para obtener todos los mensajes

app.get("/messages", async (req, res) => {
   try {
     // Obtener todos los mensajes de la base de datos
     const messages = await Message.find();
 
     // Devolver los mensajes como respuesta
     res.status(200).json(messages);
   } catch (error) {
     console.error("Error al obtener los mensajes de la base de datos:", error);
     res.status(500).json({ error: "Error al obtener los mensajes de la base de datos." });
   }
 });

  app.get("/posts", async (req, res) => {
   try {
     // Obtener todos los mensajes de la base de datos
     const posts = await Post.find();
 
     // Devolver los mensajes como respuesta
     res.status(200).json(posts);
   } catch (error) {
     console.error("Error al obtener los mensajes de la base de datos:", error);
     res.status(500).json({ error: "Error al obtener los mensajes de la base de datos." });
   }
 });

app.post("/posts", async (req, res) => {
   const { id, nombre, correo, imagenPerfil, like, numComentarios, comentarios, horaPublicacion } = req.body;

   try {
      // Guardar el mensaje en la base de datos utilizando el modelo
      const post = new Post({ id, nombre, correo, imagenPerfil, like, numComentarios, comentarios, horaPublicacion });
      await post.save();
      res.status(201).json(post);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al guardar el mensaje en la base de datos." });
   }
})

app.put("/posts/:id", async (req, res) => {
   const { id } = req.params;

   try {
      const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedPost);
   } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al actualizar el post' });
   }
});

app.delete("/posts/:id", async (req, res) => {
   const { id } = req.params;
 
   try {
     console.log("ID a eliminar:", id);
     const post = await Post.findById(id);
 
     if (!post) {
       return res.status(404).json({ mensaje: 'No se encontró el post con el ID proporcionado.' });
     }
 
     await Post.findByIdAndDelete(id);
     res.status(200).json({ mensaje: 'Post eliminado' });
   } catch (error) {
     console.error(error);
     res.status(500).json({ mensaje: 'Error al eliminar el post' });
   }
});

app.put("/posts/:postId/like", async (req, res) => {
   const { postId } = req.params;

   try {
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: 'No se encontró el post con el ID proporcionado.' });
      }

      post.like = (parseInt(post.like) || 0) + 1;

      const updatedPost = await post.save();

      res.status(200).json(updatedPost);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al agregar un like a la publicación' });
   }
});

app.post("/posts/:postId/comment", async (req, res) => {
   try {
     const { postId } = req.params;
     const commentDetails = req.body;
 
     if (!commentDetails.text || !commentDetails.userId) {
       return res.status(400).json({ message: 'Se requiere un texto y un ID de usuario para crear un comentario.' });
     }
 
     const post = await Post.findById(postId);
 
     if (!post) {
       return res.status(404).json({ message: 'No se encontró el post con el ID proporcionado.' });
     }
 
     const newComment = new Comment({
       postId,
       text: commentDetails.text,
       userId: commentDetails.userId,
       // Otros campos o detalles del comentario
     });
 
     const savedComment = await newComment.save();
 
     const updatedPost = await Post.findByIdAndUpdate(
       postId,
       { $push: { comentarios: savedComment._id } },
       { new: true }
     );
 
     res.status(201).json({
       message: 'Comentario creado exitosamente',
       commentID: savedComment._id,
       commentText: savedComment.text,
       updatedPost
     });
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Error al crear un comentario' });
   }
 });


// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static("public"));

// Configuración de Socket.IO
io.on("connection", (socket) => {
   console.log("Usuario conectado:", socket.id);

   // Manejar evento de nuevo mensaje
   socket.on("message", async (data) => {
      io.emit("message", data);

      // Enviar el mensaje al endpoint del servidor para guardarlo en la base de datos
      try {
         await fetch("http://localhost:3001/messages", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
         });
      } catch (error) {
         console.error("Error al enviar el mensaje al servidor:", error);
      }
   });

   // Manejar evento de desconexión
   socket.on("disconnect", () => {
      console.log("Usuario desconectado:", socket.id);
   });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
server.listen(PORT, async () => {
   console.log(`Servidor escuchando en el puerto ${PORT}`);
   try {
      // Conectar a la base de datos MongoDB
      connectDB();
      await conexionPostgres.sync({force: false});
      console.log("Base de datos Postgres sincronizada");
   } catch (err) {
      console.log(err);
   }
});

