import express from 'express';
import adopcionesRoutes from './src/routers/adopcionesRoutes.js';
import mascotasRoutes from './src/routers/mascotasRoutes.js';
import razasRoutes from './src/routers/razasRoutes.js';
import usuariosRoutes from './src/routers/usuariosRoutes.js';
import auth from './src/routers/authRoutes.js';
import bodyParser from 'body-parser';
import cors from "cors";
import { pool } from './src/database/conexion.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import historialRouter from './src/routers/historialRoute.js';
import interesadosRoutes from './src/routers/interesadosRoutes.js';

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("conexión establecida");
  } catch (error) {
    console.error("error de conexión: ", error);
  }
})();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));

// Rutas
app.use('/api/auth', auth);
app.use('/api/adopcion', adopcionesRoutes);
app.use('/api/mascotas', mascotasRoutes);
app.use('/api/razas', razasRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/historial', historialRouter);
app.use('/api/interesados', interesadosRoutes);

// Puerto de la aplicación
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
