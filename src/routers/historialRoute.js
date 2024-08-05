import { Router } from 'express';
import { getHistoriales, getHistorial, createHistorial, updateHistorial, deleteHistorial } from '../controllers/historialController.js';

const router = Router();

router.get('/listar', getHistoriales);
router.get('/listar/:id', getHistorial);
router.post('/registrar', createHistorial);
router.put('/actualizar/:id', updateHistorial);
router.delete('/elminar/:id', deleteHistorial);

export default router;
