import express from 'express';
import { getInteresados, getInteresado, createInteresado, updateInteresado, deleteInteresado } from '../controllers/interesadosController.js';

const router = express.Router();

router.get('/listar', getInteresados);
router.get('/listar/:id', getInteresado);
router.post('/registrar', createInteresado);
router.put('/actualizar/:id', updateInteresado);
router.delete('/eliminar/:id', deleteInteresado);

export default router;
