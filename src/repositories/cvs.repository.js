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

