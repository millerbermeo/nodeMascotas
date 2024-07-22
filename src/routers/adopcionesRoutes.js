import express from 'express';
import { getAdopciones, getAdopcion, createAdopcion, updateAdopcion, deleteAdopcion } from '../controllers/adopcionesController.js';
const router = express.Router();

router.get('/', getAdopciones);
router.get('/:id', getAdopcion);
router.post('/', createAdopcion);
router.put('/:id', updateAdopcion);
router.delete('/:id', deleteAdopcion);

export default router;
