import { selectAll} from "../repositories/cvs.repository.js";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const source = path.join(__dirname, "../data/cvs.json");

export async function getAllCVs() {
    return await selectAll(); 
}



// Filtre par technologie "Java" :selectbyTechnologie("Java")
export function  getCVsByTechnology(technology) {
    return new Promise((resolve, reject) => {
        fs.readFile(source, 'utf8', (err, data) => {
            if (err) reject(err);
            else {
                const cvs = JSON.parse(data);
                const filteredCvs = cvs.filter(cv => 
                    cv.technologySkills.some(skillObj => 
                        skillObj.skill.toLowerCase().includes(technology.toLowerCase())
                    )
                );
                resolve(filteredCvs);
            }
        })
    })
}

// Filtre par nom "Aymane" selectbyName("Lamhamdi Mohamed Aymane")
export function getCVsByName(name) {
    return new Promise((resolve, reject) => {
        fs.readFile(source, 'utf8', (err, data) => {
            if (err) reject(err);
            else {
                const cvs = JSON.parse(data);
                const searchName = name.toLowerCase().trim();
                
                const filteredCvs = cvs.filter(cv => {
                    const fullName = `${cv.profile.firstName} ${cv.profile.lastName}`.toLowerCase();
                    return fullName.includes(searchName);
                });
                
                resolve(filteredCvs);
            }
        })
    })
}
