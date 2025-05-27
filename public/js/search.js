import { displayCVs } from './display.js';
async function fetchCVs(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erreur de réseau');
        return await response.json();
    } catch (error) {
        console.error('Erreur:', error);
        return [];
    }
}



async function performCombinedSearch() {
    const nameQuery = document.getElementById('searchByName').value.trim().toLowerCase();
    const techQuery = document.getElementById('searchByTechnology').value.trim().toLowerCase();

    try {
        // Récupérer tous les CVs
        const allCVs = await fetchCVs('/api/cvs');
        
        // Filtrer les résultats
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

// Modification du chargement initial
window.onload = async () => {
    const initialCVs = await fetchCVs('/api/cvs');
    displayCVs(initialCVs);
};