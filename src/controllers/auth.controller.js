import { pool } from '../database/conexion.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Login y generación de token
export const ValidarUsuario = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;
        console.log(correo, contrasena)

        // Verifica si el usuario existe
        const sql = 'SELECT id, nombre, contrasena, rol FROM usuarios WHERE correo = ?';
        const [rows] = await pool.query(sql, [correo]);

        if (rows.length > 0) {
            const user = rows[0];
            // Compara la contraseña proporcionada con la almacenada en la base de datos
            const passwordMatch = await bcrypt.compare(contrasena, user.contrasena);

            if (passwordMatch) {
                // Genera un token JWT que incluye el rol del usuario
                const token = jwt.sign(
                    { user: { id: user.id, nombre: user.nombre, rol: user.rol } },
                    process.env.SECRET,
                    { expiresIn: process.env.TIME }
                );
                return res.status(200).json({
                    message: 'Usuario autorizado',
                    token,
                    nombre: user.nombre,
                    id: user.id,
                    rol: user.rol
                });
            } else {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }
        } else {
            return res.status(404).json({ message: 'Usuario no encontrado' });
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

        // Asegúrate de que el token tiene el prefijo 'Bearer ' si es necesario
        const token = token_cliente.startsWith('Bearer ') ? token_cliente.slice(7) : token_cliente;

        jwt.verify(token, process.env.SECRET, (error, decoded) => {
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
