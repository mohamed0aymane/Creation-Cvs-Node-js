import { selectAll,selectbyTechnologie,selectbyName} from "../repositories/cvs.repository.js";

export async function getAllCVs() {
    return await selectAll(); 
}

export async function getCVsByTechnology(technology) {

    return await selectbyTechnologie(technology); 
}

export async function getCVsByName(name) {
    return await selectbyName(name); 
}