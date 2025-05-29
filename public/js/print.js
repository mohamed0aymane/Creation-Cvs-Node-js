import { displayCVs } from './display.js';

window.printCV = function(button) {
    const cvCard = button.closest('.cv-card');
    const printWindow = window.open('', '_blank');
    
    // Récupérer tous les styles de la page principale
    const styles = Array.from(document.head.querySelectorAll('link[rel="stylesheet"], style'))
        .map(style => style.outerHTML)
        .join('\n');
    
        
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>CV - ${cvCard.querySelector('.profile-name').textContent}</title>
            ${styles}
            <link rel="stylesheet" href="/css/print.css">
            <style>
                @media print {
                    .print-button-container { display: none; }
                    body { padding: 10px; }
                    @page { margin: 0.5cm; }
                }
            </style>
        </head>
        <body>
            <div class="cv-card">
                ${cvCard.innerHTML}
            </div>
            <script>
                window.addEventListener('load', function() {
                    window.print();
                    setTimeout(function() {
                        window.close();
                    }, 1000);
                });
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
};