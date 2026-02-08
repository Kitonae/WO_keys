// WATCHOUT Wiki/User Guide - Application Logic (Static Version)

// Theme initialization - apply saved theme before page renders
(function initTheme() {
    const savedTheme = localStorage.getItem('watchout-wiki-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

document.addEventListener('DOMContentLoaded', () => {
    setupSidebar();
    setupThemeToggle();
    setupMobileMenu();
    setupHeroVideo();
    setupSidebarToggle();
    setupSidebarAccordion();
    setupVideoModals();
    renderTocPreview();
});

// Video Modal Functionality
function setupVideoModals() {
    // Create modal container if it doesn't exist
    if (!document.getElementById('video-modal')) {
        const modal = document.createElement('div');
        modal.id = 'video-modal';
        modal.className = 'video-modal';
        modal.innerHTML = `
            <button class="video-modal-close" aria-label="Close">&times;</button>
            <video id="video-modal-player" class="video-modal-content" controls></video>
        `;
        document.body.appendChild(modal);

        // Close modal on background click or close button
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('video-modal-close')) {
                closeVideoModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeVideoModal();
            }
        });
    }

    // Attach click handlers to all video thumbnails
    const videos = document.querySelectorAll('.content-video');
    videos.forEach(video => {
        video.addEventListener('click', (e) => {
            e.preventDefault();
            // Use getAttribute to get the actual src attribute, not the resolved URL
            openVideoModal(video.getAttribute('src'));
        });
    });
}

function openVideoModal(videoSrc) {
    const modal = document.getElementById('video-modal');
    const player = document.getElementById('video-modal-player');
    if (modal && player) {
        player.src = videoSrc;
        modal.classList.add('active');
        player.play();
    }
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const player = document.getElementById('video-modal-player');
    if (modal && player) {
        modal.classList.remove('active');
        player.pause();
        player.src = '';
    }
}

function setupSidebarAccordion() {
    // This logic needs to run on both index.html (dynamic) and sub-pages (static html)
    // For index.html, it runs after innerHTML is set.
    // For sub-pages, the HTML is already there.

    // If we're on index.html, we attach listeners AFTER setupSidebar populates it.
    // But setupSidebar is only for index.html.
    // So let's make sure we attach event listeners to all .toc-chapter-header elements.

    const headers = document.querySelectorAll('.toc-chapter-header');
    headers.forEach(header => {
        header.addEventListener('click', (e) => {
            const chapterDiv = header.parentElement;
            const isExpanded = chapterDiv.classList.contains('expanded');

            // Logic:
            // 1. If user clicks a chapter header that is already expanded:
            //    - It should COLLAPSE.
            //    - It should PREVENT navigation (reloading the page).
            // 2. If user clicks a chapter header that is NOT expanded:
            //    - It should NAVIGATE to the chapter page.

            // Check if the clicked header's link is the current page
            const headerLink = header.getAttribute('href');
            const currentPath = window.location.pathname;
            // Normalize paths for comparison (e.g., remove trailing slashes, handle index.html)
            const normalizedHeaderLink = headerLink.endsWith('/index.html') ? headerLink.replace('/index.html', '/') : headerLink;
            const normalizedCurrentPath = currentPath.endsWith('/index.html') ? currentPath.replace('/index.html', '/') : currentPath;

            if (normalizedHeaderLink === normalizedCurrentPath ||
                (normalizedHeaderLink === '/' && normalizedCurrentPath === '/index.html') ||
                (normalizedHeaderLink === '/index.html' && normalizedCurrentPath === '/')) {
                // We are on this page.
                // So "clicking again" means we are clicking the active chapter.
                e.preventDefault();
                chapterDiv.classList.toggle('expanded');
                header.classList.toggle('expanded');
                return;
            }

            // Logic for closing when already expanded (but not current page context)
            if (isExpanded) {
                e.preventDefault();
                chapterDiv.classList.remove('expanded');
                header.classList.remove('expanded');
            }
            // Else: let default link behavior happen (navigation)
        });
    });
}

function renderTocPreview() {
    const tocPreviewGrid = document.getElementById('toc-preview-grid');
    if (!tocPreviewGrid || typeof chaptersData === 'undefined') return;

    // Helper to slugify
    const slugify = (text) => text.toLowerCase()
        .replace(/^\d+\.\s+/, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');

    tocPreviewGrid.innerHTML = chaptersData.map(chapter => `
        <a href="${slugify(chapter.title)}/index.html" class="toc-card ${chapter.disabled ? 'disabled' : ''}" style="text-decoration: none; color: inherit; display: block;">
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
        </a>
    `).join('');
}

function setupSidebar() {
    const tocNav = document.getElementById('toc-nav');

    // Only populate if empty (index.html) AND data is available
    if (!tocNav || tocNav.children.length > 0 || typeof chaptersData === 'undefined') return;

    // Helper to slugify (must match the generator's slugify)
    const slugify = (text) => text.toLowerCase()
        .replace(/^\d+\.\s+/, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');

    tocNav.innerHTML = chaptersData.map(chapter => {
        const chapterSlug = slugify(chapter.title);

        return `
        <div class="toc-chapter ${chapter.disabled ? 'disabled' : ''}">
            <a href="${chapterSlug}/index.html" class="toc-chapter-header" style="text-decoration: none; color: inherit; display: flex;">
                <span class="toc-chapter-icon">${getIcon(chapter.icon)}</span>
                <span class="toc-chapter-title">${chapter.title}</span>
                 ${chapter.subsections.length > 0 ? `
                    <svg class="toc-chapter-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                ` : ''}
            </a>
            ${chapter.subsections.length > 0 ? `
                <div class="toc-subsections">
                    ${chapter.subsections.map(sub => `
                        <a class="toc-subsection" href="${chapterSlug}/${slugify(sub.title)}.html">
                            ${sub.title}
                        </a>
                    `).join('')}
                </div>
            ` : ''}
        </div>
        `;
    }).join('');

    // Re-attach listeners now that we've added to DOM
    setupSidebarAccordion();
}

function setupThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
        const themes = ['dark', 'light', 'midnight', 'rust'];
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        const newTheme = themes[nextIndex];

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('watchout-wiki-theme', newTheme);
    });
}

function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (btn && sidebar && overlay) {
        btn.addEventListener('click', () => {
            sidebar.classList.add('open');
            overlay.classList.add('active');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
    }
}

function setupSidebarToggle() {
    const toggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (toggle && sidebar) {
        toggle.addEventListener('click', () => {
            // Toggle collapsed state
            sidebar.classList.toggle('collapsed');
            // Also handle mobile close
            if (sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                if (overlay) overlay.classList.remove('active');
            }
        });
    }
}

function setupHeroVideo() {
    const heroMedia = document.getElementById('hero-media');
    if (!heroMedia) return;

    const videos = [
        'media/Live_Show_Programmer_Creates_Scene.mp4',
        'media/Looping_Video_Generation_Complete.mp4',
        'media/Video_Generation_With_Asian_Male_Operator.mp4'
    ];
    // Simple check if media files exist? No, just try to play.
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];

    heroMedia.innerHTML = `
        <div class="video-wrapper" style="position: relative;">
            <video autoplay muted loop playsinline>
                <source src="${randomVideo}" type="video/mp4">
            </video>
            <div class="hero-overlay">
                <img src="media/product_mark_org.png" alt="WATCHOUT Logo" class="hero-logo">
            </div>
        </div>
    `;
}
