function getSavedTheme() {
    return new Promise(function(resolve) {
        var savedTheme = localStorage.getItem('selectedTheme');
        resolve(savedTheme || 'style1'); // Valeur par défaut
    });
}

function saveTheme(theme) {
    return new Promise(function(resolve) {
        localStorage.setItem('selectedTheme', theme);
        resolve();
    });
}

function applyTheme(theme) {
    return new Promise(function(resolve) {
        var themeLink = document.getElementById('cv-theme');
        themeLink.href = 'css/' + theme + '.css';
        resolve();
    });
}

function initTheme() {
    getSavedTheme()
        .then(function(savedTheme) {
            return applyTheme(savedTheme).then(function() {
                var themeSelector = document.getElementById('themeSelector');
                themeSelector.value = savedTheme;

                themeSelector.addEventListener('change', function() {
                    var selectedTheme = themeSelector.value;
                    applyTheme(selectedTheme)
                        .then(function() {
                            return saveTheme(selectedTheme);
                        })
                        .catch(function(error) {
                            console.error('Erreur lors du changement de thème :', error);
                        });
                });
            });
        })
        .catch(function(error) {
            console.error('Erreur de gestion du thème :', error);
            applyTheme('style3');
        });
}

// Démarrer l'initialisation quand le DOM est prêt
document.addEventListener('DOMContentLoaded', initTheme);
