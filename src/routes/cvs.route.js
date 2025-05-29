import express from 'express';
import {getAllCVsController,getCVsByTechnologyController,getCVsByNameController} from '../controllers/cvs.controller.js';

const router = express.Router();

// Définition des routes avec leurs contrôleurs associés
router.get('/', getAllCVsController);
router.get('/technology/:tech', getCVsByTechnologyController);
router.get('/:name', getCVsByNameController);

export default router;