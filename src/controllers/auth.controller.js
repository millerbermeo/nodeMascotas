import { pool } from '../database/conexion.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Login y generación de token
export const ValidarUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    const sql = 'SELECT id, nombre, contraseña FROM usuarios WHERE correo = ?';
    const [rows] = await pool.query(sql, [email]);

    if (rows.length > 0) {
      const user = rows[0];
      const passwordMatch = await bcrypt.compare(password, user.contraseña);

      if (passwordMatch) {
        const token = jwt.sign({ user: { id: user.id, nombre: user.nombre, } }, process.env.SECRET, { expiresIn: process.env.TIME });
        return res.status(200).json({ message: 'Usuario autorizado', token, nombre: user.nombre, id: user.id });
        // const token = jwt.sign({ user: { id: user.id, nombre: user.nombre, rol: user.rol } }, process.env.SECRET, { expiresIn: process.env.TIME });
        // return res.status(200).json({ message: 'Usuario autorizado', token, rol: user.rol, nombre: user.nombre, id: user.id });
      } else {
        return res.status(401).json({ message: 'Usuario no autorizado' });
      }
    } else {
      return res.status(404).json({ message: 'Usuario no autorizado' });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// Middleware para validar el token
export const validarToken = async (req, res, next) => {
  try {
    const token_cliente = req.headers['authorization'];

    if (!token_cliente) {
      return res.status(401).json({ message: 'El token es requerido' });
    }

    jwt.verify(token_cliente, process.env.SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: 'El token es inválido' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
