// Background video: respect reduced motion and allow visitors to pause it.
const video = document.getElementById('bg-video');
const videoToggle = document.getElementById('video-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function syncVideoButton() {
    videoToggle.textContent = video.paused ? 'Play background' : 'Pause background';
}

function respectMotionPreference() {
    if (reducedMotion.matches) {
        video.removeAttribute('autoplay');
        video.pause();
    }
}

respectMotionPreference();
reducedMotion.addEventListener('change', respectMotionPreference);
video.addEventListener('play', syncVideoButton);
video.addEventListener('pause', syncVideoButton);
videoToggle.addEventListener('click', () => {
    if (video.paused) {
        video.play().catch(syncVideoButton);
    } else {
        video.pause();
    }
});
syncVideoButton();

// Keep the copyright year current.
document.getElementById('year').textContent = new Date().getFullYear();

// Highlight the navigation link for the section currently in view.
if ('IntersectionObserver' in window) {
    const links = document.querySelectorAll('.nav-links a');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            links.forEach(link => {
                if (link.hash === '#' + entry.target.id) {
                    link.setAttribute('aria-current', 'location');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        });
    }, { rootMargin: '-15% 0px -55% 0px' });
    document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
}
