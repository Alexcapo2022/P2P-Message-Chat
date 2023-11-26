
import { connect,set } from 'mongoose';
import dotenv from "dotenv";

dotenv.config();
const uri = process.env.DB_URI;

const connectDB = async () => {
  try {
    await connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    set('strictQuery', true);
    console.log('Conexión a la base de datos MongoDB establecida');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    process.exit(1);
  }
};

export default connectDB;

