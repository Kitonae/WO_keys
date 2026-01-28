// WATCHOUT Wiki/User Guide - Application Logic

// DOM Elements
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const tocNav = document.getElementById('toc-nav');
const searchInput = document.getElementById('search-input');
const searchClear = document.getElementById('search-clear');
const breadcrumb = document.getElementById('breadcrumb');
const contentBody = document.getElementById('content-body');
const welcomeSection = document.querySelector('.welcome-section');
const sectionContent = document.getElementById('section-content');
const tocPreviewGrid = document.getElementById('toc-preview-grid');
const themeToggle = document.getElementById('theme-toggle');

// State
let currentSection = null;
let currentChapterIndex = -1;
let expandedChapters = new Set();

// Theme initialization - apply saved theme before page renders
(function initTheme() {
    const savedTheme = localStorage.getItem('watchout-wiki-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

// Initialize the application
function init() {
    renderSidebar();
    renderTocPreview();
    setupEventListeners();
    setupQuickLinks();
    initHeroVideo();
}

// Initialize hero video
function initHeroVideo() {
    const heroMedia = document.getElementById('hero-media');
    if (!heroMedia) return;

    const videos = [
        'media/Live_Show_Programmer_Creates_Scene.mp4',
        'media/Looping_Video_Generation_Complete.mp4',
        'media/Video_Generation_With_Asian_Male_Operator.mp4'
    ];

    const randomVideo = videos[Math.floor(Math.random() * videos.length)];

    heroMedia.innerHTML = `
        <div class="video-wrapper" style="position: relative;">
            <video autoplay muted loop playsinline>
                <source src="${randomVideo}" type="video/mp4">
            </video>
            <div class="hero-overlay">
                <img src="media/watchout-logo.webp" alt="WATCHOUT Logo" class="hero-logo">
            </div>
        </div>
    `;
}

// Render the sidebar table of contents
function renderSidebar() {
    if (!tocNav) return;

    tocNav.innerHTML = chaptersData.map((chapter, index) => `
        <div class="toc-chapter" data-index="${index}">
            <button class="toc-chapter-header" data-title="${chapter.title}">
                <span class="toc-chapter-icon">${getIcon(chapter.icon)}</span>
                <span class="toc-chapter-title">${chapter.title}</span>
                ${chapter.subsections.length > 0 ? `
                    <svg class="toc-chapter-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                ` : ''}
            </button>
            ${chapter.subsections.length > 0 ? `
                <div class="toc-subsections" data-chapter="${index}">
                    ${chapter.subsections.map(sub => `
                        <a class="toc-subsection" href="#" data-title="${sub.title}" data-page="${sub.page}">
                            ${sub.title}
                        </a>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');
}

// Render the TOC preview grid on the welcome page
function renderTocPreview() {
    if (!tocPreviewGrid) return;

    tocPreviewGrid.innerHTML = chaptersData.map(chapter => `
        <div class="toc-card" data-section="${chapter.title}">
            <h4>
                <span class="toc-card-icon">${getIcon(chapter.icon)}</span>
                ${chapter.title}
            </h4>
            ${chapter.subsections.length > 0 ? `
                <div class="toc-card-subsections">
                    ${chapter.subsections.slice(0, 4).map(sub => `
                        <span class="toc-card-subsection">${sub.title}</span>
                    `).join('')}
                    ${chapter.subsections.length > 4 ? `<span class="toc-card-subsection">+${chapter.subsections.length - 4} more</span>` : ''}
                </div>
            ` : ''}
        </div>
    `).join('');

    // Add click handlers
    tocPreviewGrid.querySelectorAll('.toc-card').forEach(card => {
        card.addEventListener('click', () => {
            const sectionTitle = card.dataset.section;
            navigateToSection(sectionTitle);
        });
    });
}

// Setup quick links click handlers
function setupQuickLinks() {
    document.querySelectorAll('.quick-link-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionTitle = card.dataset.section;
            if (sectionTitle) {
                navigateToSection(sectionTitle);
            }
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Sidebar toggle (mobile)
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.add('open');
            sidebarOverlay.classList.add('active');
        });
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            // Toggle collapsed state
            sidebar.classList.toggle('collapsed');
            // Also handle mobile close
            if (sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                sidebarOverlay.classList.remove('active');
            }
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('active');
        });
    }

    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const themes = ['dark', 'light', 'midnight', 'forest', 'synthwave'];
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const currentIndex = themes.indexOf(currentTheme);
            const nextIndex = (currentIndex + 1) % themes.length;
            const newTheme = themes[nextIndex];

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('watchout-wiki-theme', newTheme);
        });
    }

    // Chapter header clicks
    document.querySelectorAll('.toc-chapter-header').forEach(header => {
        header.addEventListener('click', (e) => {
            const chapter = header.closest('.toc-chapter');
            const index = parseInt(chapter.dataset.index);
            const title = header.dataset.title;
            const subsections = chapter.querySelector('.toc-subsections');

            // Toggle expansion
            if (subsections) {
                const isExpanded = subsections.classList.contains('expanded');
                if (isExpanded) {
                    subsections.classList.remove('expanded');
                    header.classList.remove('expanded');
                    expandedChapters.delete(index);
                } else {
                    subsections.classList.add('expanded');
                    header.classList.add('expanded');
                    expandedChapters.add(index);
                }
            }

            // Navigate to section
            navigateToSection(title);

            // Close mobile sidebar
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('active');
        });
    });

    // Subsection clicks
    document.querySelectorAll('.toc-subsection').forEach(sub => {
        sub.addEventListener('click', (e) => {
            e.preventDefault();
            const title = sub.dataset.title;
            navigateToSection(title, true);

            // Close mobile sidebar
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('active');
        });
    });

    // Search
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            filterTOC(query);
            // Show/hide clear button
            if (searchClear) {
                if (e.target.value.length > 0) {
                    searchClear.classList.add('visible');
                } else {
                    searchClear.classList.remove('visible');
                }
            }
        });
    }

    // Search clear button
    if (searchClear) {
        searchClear.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
                filterTOC('');
                searchClear.classList.remove('visible');
                searchInput.focus();
            }
        });
    }

    // Section navigation buttons
    const prevBtn = document.getElementById('prev-section');
    const nextBtn = document.getElementById('next-section');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => navigatePrevNext(-1));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => navigatePrevNext(1));
    }
}

// Filter TOC based on search query
function filterTOC(query) {
    const chapters = document.querySelectorAll('.toc-chapter');

    if (!query) {
        // Show all
        chapters.forEach(chapter => {
            chapter.style.display = 'block';
            const subsections = chapter.querySelectorAll('.toc-subsection');
            subsections.forEach(sub => sub.style.display = 'block');
        });
        return;
    }

    chapters.forEach(chapter => {
        const header = chapter.querySelector('.toc-chapter-header');
        const title = header.dataset.title.toLowerCase();
        const subsections = chapter.querySelectorAll('.toc-subsection');
        const subsectionsContainer = chapter.querySelector('.toc-subsections');

        let hasMatch = title.includes(query);
        let subsectionMatch = false;

        subsections.forEach(sub => {
            const subTitle = sub.dataset.title.toLowerCase();
            if (subTitle.includes(query)) {
                sub.style.display = 'block';
                subsectionMatch = true;
            } else {
                sub.style.display = 'none';
            }
        });

        if (hasMatch || subsectionMatch) {
            chapter.style.display = 'block';
            if (subsectionMatch && subsectionsContainer) {
                subsectionsContainer.classList.add('expanded');
                header.classList.add('expanded');
            }
        } else {
            chapter.style.display = 'none';
        }
    });
}

// Navigate to a specific section
function navigateToSection(title, isSubsection = false) {
    // Find the section data
    let sectionData = null;
    let chapterData = null;
    let chapterIndex = -1;

    for (let i = 0; i < chaptersData.length; i++) {
        const chapter = chaptersData[i];
        if (chapter.title === title) {
            sectionData = chapter;
            chapterData = chapter;
            chapterIndex = i;
            break;
        }
        for (const sub of chapter.subsections) {
            if (sub.title === title) {
                sectionData = sub;
                chapterData = chapter;
                chapterIndex = i;
                break;
            }
        }
        if (sectionData) break;
    }

    if (!sectionData) return;

    currentSection = sectionData;
    currentChapterIndex = chapterIndex;

    // Update sidebar active states
    document.querySelectorAll('.toc-chapter-header').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.toc-subsection').forEach(el => el.classList.remove('active'));

    const chapterEl = document.querySelector(`.toc-chapter[data-index="${chapterIndex}"]`);
    if (chapterEl) {
        const header = chapterEl.querySelector('.toc-chapter-header');
        header.classList.add('active');

        // Expand if needed
        const subsections = chapterEl.querySelector('.toc-subsections');
        if (subsections && (isSubsection || expandedChapters.has(chapterIndex))) {
            subsections.classList.add('expanded');
            header.classList.add('expanded');
        }

        // Highlight subsection if applicable
        if (isSubsection) {
            const subEl = chapterEl.querySelector(`.toc-subsection[data-title="${title}"]`);
            if (subEl) subEl.classList.add('active');
        }
    }

    // Update breadcrumb
    updateBreadcrumb(chapterData, isSubsection ? sectionData : null);

    // Show section content
    renderSectionContent(sectionData, chapterData, isSubsection);

    // Update navigation buttons
    updateNavButtons();
}

// Update breadcrumb
function updateBreadcrumb(chapter, subsection) {
    if (!breadcrumb) return;

    let html = '<span class="breadcrumb-item" style="cursor: pointer" onclick="showWelcome()">Home</span>';

    if (chapter) {
        html += '<span class="breadcrumb-separator">›</span>';
        html += `<span class="breadcrumb-item ${subsection ? '' : 'current'}">${chapter.title}</span>`;
    }

    if (subsection) {
        html += '<span class="breadcrumb-separator">›</span>';
        html += `<span class="breadcrumb-item current">${subsection.title}</span>`;
    }

    breadcrumb.innerHTML = html;
}

// Show welcome page
function showWelcome() {
    if (welcomeSection) welcomeSection.style.display = 'block';
    if (sectionContent) sectionContent.style.display = 'none';
    currentSection = null;
    currentChapterIndex = -1;

    // Clear active states
    document.querySelectorAll('.toc-chapter-header').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.toc-subsection').forEach(el => el.classList.remove('active'));

    // Update breadcrumb
    if (breadcrumb) {
        breadcrumb.innerHTML = '<span class="breadcrumb-item">Home</span>';
    }
}

// Render section content
function renderSectionContent(section, chapter, isSubsection) {
    if (!sectionContent) return;

    // Hide welcome, show section
    if (welcomeSection) welcomeSection.style.display = 'none';
    sectionContent.style.display = 'block';

    const sectionTitle = document.getElementById('section-title');
    const sectionPage = document.getElementById('section-page');
    const sectionBody = document.getElementById('section-body');

    if (sectionTitle) sectionTitle.textContent = section.title;
    if (sectionPage) sectionPage.style.display = 'none'; // Hide page badge

    // Try to get content from wikiContent
    const chapterContent = typeof wikiContent !== 'undefined' ? wikiContent[chapter.title] : null;

    // Generate content based on whether it's a chapter or subsection
    if (!isSubsection && chapter.subsections && chapter.subsections.length > 0) {
        // Chapter view - show overview and subsections
        let overviewHtml = '';
        if (chapterContent && chapterContent.overview) {
            overviewHtml = `<div class="section-overview">${chapterContent.overview}</div>`;
        }

        sectionBody.innerHTML = `
            ${overviewHtml}
            <h2 style="margin-top: 32px;">In This Chapter</h2>
            <p>This chapter covers the following topics. Click on any section to learn more.</p>
            <div class="subsection-list">
                ${chapter.subsections.map(sub => `
                    <div class="subsection-item" data-title="${sub.title}">
                        <span class="subsection-icon">${icons.link}</span>
                        <div class="subsection-details">
                            <h4>${sub.title}</h4>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Add click handlers
        sectionBody.querySelectorAll('.subsection-item').forEach(item => {
            item.addEventListener('click', () => {
                navigateToSection(item.dataset.title, true);
            });
        });
    } else {
        // Subsection view or chapter without subsections
        let contentHtml = '';

        // Try to find the content in wikiContent
        if (chapterContent && chapterContent.sections) {
            // Try exact match first
            let sectionHtml = chapterContent.sections[section.title];

            // If not found, try case-insensitive match or partial match
            if (!sectionHtml) {
                const sectionKeys = Object.keys(chapterContent.sections);
                for (const key of sectionKeys) {
                    if (key.toUpperCase() === section.title.toUpperCase() ||
                        key.toUpperCase().includes(section.title.toUpperCase()) ||
                        section.title.toUpperCase().includes(key.toUpperCase())) {
                        sectionHtml = chapterContent.sections[key];
                        break;
                    }
                }
            }

            if (sectionHtml) {
                contentHtml = sectionHtml;
            }
        }

        if (contentHtml) {
            // We have actual content from the PDF
            sectionBody.innerHTML = `
                <div class="section-content-body">
                    ${contentHtml}
                </div>
            `;
        } else {
            // Fallback to placeholder
            sectionBody.innerHTML = `
                <h2>${section.title}</h2>
                <p>
                    This section of the WATCHOUT User Guide covers <strong>${section.title}</strong>.
                    For detailed information, please refer to page ${section.page} of the official Dataton WATCHOUT documentation.
                </p>
                <h3>About This Section</h3>
                <p>
                    The content for this section is available in the PDF documentation starting at page ${section.page}.
                    This wiki provides quick navigation and search functionality to help you find the information you need.
                </p>
                <div class="info-card" style="margin-top: 24px; padding: 20px; background: rgba(107, 37, 221, 0.1); border-radius: 12px; border: 1px solid rgba(107, 37, 221, 0.3);">
                    <h4 style="margin-bottom: 8px; color: var(--accent-tertiary); display: flex; align-items: center; gap: 8px;">${icons.book} PDF Reference</h4>
                    <p style="margin: 0; color: var(--text-secondary);">
                        Open the Dataton WATCHOUT User Guide PDF and navigate to <strong>page ${section.page}</strong> for complete documentation of this topic.
                    </p>
                </div>
            `;
        }
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update navigation buttons
function updateNavButtons() {
    const prevBtn = document.getElementById('prev-section');
    const nextBtn = document.getElementById('next-section');

    // Get flat list of all navigable items
    const allSections = [];
    chaptersData.forEach(chapter => {
        allSections.push(chapter);
        chapter.subsections.forEach(sub => allSections.push(sub));
    });

    const currentIndex = allSections.findIndex(s => s.title === currentSection?.title);

    if (prevBtn) {
        prevBtn.disabled = currentIndex <= 0;
    }
    if (nextBtn) {
        nextBtn.disabled = currentIndex >= allSections.length - 1;
    }
}

// Navigate to previous/next section
function navigatePrevNext(direction) {
    const allSections = [];
    chaptersData.forEach(chapter => {
        allSections.push(chapter);
        chapter.subsections.forEach(sub => allSections.push(sub));
    });

    const currentIndex = allSections.findIndex(s => s.title === currentSection?.title);
    const newIndex = currentIndex + direction;

    if (newIndex >= 0 && newIndex < allSections.length) {
        const newSection = allSections[newIndex];
        const isSubsection = newSection.level === 2;
        navigateToSection(newSection.title, isSubsection);
    }
}

// Make showWelcome available globally
window.showWelcome = showWelcome;

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
