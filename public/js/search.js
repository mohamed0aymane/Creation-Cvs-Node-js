import { displayCVs } from './display.js';



async function fetchCVs () {
        return new Promise((resolve, reject) => {
            fetch('/api/cvs')
                .then(response => {
                    if (!response.ok) throw new Error('Erreur de réseau');
                    return response.json();
                })
                .then(data => resolve(data))
                .catch(error => reject(error));
        })
}


// Fonction de recherche principale
async function performCombinedSearch() {
    try {
        const nameQuery = document.getElementById('searchByName').value.trim().toLowerCase();
        const techQuery = document.getElementById('searchByTechnology').value.trim().toLowerCase();

        // Récupération des CVs via la promesse
        const allCVs = await fetchCVs();
        
        // Filtrage des résultats
        const filteredCVs = allCVs.filter(cv => {
            const fullName = `${cv.profile.firstName} ${cv.profile.lastName}`.toLowerCase();
            const technologies = cv.technologySkills.flatMap(skill => 
                [skill.skill, ...(skill.details || [])].map(t => t.toLowerCase())
            );

            const nameMatch = !nameQuery || fullName.includes(nameQuery);
            const techMatch = !techQuery || technologies.some(t => t.includes(techQuery));

            return nameMatch && techMatch;
        });

        displayCVs(filteredCVs);
    } catch (error) {
        console.error('Erreur:', error);
        
    }
}


function clearSearch() {
    document.getElementById('searchByName').value = '';
    document.getElementById('searchByTechnology').value = '';
    performCombinedSearch();
}

// Chargement initial avec gestion de promesse
fetchCVs()
    .then(initialCVs => displayCVs(initialCVs))
    .catch(error => console.error('Erreur de chargement initial:', error));

// Exposer les fonctions globalement
window.performCombinedSearch = performCombinedSearch;
window.clearSearch = clearSearch;