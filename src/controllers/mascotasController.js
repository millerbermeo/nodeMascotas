import { pool } from '../database/conexion.js';

// Obtener todas las mascotas
export const getMascotas = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT m.id, m.nombre AS mascota_nombre, m.edad, m.genero, m.raza, 
             m.descripcion, m.imagen_url, m.estado, m.esterilizado, m.usuario_id, m.fecha_creacion,
             u.nombre AS dueno, u.telefono,
             COUNT(i.id_interes) AS num_interesados
      FROM mascotas m 
      JOIN usuarios u ON m.usuario_id = u.id
      LEFT JOIN interesados i ON m.id = i.mascota_id
      GROUP BY m.id
      ORDER BY m.fecha_creacion DESC
    `);
    res.json(result);
  } catch (error) {
    console.error('Error fetching mascotas: ', error);
    res.status(500).json({ message: 'Error fetching mascotas', error: error.message });
  }
};


// Obtener una mascota por ID
export const getMascota = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('SELECT * FROM mascotas WHERE usuario_id = ?', [id]);
    if (result.length === 0) {
      return res.status(404).json({ message: 'Mascota not found' });
    }
    res.json(result);
  } catch (error) {
    console.error('Error fetching mascota: ', error);
    res.status(500).json({ message: 'Error fetching mascota', error: error.message });
  }
};

// Crear una nueva mascota
export const createMascota = async (req, res) => {
  const { nombre, edad, genero, raza, descripcion, estado, esterilizado, usuario_id } = req.body;
  const imagen_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    await pool.query(
      'INSERT INTO mascotas (nombre, edad, genero, raza, descripcion, imagen_url, estado, esterilizado, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, edad, genero, raza, descripcion, imagen_url, estado, esterilizado, usuario_id]
    );
    res.json({ message: 'Mascota created', data: { nombre, edad, genero, raza, descripcion, imagen_url, estado, esterilizado, usuario_id } });
  } catch (error) {
    console.error('Error creating mascota: ', error);
    res.status(500).json({ message: 'Error creating mascota', error: error.message });
  }
};

export const updateMascota = async (req, res) => {
  const { id } = req.params;
  const { nombre, edad, genero, raza, descripcion, estado, esterilizado, usuario_id } = req.body;
  const imagen_url = req.file ? `/uploads/${req.file.filename}` : req.body.imagen_url;

  console.log(nombre, edad, genero, raza, descripcion, estado, esterilizado, usuario_id);

  // if (!nombre || !edad || !genero || !descripcion || !estado || !esterilizado || !usuario_id) {
  //   return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  // }

  try {
    const [existingMascota] = await pool.query('SELECT imagen_url FROM mascotas WHERE id = ?', [id]);
    const updatedImagenUrl = req.file ? imagen_url : existingMascota[0].imagen_url;

    await pool.query(
      'UPDATE mascotas SET nombre = ?, edad = ?, genero = ?, raza = ?, descripcion = ?, imagen_url = ?, estado = ?, esterilizado = ?, usuario_id = ? WHERE id = ?',
      [nombre, edad, genero, raza, descripcion, updatedImagenUrl, estado, esterilizado, usuario_id, id]
    );
    res.json({ message: 'Mascota updated', data: { id, nombre, edad, genero, raza, descripcion, imagen_url: updatedImagenUrl, estado, esterilizado, usuario_id } });
  } catch (error) {
    console.error('Error updating mascota: ', error);
    res.status(500).json({ message: 'Error updating mascota', error: error.message });
  }
};


// Eliminar una mascota
export const deleteMascota = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM mascotas WHERE id = ?', [id]);
    res.json({ message: 'Mascota deleted' });
  } catch (error) {
    console.error('Error deleting mascota: ', error);
    res.status(500).json({ message: 'Error deleting mascota', error: error.message });
  }
};

// Cambiar el estado de la mascota a "disponible"
export const makeAvailable = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('UPDATE mascotas SET estado = ? WHERE id = ?', ['2', id]);
    res.json({ message: 'Mascota está ahora disponible' });
  } catch (error) {
    console.error('Error updating mascota to available: ', error);
    res.status(500).json({ message: 'Error updating mascota', error: error.message });
  }
};

// Cambiar el estado de la mascota a "adoptado"
export const makeAdopted = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('UPDATE mascotas SET estado = ? WHERE id = ?', ['3', id]);
    res.json({ message: 'Mascota ha sido adoptada' });
  } catch (error) {
    console.error('Error updating mascota to adopted: ', error);
    res.status(500).json({ message: 'Error updating mascota', error: error.message });
  }
};


export const makeEspera = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('UPDATE mascotas SET estado = ? WHERE id = ?', ['4', id]);
    res.json({ message: 'Mascota ha sido puesta en espera' });
  } catch (error) {
    console.error('Error updating mascota to adopted: ', error);
    res.status(500).json({ message: 'Error updating mascota', error: error.message });
  }
};


export const getMascotasSummary = async (req, res) => {
  try {
    const [totalResult] = await pool.query('SELECT COUNT(*) AS total FROM mascotas');
    const [disponiblesResult] = await pool.query('SELECT COUNT(*) AS disponibles FROM mascotas WHERE estado = "Disponible"');
    const [adoptadosResult] = await pool.query('SELECT COUNT(*) AS adoptados FROM mascotas WHERE estado = "Adoptado"');
    const [pendientesResult] = await pool.query('SELECT COUNT(*) AS pendientes FROM mascotas WHERE estado = "Pendiente"');

    const summary = {
      total: totalResult[0].total,
      disponibles: disponiblesResult[0].disponibles,
      adoptados: adoptadosResult[0].adoptados,
      pendientes: pendientesResult[0].pendientes,
    };
console.log(summary)
    res.json(summary);
  } catch (error) {
    console.error('Error fetching mascotas summary: ', error);
    res.status(500).json({ message: 'Error fetching mascotas summary', error: error.message });
  }
};
