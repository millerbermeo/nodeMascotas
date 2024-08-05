import { pool } from '../database/conexion.js';
import bcrypt from 'bcryptjs';  // Asegúrate de haber instalado bcryptjs para el manejo de contraseñas

export const getUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

export const getUsuario = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

export const createUsuario = async (req, res) => {
    const { nombre, correo, identificacion, contrasena, telefono, direccion, rol } = req.body;

    console.log(req.body); // Log the request body to check received data

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        await pool.query(
            'INSERT INTO usuarios (nombre, identificacion, correo, contrasena, rol, telefono, direccion) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nombre, identificacion, correo, hashedPassword, rol || 'usuario', telefono, direccion]
        );
        res.json({ message: 'Usuario creado' });
    } catch (error) {
        console.error('Error creating user:', error); // Log error details
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};


export const updateUsuario = async (req, res) => {
    const { nombre, correo, contraseña, telefono, direccion, rol } = req.body;
    const { id } = req.params;

    try {
        // Verifica si el usuario existe antes de actualizar
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        let query = 'UPDATE usuarios SET nombre = ?, correo = ?, telefono = ?, direccion = ?, rol = ? WHERE id = ?';
        const values = [nombre, correo, telefono, direccion, rol || 'usuario', id];

        // Si se proporciona una contraseña, haz el hash y agrégala a la consulta
        if (contraseña) {
            const hashedPassword = await bcrypt.hash(contraseña, 10);
            query = 'UPDATE usuarios SET nombre = ?, correo = ?, contraseña = ?, telefono = ?, direccion = ?, rol = ? WHERE id = ?';
            values.splice(2, 0, hashedPassword); // Insertar la contraseña en la posición correcta
        }

        await pool.query(query, values);
        res.json({ message: 'Usuario actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

export const deleteUsuario = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await pool.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};
