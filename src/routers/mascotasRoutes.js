import express from 'express';
import { getMascotas, getMascota, createMascota, updateMascota, deleteMascota } from '../controllers/mascotasController.js';
import upload from  '../middleware/upload.js'

const router = express.Router();

router.get('/', getMascotas);
router.get('/:id', getMascota);
router.post('/', upload.single('image'), createMascota);  // Usa upload.single para manejar la subida de la imagen
router.put('/:id', updateMascota);
router.delete('/:id', deleteMascota);

export default router;
