import express from 'express';
import { getMascotas, getMascota, createMascota, updateMascota, deleteMascota,  makeAvailable, makeAdopted, getMascotasSummary, makeEspera } from '../controllers/mascotasController.js';
import upload from  '../middleware/upload.js'

const router = express.Router();

router.get('/listar', getMascotas);
router.get('/listar/:id', getMascota);
router.post('/registrar', upload.single('image'), createMascota);  // Usa upload.single para manejar la subida de la imagen
router.put('/actualizar/:id', updateMascota);
router.delete('/eliminar/:id', deleteMascota);
router.put('/:id/available', makeAvailable);
router.put('/:id/adopted', makeAdopted);
router.put('/:id/espera', makeEspera);
router.get('/summary', getMascotasSummary);

export default router;
