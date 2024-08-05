import { pool } from '../database/conexion.js';

// Obtener todos los interesados
export const getInteresados = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM interesados');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching interesados: ', error);
    res.status(500).json({ message: 'Error fetching interesados', error: error.message });
  }
};

// Obtener un interesado por ID
export const getInteresado = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM interesados WHERE id_interes = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Interesado not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching interesado: ', error);
    res.status(500).json({ message: 'Error fetching interesado', error: error.message });
  }
};

// Crear un nuevo interesado
export const createInteresado = async (req, res) => {
  const { usuario_id, mascota_id, fecha_creacion } = req.body;

  if (!usuario_id || !mascota_id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO interesados (usuario_id, mascota_id, fecha_creacion) VALUES (?, ?, ?)',
      [usuario_id, mascota_id, fecha_creacion]
    );
    res.status(201).json({ message: 'Interesado created', id: result.insertId });
  } catch (error) {
    console.error('Error creating interesado: ', error);
    res.status(500).json({ message: 'Error creating interesado', error: error.message });
  }
};

// Actualizar un interesado existente
export const updateInteresado = async (req, res) => {
  const { id } = req.params;
  const { usuario_id, mascota_id, fecha_creacion } = req.body;

  if (!usuario_id || !mascota_id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const [result] = await pool.query(
      'UPDATE interesados SET usuario_id = ?, mascota_id = ?, fecha_creacion = ? WHERE id_interes = ?',
      [usuario_id, mascota_id, fecha_creacion, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Interesado not found' });
    }
    res.json({ message: 'Interesado updated' });
  } catch (error) {
    console.error('Error updating interesado: ', error);
    res.status(500).json({ message: 'Error updating interesado', error: error.message });
  }
};

// Eliminar un interesado
export const deleteInteresado = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM interesados WHERE id_interes = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Interesado not found' });
    }
    res.json({ message: 'Interesado deleted' });
  } catch (error) {
    console.error('Error deleting interesado: ', error);
    res.status(500).json({ message: 'Error deleting interesado', error: error.message });
  }
};
