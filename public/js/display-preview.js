// Fonction pour afficher les CVs en mode preview (aperçu)
export function displayCVsPreview(cvs) {
    return new Promise((resolve, reject) => {
        try {
            const container = document.getElementById('cvContainer');
            if (!container) throw new Error('Conteneur CV introuvable');
            
            container.innerHTML = '';
            container.className = 'cv-preview-grid'; // Nouvelle classe pour la grille preview

            const fragment = document.createDocumentFragment();
            
            cvs.forEach((cvData, index) => {
                const previewEl = document.createElement('div');
                previewEl.className = 'cv-preview-card';
                previewEl.setAttribute('data-cv-index', index);
                
                previewEl.innerHTML = `
                    <div class="preview-content">
                        <div class="preview-photo">
                            ${cvData.profile.photo ? 
                                `<img src="${cvData.profile.photo}" alt="${cvData.profile.firstName} ${cvData.profile.lastName}" class="preview-picture" />` : 
                                `<div class="preview-picture-placeholder">
                                    <i class="fas fa-user"></i>
                                </div>`
                            }
                        </div>
                        
                        <div class="preview-info">
                            <h3 class="preview-name">${cvData.profile.firstName} ${cvData.profile.lastName}</h3>
                            
                            ${cvData.profile.title ? `<h4 class="preview-title">${cvData.profile.title}</h4>` : ''}
                            
                            <div class="preview-summary">
                                <p>${cvData.profile.professionalSummary || 'Aucun résumé professionnel disponible.'}</p>
                            </div>
                            
                            <div class="preview-skills">
                                ${cvData.technologySkills?.slice(0, 3).map(skill => 
                                    `<span class="preview-skill-tag">${skill.skill}</span>`
                                ).join('')}
                                ${cvData.technologySkills?.length > 3 ? `<span class="preview-skill-more">+${cvData.technologySkills.length - 3} plus</span>` : ''}
                            </div>
                            
                            <button class="preview-view-btn" onclick="viewFullCV(${index})">
                                <i class="fas fa-eye"></i> Voir le CV complet
                            </button>
                        </div>
                    </div>
                `;
                
                fragment.appendChild(previewEl);
            });

            container.appendChild(fragment);
            
            // Stocker les données des CVs globalement pour y accéder depuis viewFullCV
            window.currentCVsData = cvs;
            
            resolve(); 
        } catch (error) {
            console.error('Erreur affichage CVs preview:', error);
            reject(error);
        }
    });
}

// Fonction pour afficher un CV complet
export function viewFullCV(cvIndex) {
    if (!window.currentCVsData || !window.currentCVsData[cvIndex]) {
        console.error('Données CV non trouvées pour l\'index:', cvIndex);
        return;
    }
    
    const selectedCV = window.currentCVsData[cvIndex];
    
    // Utiliser la fonction displayCVs existante pour afficher le CV complet
    import('./display.js').then(module => {
        const container = document.getElementById('cvContainer');
        container.className = 'cv-grid'; // Restaurer la classe normale
        
        // Afficher seulement le CV sélectionné
        module.displayCVs([selectedCV]).then(() => {
            // Ajouter un bouton retour
            addBackButton();
            
            // Scroll vers le haut pour voir le CV
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Fonction pour ajouter un bouton retour
function addBackButton() {
    const container = document.getElementById('cvContainer');
    const backButton = document.createElement('div');
    backButton.className = 'back-button-container';
    backButton.innerHTML = `
        <button class="back-button" onclick="returnToPreview()">
            <i class="fas fa-arrow-left"></i> Retour à la liste
        </button>
    `;
    
    container.insertBefore(backButton, container.firstChild);
}

// Fonction pour retourner à la vue preview
export function returnToPreview() {
    if (window.currentCVsData) {
        displayCVsPreview(window.currentCVsData);
    }
}

// Exposer les fonctions globalement
window.viewFullCV = viewFullCV;
window.returnToPreview = returnToPreview;