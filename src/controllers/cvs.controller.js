import { getAllCVs, getCVsByTechnology, getCVsByName } from '../services/cvs.service.js';


export  async function getAllCVsController (req, res) {
    try {
        const cvs = await getAllCVs();
        res.json(cvs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export  async  function getCVsByTechnologyController (req, res)  {
    try {
        const cvs = await getCVsByTechnology(req.params.tech);
        res.json(cvs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export  async function getCVsByNameController  (req, res) {
    try {
        const decodedName = decodeURIComponent(req.params.name);
        const cvs = await getCVsByName(decodedName);
        res.json(cvs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};