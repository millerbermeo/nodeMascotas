import {pool} from '../database/conexion.js';

export const getMascotas = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM mascotas');
    res.json(rows);
};

export const getMascota = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM mascotas WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
};

export const createMascota = async (req, res) => {
    const { nombre, edad, raza_id, descripcion, imagen_url, estado } = req.body;
    await pool.query('INSERT INTO mascotas (nombre, edad, raza_id, descripcion, imagen_url, estado) VALUES (?, ?, ?, ?, ?, ?)', [nombre, edad, raza_id, descripcion, imagen_url, estado]);
    res.json({ message: 'Mascota created' });
};

export const updateMascota = async (req, res) => {
    const { nombre, edad, raza_id, descripcion, imagen_url, estado } = req.body;
    await pool.query('UPDATE mascotas SET nombre = ?, edad = ?, raza_id = ?, descripcion = ?, imagen_url = ?, estado = ? WHERE id = ?', [nombre, edad, raza_id, descripcion, imagen_url, estado, req.params.id]);
    res.json({ message: 'Mascota updated' });
};

export const deleteMascota = async (req, res) => {
    await pool.query('DELETE FROM mascotas WHERE id = ?', [req.params.id]);
    res.json({ message: 'Mascota deleted' });
};
