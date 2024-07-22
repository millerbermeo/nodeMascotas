import express from 'express';
import adopcionesRoutes from './src/routers/adopcionesRoutes.js';
import mascotasRoutes from './src/routers/mascotasRoutes.js';
import razasRoutes from './src/routers/razasRoutes.js';
import usuariosRoutes from './src/routers/usuariosRoutes.js';
import bodyParser from 'body-parser';
import cors from "cors"

const app = express();


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/api/adopcion', adopcionesRoutes);
app.use('/api/mascotas', mascotasRoutes);
app.use('/api/razas', razasRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Puerto de la aplicación
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
