import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const generarJWT = (id) => {
   return jwt.sign({ id }, String(process.env.JWT_SECRET), {
      expiresIn: "2h",
   });
};

export const validarJWT = (token) => {
   try {
      const { id } = jwt.verify(token, String(process.env.JWT_SECRET));
      return {id};
   } catch (err) {
      console.log(err);
      return err.message;
   }
};
