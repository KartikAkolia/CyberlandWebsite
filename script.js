document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initDynamicImageResize();
});

/**
 * Toggles the mobile nav when the hamburger is clicked.
 */
function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
}

/**
 * Dynamically resizes any elements with the 'corner-image' class.
 */
function initDynamicImageResize() {
  const images = document.querySelectorAll(".corner-image");

  const resizeImage = (img) => {
    if (!img.complete) return;
    const naturalWidth = img.naturalWidth;
    const viewportWidth = window.innerWidth;
    const maxImageWidth = Math.min(naturalWidth, viewportWidth * 0.18); // 18% of viewport width
    img.style.width = `${maxImageWidth}px`;
    img.style.height = "auto"; // maintain aspect ratio
  };

  images.forEach((img) => {
    // Resize on load
    img.onload = () => resizeImage(img);
    // If already loaded (cached), resize immediately
    if (img.complete) {
      resizeImage(img);
    }
  });

  // Debounce window resize events
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      images.forEach((img) => resizeImage(img));
    }, 100);
  });
}
