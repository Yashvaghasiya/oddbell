// Simple Scroll Animation using Intersection Observer

document.addEventListener('DOMContentLoaded', () => {

    // Select elements to animate
    const animatedElements = document.querySelectorAll('.odd-item, .content-group, .culture-card');

    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });

    // Specific class for the active state
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

// Video Loop Logic
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.hero-video');

    if (videos.length === 0) return;

    // 1. Force mute all videos (crucial for autoplay policies)
    videos.forEach(v => {
        v.muted = true;
        // Reset z-indexes
        v.style.zIndex = '0';
    });

    let activeIndex = 0;

    const playVideoAtIndex = (index) => {
        const video = videos[index];
        const previousVideo = videos[activeIndex];
        const nextIndex = (index + 1) % videos.length;
        const nextVideo = videos[nextIndex];

        // Preload the NEXT video now that we are about to play the CURRENT one
        if (nextVideo.preload !== 'auto') {
            nextVideo.preload = 'auto';
            // Some browsers might need an explicit load() if simple attribute change isn't enough
            // but normally attribute change on a non-started video triggers resource fetch.
        }

        // Set next video to higher z-index so it appears on top when it fades in
        video.style.zIndex = '2';

        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Video is playing, make it visible
                video.classList.add('active');

                // If there was a distinct previous video, hide it after transition
                if (previousVideo && previousVideo !== video) {
                    setTimeout(() => {
                        previousVideo.classList.remove('active');
                        previousVideo.pause();
                        previousVideo.currentTime = 0;
                        previousVideo.style.zIndex = '0';

                        // OPTIONAL: Release memory? 
                        // resetting src to "" might break re-looping without reloading src.
                        // For resizing (looping), we keep it as is, but pausing helps.
                    }, 500); // 500ms matches updated CSS transition
                }

                activeIndex = index;
            }).catch(error => {
                console.error("Autoplay prevented or error:", error);
                // If fail, try next immediately?
                const nextIdx = (index + 1) % videos.length;
                if (nextIdx !== index) playVideoAtIndex(nextIdx);
            });
        }
    };

    // Initial Play
    playVideoAtIndex(0);

    // Chain events
    videos.forEach((video, index) => {
        video.addEventListener('ended', () => {
            const nextIndex = (index + 1) % videos.length;
            playVideoAtIndex(nextIndex);
        });
    });
});

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
});
