document.addEventListener('DOMContentLoaded', function() {
    const themeSelector = document.getElementById('themeSelector');
    const themeLink = document.getElementById('cv-theme');

    // Charger le thème sauvegardé s'il existe
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        themeLink.href = `css/${savedTheme}.css`;
        themeSelector.value = savedTheme;
    }

    // Écouter les changements de sélection
    themeSelector.addEventListener('change', function() {
        const selectedTheme = this.value;
        themeLink.href = `css/${selectedTheme}.css`;
        localStorage.setItem('selectedTheme', selectedTheme);
    });
});