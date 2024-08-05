import express from 'express';
import { ValidarUsuario, validarToken } from '../controllers/auth.controller.js';

const router = express.Router();

// Ruta para login
router.post('/login', ValidarUsuario);

// Ruta protegida de ejemplo
router.get('/protected', validarToken, (req, res) => {
  res.json({ message: 'Acceso autorizado', user: req.user });
});

export default router;
