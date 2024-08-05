import express from 'express';
import { getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario } from '../controllers/usuariosController.js';
const router = express.Router();

router.get('/listar', getUsuarios);
router.get('/listar/:id', getUsuario);
router.post('/registrar', createUsuario);
router.put('/actualizar/:id', updateUsuario);
router.delete('/eliminar/:id', deleteUsuario);

export default router;
