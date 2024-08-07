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
    const [rows] = await pool.query('SELECT *, u.nombre, u.correo, u.telefono  FROM interesados i JOIN usuarios u ON i.usuario_id = u.id WHERE mascota_id = ?;', [id]);
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
    // Primero, verifica si ya existe un registro con el mismo mascota_id
    const [existingRecord] = await pool.query(
      'SELECT * FROM interesados WHERE mascota_id = ?',
      [mascota_id]
    );

    if (existingRecord.length > 0) {
      // Si existe, actualiza el usuario_id y la fecha_creacion
      await pool.query(
        'UPDATE interesados SET usuario_id = ?, fecha_creacion = ? WHERE mascota_id = ?',
        [usuario_id, fecha_creacion, mascota_id]
      );
      return res.status(200).json({ message: 'Interesado updated' });
    } else {
      // Si no existe, crea un nuevo registro
      const [result] = await pool.query(
        'INSERT INTO interesados (usuario_id, mascota_id, fecha_creacion) VALUES (?, ?, ?)',
        [usuario_id, mascota_id, fecha_creacion]
      );
      return res.status(201).json({ message: 'Interesado created', id: result.insertId });
    }
  } catch (error) {
    console.error('Error creating or updating interesado: ', error);
    return res.status(500).json({ message: 'Error creating or updating interesado', error: error.message });
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
