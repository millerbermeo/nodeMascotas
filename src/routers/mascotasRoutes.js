import express from 'express';
import { getMascotas, getMascota, createMascota, updateMascota, deleteMascota } from '../controllers/mascotasController.js';
const router = express.Router();

router.get('/', getMascotas);
router.get('/:id', getMascota);
router.post('/', createMascota);
router.put('/:id', updateMascota);
router.delete('/:id', deleteMascota);

export default router;
