// Service de gestion du thème avec promesses
const themeService = {
    getSavedTheme: () => {
        return new Promise((resolve) => {
            const savedTheme = localStorage.getItem('selectedTheme');
            resolve(savedTheme || 'style3'); // Valeur par défaut
        });
    },
    
    saveTheme: (theme) => {
        return new Promise((resolve) => {
            localStorage.setItem('selectedTheme', theme);
            resolve();
        });
    },
    
    applyTheme: (theme) => {
        return new Promise((resolve) => {
            const themeLink = document.getElementById('cv-theme');
            themeLink.href = `css/${theme}.css`;
            resolve();
        });
    }
};

// Initialisation du thème
async function initTheme() {
    try {
        const savedTheme = await themeService.getSavedTheme();
        await themeService.applyTheme(savedTheme);
        
        const themeSelector = document.getElementById('themeSelector');
        themeSelector.value = savedTheme;
        
        themeSelector.addEventListener('change', async () => {
            const selectedTheme = themeSelector.value;
            await themeService.applyTheme(selectedTheme);
            await themeService.saveTheme(selectedTheme);
        });
    } catch (error) {
        console.error('Erreur de gestion du thème:', error);
        // Fallback au thème par défaut
        themeService.applyTheme('style3');
    }
}

// Démarrer l'initialisation quand le DOM est prêt
document.addEventListener('DOMContentLoaded', initTheme);