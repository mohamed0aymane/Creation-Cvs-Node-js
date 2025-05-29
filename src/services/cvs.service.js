import { selectAll} from "../repositories/cvs.repository.js";

export async function getAllCVs() {
    return await selectAll(); 
}



// Filtre par technologie "Java" :selectbyTechnologie("Java")
export function  getCVsByTechnology(technology) {
    data = JSON.parse(fs.readFileSync(source, 'utf8'));
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
    data = JSON.parse(fs.readFileSync(source, 'utf8'));
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
