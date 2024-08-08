import { pool } from '../database/conexion.js';

// Obtener todas las adopciones
export const getAdopciones = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        adopciones.id AS adopcion_id,
        usuarios_adopcion.nombre AS usuario_nombre,
        usuarios_adopcion.telefono,
        mascotas.nombre AS mascota_nombre,
        adopciones.fecha_adopcion AS fecha_adopcion,
        adopciones.ubicacion,  -- Aquí se añade el campo ubicación
        usuarios_dueño.nombre AS dueno_nombre
      FROM 
        adopciones
      JOIN 
        usuarios AS usuarios_adopcion ON adopciones.usuario_id = usuarios_adopcion.id
      JOIN 
        mascotas ON adopciones.mascota_id = mascotas.id
      JOIN 
        usuarios AS usuarios_dueño ON mascotas.usuario_id = usuarios_dueño.id
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching adopciones: ', error);
    res.status(500).json({ message: 'Error fetching adopciones', error: error.message });
  }
};

// Obtener una adopcion por ID
export const getAdopcion = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT a.*, m.nombre, m.edad, m.genero, m.raza, m.esterilizado, m.descripcion, m.imagen_url, m.estado, m.usuario_id FROM adopciones a JOIN mascotas m ON a.mascota_id = m.id WHERE a.usuario_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Adopcion not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching adopcion: ', error);
    res.status(500).json({ message: 'Error fetching adopcion', error: error.message });
  }
};

// Crear una nueva adopcion
export const createAdopcion = async (req, res) => {
  const { usuario_id, mascota_id, fecha_adopcion, ubicacion } = req.body; // Aquí se añade el campo ubicación

  // Validar datos de entrada
  if (!usuario_id || !mascota_id || !fecha_adopcion || !ubicacion) { // Validar ubicación
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Verificar existencia del usuario y mascota
    const [userRows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [usuario_id]);
    if (userRows.length === 0) {
      return res.status(404).json({ message: 'Usuario not found' });
    }

    const [petRows] = await pool.query('SELECT * FROM mascotas WHERE id = ?', [mascota_id]);
    if (petRows.length === 0) {
      return res.status(404).json({ message: 'Mascota not found' });
    }

    // Insertar la adopción en la base de datos
    await pool.query(
      'INSERT INTO adopciones (usuario_id, mascota_id, fecha_adopcion, ubicacion) VALUES (?, ?, ?, ?)', // Añadir ubicación
      [usuario_id, mascota_id, fecha_adopcion, ubicacion] // Añadir ubicación
    );

    // Actualizar el estado de la mascota a "adoptado"
    await pool.query(
      'UPDATE mascotas SET estado = 3 WHERE id = ?',
      [mascota_id]
    );

    res.status(201).json({ message: 'Adopcion created and mascota updated to adopted' });
  } catch (error) {
    console.error('Error creating adopcion: ', error);
    res.status(500).json({ message: 'Error creating adopcion', error: error.message });
  }
};

// Actualizar una adopcion existente
export const updateAdopcion = async (req, res) => {
  const { usuario_id, mascota_id, fecha_adopcion, ubicacion } = req.body; // Aquí se añade el campo ubicación
  const { id } = req.params;

  // Validar datos de entrada
  if (!usuario_id || !mascota_id || !fecha_adopcion || !ubicacion) { // Validar ubicación
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Verificar existencia de adopcion
    const [adopcionRows] = await pool.query('SELECT * FROM adopciones WHERE id = ?', [id]);
    if (adopcionRows.length === 0) {
      return res.status(404).json({ message: 'Adopcion not found' });
    }

    await pool.query(
      'UPDATE adopciones SET usuario_id = ?, mascota_id = ?, fecha_adopcion = ?, ubicacion = ? WHERE id = ?', // Añadir ubicación
      [usuario_id, mascota_id, fecha_adopcion, ubicacion, id] // Añadir ubicación
    );
    res.json({ message: 'Adopcion updated' });
  } catch (error) {
    console.error('Error updating adopcion: ', error);
    res.status(500).json({ message: 'Error updating adopcion', error: error.message });
  }
};

// Eliminar una adopcion
export const deleteAdopcion = async (req, res) => {
  const { id } = req.params;
  try {
    // Verificar existencia de adopcion
    const [adopcionRows] = await pool.query('SELECT * FROM adopciones WHERE id = ?', [id]);
    if (adopcionRows.length === 0) {
      return res.status(404).json({ message: 'Adopcion not found' });
    }

    await pool.query('DELETE FROM adopciones WHERE id = ?', [id]);
    res.json({ message: 'Adopcion deleted' });
  } catch (error) {
    console.error('Error deleting adopcion: ', error);
    res.status(500).json({ message: 'Error deleting adopcion', error: error.message });
  }
};
