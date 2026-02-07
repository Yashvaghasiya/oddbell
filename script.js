// Simple Scroll Animation using Intersection Observer

// Global Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
    // 1. Select all major elements to animate
    const animateTargets = document.querySelectorAll(
        '.section-title, ' +
        '.hero-video, ' +
        '.odd-item, ' +
        '.odd-image, ' + // Scale effect candidate
        '.consultation-text-overlay, ' +
        '.culture-card, ' +
        '.contact-text-overlay'
    );

    // 2. Add base classes
    animateTargets.forEach(el => {
        el.classList.add('reveal-on-scroll');

        // Add specific scale effect to images for extra pop
        if (el.classList.contains('odd-image') || el.classList.contains('hero-video')) {
            el.classList.add('reveal-scale');
        }
    });

    // 3. Observer Setup
    const observerOptions = {
        threshold: 0.15, // Trigger slightly earlier
        rootMargin: '0px 0px -50px 0px' // Offset to ensure it's in view
    };

    const displayOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Play once
            }
        });
    }, observerOptions);

    animateTargets.forEach(el => {
        displayOnScroll.observe(el);
    });
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
