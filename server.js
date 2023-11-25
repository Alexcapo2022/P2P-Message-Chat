import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from "cors"
import morgan from 'morgan';
import connectDB from './src/config/connectDB.js';

import Message from './src/models/Message.js';
import dotenv from "dotenv"

dotenv.config()

const app = express();
const server = createServer(app);
const io = new Server(server);



// Conectar a la base de datos MongoDB
connectDB();

//Middlewares
app.use(cors())
// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(morgan("dev"))

//RUTAS
app.get("/", (req, res) => {
  res.send("Bienvenidos al API de BookSwap");
});

// Endpoint para recibir mensajes del cliente
app.post('/messages', async (req, res) => {
  const { user, content, image } = req.body;

  try {
    // Guardar el mensaje en la base de datos utilizando el modelo
    const message = new Message({ user, content, image });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar el mensaje en la base de datos.' });
  }
});

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Configuración de Socket.IO
io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  // Manejar evento de nuevo mensaje
  socket.on('message', async (data) => {
    io.emit('message', data);

    // Enviar el mensaje al endpoint del servidor para guardarlo en la base de datos
    try {
      await fetch('http://localhost:3001/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error al enviar el mensaje al servidor:', error);
    }
  });

  // Manejar evento de desconexión
  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
