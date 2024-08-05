import { pool } from '../database/conexion.js';

// Obtener todos los historiales
export const getHistoriales = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM historial');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching historiales: ', error);
    res.status(500).json({ message: 'Error fetching historiales', error: error.message });
  }
};

// Obtener un historial por ID
export const getHistorial = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM historial WHERE mascota_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Historial not found' });
    }
    res.json(rows);
  } catch (error) {
    console.error('Error fetching historial: ', error);
    res.status(500).json({ message: 'Error fetching historial', error: error.message });
  }
};

// Crear un nuevo historial
export const createHistorial = async (req, res) => {
  const { mascota_id, vacuna, fecha_creacion, fecha_visita_v, motivo_consulta, diagnostico, tratamiento, observaciones, veterinaria } = req.body;

  if (!mascota_id || !fecha_visita_v || !motivo_consulta || !diagnostico || !tratamiento || !veterinaria) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO historial (mascota_id, vacuna, fecha_creacion, fecha_visita_v, motivo_consulta, diagnostico, tratamiento, observaciones, veterinaria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [mascota_id, vacuna, fecha_creacion, fecha_visita_v, motivo_consulta, diagnostico, tratamiento, observaciones, veterinaria]
    );
    res.status(201).json({ message: 'Historial created', id: result.insertId });
  } catch (error) {
    console.error('Error creating historial: ', error);
    res.status(500).json({ message: 'Error creating historial', error: error.message });
  }
};

// Actualizar un historial existente
export const updateHistorial = async (req, res) => {
  const { id } = req.params;
  const { mascota_id, vacuna, fecha_creacion, fecha_visita_v, motivo_consulta, diagnostico, tratamiento, observaciones, veterinaria } = req.body;

  if (!mascota_id || !fecha_visita_v || !motivo_consulta || !diagnostico || !tratamiento || !veterinaria) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const [result] = await pool.query(
      'UPDATE historial SET mascota_id = ?, vacuna = ?, fecha_creacion = ?, fecha_visita_v = ?, motivo_consulta = ?, diagnostico = ?, tratamiento = ?, observaciones = ?, veterinaria = ? WHERE id_historial = ?',
      [mascota_id, vacuna, fecha_creacion, fecha_visita_v, motivo_consulta, diagnostico, tratamiento, observaciones, veterinaria, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Historial not found' });
    }
    res.json({ message: 'Historial updated' });
  } catch (error) {
    console.error('Error updating historial: ', error);
    res.status(500).json({ message: 'Error updating historial', error: error.message });
  }
};

// Eliminar un historial
export const deleteHistorial = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM historial WHERE id_historial = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Historial not found' });
    }
    res.json({ message: 'Historial deleted' });
  } catch (error) {
    console.error('Error deleting historial: ', error);
    res.status(500).json({ message: 'Error deleting historial', error: error.message });
  }
};
