import {pool} from '../database/conexion.js';

export const getRazas = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM razas');
    res.json(rows);
};

export const getRaza = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM razas WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
};

export const createRaza = async (req, res) => {
    const { nombre, descripcion } = req.body;
    await pool.query('INSERT INTO razas (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion]);
    res.json({ message: 'Raza created' });
};

export const updateRaza = async (req, res) => {
    const { nombre, descripcion } = req.body;
    await pool.query('UPDATE razas SET nombre = ?, descripcion = ? WHERE id = ?', [nombre, descripcion, req.params.id]);
    res.json({ message: 'Raza updated' });
};

export const deleteRaza = async (req, res) => {
    await pool.query('DELETE FROM razas WHERE id = ?', [req.params.id]);
    res.json({ message: 'Raza deleted' });
};
