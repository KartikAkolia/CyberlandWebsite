/*
 * script.js
 * Provides interactive functionality for the Cyberland Theme Park website.
 *
 * References:
 * - JavaScript basics and event handling: https://www.w3schools.com/js/default.asp
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize mobile menu toggle and dynamic image resizing on page load.
  initMobileMenu();
  initDynamicImageResize();
});

/**
 * Initializes the mobile menu functionality.
 * Toggles the 'active' class on the navigation menu when the hamburger icon is clicked.
 */
function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      // Toggle the 'active' class to show or hide the menu on mobile.
      navLinks.classList.toggle("active");
    });
  }
}

/**
 * Initializes dynamic resizing for images with the 'corner-image' class.
 * Uses a debounce technique to limit execution during window resize events.
 *
 * Reference for debounce and image properties: https://www.w3schools.com/js/default.asp
 */
function initDynamicImageResize() {
  const images = document.querySelectorAll(".corner-image");

  // Function to resize a single image based on its natural size and current viewport.
  const resizeImage = (img) => {
    if (!img.complete) return;
    const naturalWidth = img.naturalWidth;
    const viewportWidth = window.innerWidth;
    const maxImageWidth = Math.min(naturalWidth, viewportWidth * 0.18); // Limit to 18% of viewport width.
    img.style.width = `${maxImageWidth}px`;
    img.style.height = "auto"; // Maintain original aspect ratio.
  };

  // Apply resizing when each image loads; handle cached images as well.
  images.forEach((img) => {
    img.onload = () => resizeImage(img);
    if (img.complete) {
      resizeImage(img);
    }
  });

  // Debounce the resize event to avoid excessive function calls.
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      images.forEach((img) => resizeImage(img));
    }, 100);
  });
}
