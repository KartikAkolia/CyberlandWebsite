document.addEventListener("DOMContentLoaded", function () {
    // Menu Toggle Functionality
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });

    // Dynamic Image Resizing Based on Resolution & Viewport Space
    const images = document.querySelectorAll(".corner-image");

    images.forEach(img => {
        // Ensure the image is fully loaded before checking its size
        img.onload = function () {
            const naturalWidth = img.naturalWidth;
            const naturalHeight = img.naturalHeight;

            // Get viewport dimensions
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Set max image dimensions (not exceeding natural size or viewport space)
            let maxImageWidth = Math.min(naturalWidth, viewportWidth * 0.18); // Max 18% of viewport width
            let maxImageHeight = Math.min(naturalHeight, viewportHeight * 0.18); // Max 18% of viewport height

            // Apply new dimensions
            img.style.width = `${maxImageWidth}px`;
            img.style.height = "auto"; // Maintain aspect ratio
        };

        // If the image is already loaded (cached), trigger onload manually
        if (img.complete) {
            img.onload();
        }
    });

    // Resize images dynamically when the window resizes
    window.addEventListener("resize", function () {
        images.forEach(img => {
            if (img.complete) {
                img.onload();
            }
        });
    });
});
