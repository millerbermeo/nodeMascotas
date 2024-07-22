import {pool} from '../database/conexion.js';

export const getAdopciones = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM adopciones');
    res.json(rows);
};

export const getAdopcion = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM adopciones WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
};

export const createAdopcion = async (req, res) => {
    const { usuario_id, mascota_id, fecha_adopcion } = req.body;
    await pool.query('INSERT INTO adopciones (usuario_id, mascota_id, fecha_adopcion) VALUES (?, ?, ?)', [usuario_id, mascota_id, fecha_adopcion]);
    res.json({ message: 'Adopcion created' });
};

export const updateAdopcion = async (req, res) => {
    const { usuario_id, mascota_id, fecha_adopcion } = req.body;
    await pool.query('UPDATE adopciones SET usuario_id = ?, mascota_id = ?, fecha_adopcion = ? WHERE id = ?', [usuario_id, mascota_id, fecha_adopcion, req.params.id]);
    res.json({ message: 'Adopcion updated' });
};

export const deleteAdopcion = async (req, res) => {
    await pool.query('DELETE FROM adopciones WHERE id = ?', [req.params.id]);
    res.json({ message: 'Adopcion deleted' });
};
