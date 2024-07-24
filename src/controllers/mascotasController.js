import { pool } from '../database/conexion.js';

export const getMascotas = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM mascotas');
    res.json(result);
  } catch (error) {
    console.error('Error fetching mascotas: ', error);
    res.status(500).json({ message: 'Error fetching mascotas' });
  }
};

export const getMascota = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('SELECT * FROM mascotas WHERE id = ?', [id]);
    if (result.length === 0) {
      return res.status(404).json({ message: 'Mascota not found' });
    }
    res.json(result[0]);
  } catch (error) {
    console.error('Error fetching mascota: ', error);
    res.status(500).json({ message: 'Error fetching mascota' });
  }
};

export const createMascota = async (req, res) => {
  const { nombre, edad, raza_id, descripcion, estado } = req.body;
  const imagen_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    await pool.query(
      'INSERT INTO mascotas (nombre, edad, raza_id, descripcion, imagen_url, estado) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, edad, raza_id, descripcion, imagen_url, estado]
    );
    res.json({ message: 'Mascota created', data: { nombre, edad, raza_id, descripcion, imagen_url, estado } });
  } catch (error) {
    console.error('Error creating mascota: ', error);
    res.status(500).json({ message: 'Error creating mascota' });
  }
};

export const updateMascota = async (req, res) => {
  const { id } = req.params;
  const { nombre, edad, raza_id, descripcion, estado } = req.body;
  const imagen_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    await pool.query(
      'UPDATE mascotas SET nombre = ?, edad = ?, raza_id = ?, descripcion = ?, imagen_url = ?, estado = ? WHERE id = ?',
      [nombre, edad, raza_id, descripcion, imagen_url, estado, id]
    );
    res.json({ message: 'Mascota updated' });
  } catch (error) {
    console.error('Error updating mascota: ', error);
    res.status(500).json({ message: 'Error updating mascota' });
  }
};

export const deleteMascota = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM mascotas WHERE id = ?', [id]);
    res.json({ message: 'Mascota deleted' });
  } catch (error) {
    console.error('Error deleting mascota: ', error);
    res.status(500).json({ message: 'Error deleting mascota' });
  }
};
