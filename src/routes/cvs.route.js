import express from 'express';
import { getAllCVs,getCVsByTechnology,getCVsByName } from '../services/cvs.service.js';

const router=express.Router();
  

router.get('/', async (req, res) => {
    try {
        const cvs = await getAllCVs();
        res.json(cvs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET by technology
router.get('/technology/:tech', async (req, res) => {
    try {
        const cvs = await getCVsByTechnology(req.params.tech);
        res.json(cvs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/:name', async (req, res) => {
    try {
        const decodedName = decodeURIComponent(req.params.name);
        const cvs = await getCVsByName(decodedName);
        res.json(cvs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;