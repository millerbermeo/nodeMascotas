import express from 'express';
import { getRazas, getRaza, createRaza, updateRaza, deleteRaza } from '../controllers/razasController.js';
const router = express.Router();

router.get('/listar', getRazas);
router.get('/listar/:id', getRaza);
router.post('/registrar', createRaza);
router.put('/actualizar/:id', updateRaza);
router.delete('/eliminar/:id', deleteRaza);

export default router;
