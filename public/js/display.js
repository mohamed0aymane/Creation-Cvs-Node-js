export function displayCVs(cvs) {
    return new Promise((resolve, reject) => {
        try {
            const container = document.getElementById('cvContainer');
            if (!container) throw new Error('Conteneur CV introuvable');
            
            container.innerHTML = '';

            const fragment = document.createDocumentFragment();
            
            cvs.forEach(cvData => {
                const cvEl = document.createElement('div');
                cvEl.className = 'cv-card';
                cvEl.innerHTML = `
            <div class="container-main">
                <div class="container-profile">
                    <section class="profile-image">
                        ${cvData.profile.photo ? 
                        `<img src="${cvData.profile.photo}" alt="${cvData.profile.lastName}" class="picture" />` : ''}
                    </section>

                    <section class="profile-contacts">
                        <span class="profile-titles">Contact</span>
                        <div class="contact-content">
                            ${cvData.profile.phone ? `<div><i class="fas fa-phone"></i><span class="phone">${cvData.profile.phone}</span></div>` : ''}
                            ${cvData.profile.email ? `<div><i class="fas fa-envelope"></i><span class="email">${cvData.profile.email}</span></div>` : ''}
                            ${cvData.profile.address ? `<div><i class="fas fa-map-marker-alt"></i><span class="address">${cvData.profile.address}</span></div>` : ''}
                            ${cvData.profile.links?.linkedin ? `<div><i class="fab fa-linkedin"></i><span class="linkedin">${cvData.profile.links.linkedin}</span></div>` : ''}
                            ${cvData.profile.links?.github ? `<div><i class="fab fa-github"></i><span class="github">${cvData.profile.links.github}</span></div>` : ''}
                        </div>
                    </section>

                    ${cvData.softSkills?.length ? `
                    <section class="profile-skills">
                        <span class="profile-titles">Soft skills</span>
                        <div class="skills-content">
                            ${cvData.softSkills.map(skill => `<span class="skill">${skill}</span>`).join('')}
                        </div>
                    </section>` : ''}

                    ${cvData.interests?.length ? `
                    <section class="profile-loisirs">
                        <span class="profile-titles">Loisirs</span>
                        <div class="loisirs-content">
                            ${cvData.interests.map(interest => `<span class="loisirs">${interest}</span>`).join('')}
                        </div>
                    </section>` : ''}

                    ${cvData.languages?.length ? `
                    <section class="profile-langues">
                        <span class="profile-titles">Langues</span>
                        <div class="langues-content">
                            ${cvData.languages.map(lang => `<span class="langue">${lang.language} : ${lang.level}</span>`).join('')}
                        </div>
                    </section>` : ''}
                </div>

                <div class="container-parcours">
                    <div class="parcours-description">
                        <div class="description-profile">
                            <span class="profile-name">${cvData.profile.firstName} ${cvData.profile.lastName}</span>
                            ${cvData.profile.title ? `<span class="profile-title">${cvData.profile.title}</span>` : ''}
                        </div>
                        ${cvData.profile.professionalSummary ? `
                        <div class="description-content">
                            <span class="description">${cvData.profile.professionalSummary}</span>
                        </div>` : ''}
                    </div>

                    <div class="parcours-experience">
                        ${cvData.education?.length ? `
                        <section class="experience-academiques">
                            <span class="section-title">Parcours Académiques</span>
                            <div class="academiques-content">
                                ${cvData.education.map(edu => `
                                    <div>
                                        <span class="academique-title">${edu.diploma}</span>
                                        <div class="academique-details">
                                            <span class="academique-school">${edu.organisation}</span>
                                            ${edu.year ? `<span class="academique-year">${edu.year}</span>` : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>` : ''}

                        ${cvData.experiences?.length ? `
                        <section class="experience-stages">
                            ${cvData.experiences.filter(exp => exp.type === "Stage").length ? `
                            <span class="section-title">Stages</span>
                            <div class="stages-content">
                                ${cvData.experiences
                                .filter(exp => exp.type === "Stage")
                                .map(exp => `
                                    <div class="stage-item">
                                        <span class="item-title">${exp.title}</span>
                                        ${exp.description ? `<span class="item-attached">${exp.description}</span>` : ''}
                                        <div class="item-details">
                                            ${exp.organisation ? `<span class="item-company">${exp.organisation}</span>` : ''}
                                            ${exp.duration ? `<span class="item-year">${exp.duration}</span>` : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>` : ''}

                            ${cvData.experiences.filter(exp => exp.type === "Projet").length ? `
                            <span class="section-title">Projets</span>
                            <div class="projets-content">
                                ${cvData.experiences
                                .filter(exp => exp.type === "Projet")
                                .map(exp => `
                                    <div class="projet-item">
                                        <span class="projet-titles">${exp.title}</span>
                                        ${exp.technologies?.length ? `
                                        <span class="projet-technologies">
                                            ${exp.technologies.join(', ')}
                                        </span>` : ''}
                                    </div>
                                `).join('')}
                            </div>` : ''}
                        </section>` : ''}

                        ${cvData.technologySkills?.length ? `
                        <section class="experience-competencesTechnologies">
                            <span class="section-title">Compétences technologiques</span>
                            <div class="competencesTechnologies-content">
                                ${cvData.technologySkills.map(skill => `
                                <div class="competencesTechnologies-category">
                                    <span class="competencesTechnologies-category-title">${skill.skill}</span>
                                    ${skill.details?.length ? `
                                    <div class="competencesTechnologies-list">
                                        <span class="competencesTechnologies">${skill.details.join(', ')}</span>
                                    </div>` : ''}
                                </div>
                                `).join('')}
                            </div>
                        </section>` : ''}

                        ${cvData.professionalExperiences?.length ? `
                        <section class="experience-professionnelle">
                            <span class="section-title">Experiences Professionnelle</span>
                            <div class="professionnelle-content">
                                ${cvData.professionalExperiences.map(exppro => `
                                <div class="professionnelle-item">
                                    <span class="item-title">${exppro.title}</span>
                                    ${exppro.organisation ? `<span class="item-place">${exppro.organisation}</span>` : ''}   
                                </div>
                                `).join('')}
                            </div>
                        </section>` : ''}
                    </div>
                </div>
                <div class="print-button-container">
                        <button class="print-button" onclick="printCV(this)">
                            <i class="fas fa-print"></i> Imprimer
                        </button>
                </div>
            </div >
        `;
                fragment.appendChild(cvEl);
            });

            container.appendChild(fragment);
            resolve(); 
        } catch (error) {
            console.error('Erreur affichage CVs:', error);
            reject(error);
        }
    });
}

