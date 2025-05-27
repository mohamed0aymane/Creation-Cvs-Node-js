import fs from 'fs';

const source='src/data/cvs.json';



// selectAll
export function selectAll(){
    return new Promise((resolve, reject) => {
        fs.readFile(source, 'utf8', (err, data) => {
            if (err) reject(err);
            else {
                const cvs = JSON.parse(data); 
                resolve(cvs);
            }
        })
    })
}

// Filtre par technologie "Java" :selectbyTechnologie("Java")
export function selectbyTechnologie(technology) {
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
export function selectbyName(name) {
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