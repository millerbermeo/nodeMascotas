import {pool} from '../database/conexion.js';

export const getUsuarios = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
};

export const getUsuario = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
};

export const createUsuario = async (req, res) => {
    const { nombre, correo, contraseña, telefono, direccion } = req.body;
    await pool.query('INSERT INTO usuarios (nombre, correo, contraseña, telefono, direccion) VALUES (?, ?, ?, ?, ?)', [nombre, correo, contraseña, telefono, direccion]);
    res.json({ message: 'Usuario created' });
};

export const updateUsuario = async (req, res) => {
    const { nombre, correo, contraseña, telefono, direccion } = req.body;
    await pool.query('UPDATE usuarios SET nombre = ?, correo = ?, contraseña = ?, telefono = ?, direccion = ? WHERE id = ?', [nombre, correo, contraseña, telefono, direccion, req.params.id]);
    res.json({ message: 'Usuario updated' });
};

export const deleteUsuario = async (req, res) => {
    await pool.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
    res.json({ message: 'Usuario deleted' });
};
