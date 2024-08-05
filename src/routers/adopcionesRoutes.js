import express from 'express';
import { getAdopciones, getAdopcion, createAdopcion, updateAdopcion, deleteAdopcion } from '../controllers/adopcionesController.js';
const router = express.Router();

router.get('/listar', getAdopciones);
router.get('/listar/:id', getAdopcion);
router.post('/registrar', createAdopcion);
router.put('/actualizar/:id', updateAdopcion);
router.delete('/eliminar/:id', deleteAdopcion);

export default router;
