import express from 'express';
import { getRazas, getRaza, createRaza, updateRaza, deleteRaza } from '../controllers/razasController.js';
const router = express.Router();

router.get('/', getRazas);
router.get('/:id', getRaza);
router.post('/', createRaza);
router.put('/:id', updateRaza);
router.delete('/:id', deleteRaza);

export default router;
