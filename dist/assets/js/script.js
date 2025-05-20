document.addEventListener("DOMContentLoaded", () => {
  const navbarScroll = document.getElementById("navbar-scroll");
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  // Scroll hide/show logic
  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop && currentScroll > 100) {
      navbarScroll.classList.add("opacity-0", "-translate-y-full");
      navbarScroll.classList.remove("opacity-100", "translate-y-0");
    } else {
      navbarScroll.classList.remove("opacity-0", "-translate-y-full");
      navbarScroll.classList.add("opacity-100", "translate-y-0");
    }
    lastScrollTop = Math.max(currentScroll, 0);
  });

  // Hamburger toggle
  mobileMenuButton?.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.toggle("hidden");
    mobileMenuButton.setAttribute("aria-expanded", !isHidden);
  });

  // Close menu on link click
  document.querySelectorAll("#mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenuButton.setAttribute("aria-expanded", "false");
    });
  });

  // Testimonial Carousel
  const testimonials = document.querySelectorAll(
    "#testimonial-carousel .testimonial"
  );
  const dots = document.querySelectorAll("#testimonial-dots .dot");
  let current = 0;

  function showTestimonial(idx) {
    testimonials.forEach((el, i) => {
      el.classList.toggle("active", i === idx);
      dots[i].classList.toggle("active", i === idx);
    });
    current = idx;
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => showTestimonial(idx));
  });

  if (testimonials.length > 0) {
    setInterval(
      () => showTestimonial((current + 1) % testimonials.length),
      7000
    );
    showTestimonial(0);
  }

  // Update copyright year
  const yearElem = document.getElementById("current-year");
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }

  // Slideshow
  const slideshow = document.querySelector(".slideshow");
  if (slideshow) {
    const images = slideshow.children;
    let currentImage = 0;

    function showNextImage() {
      images[currentImage].style.opacity = 0;
      images[currentImage].style.transform = "scale(1)";
      currentImage = (currentImage + 1) % images.length;
      images[currentImage].style.opacity = 1;
      images[currentImage].style.transform = "scale(1)";
      setTimeout(() => {
        images[currentImage].style.transform = "scale(1.1)";
      }, 100);
    }

    setInterval(showNextImage, 5000);
    images[0].classList.add("active");
    images[0].style.opacity = 1;
    images[0].style.transform = "scale(1.1)";
  }

  const elements = document.querySelectorAll(".fade-up");

  const onScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    elements.forEach((el) => {
      const boxTop = el.getBoundingClientRect().top;

      if (boxTop < triggerBottom) {
        el.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", onScroll);
  onScroll(); // Trigger once on load
  // Animation on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (elementTop < windowHeight - 100) {
        element.classList.add("animate-fade-in");
      }
    });
  };

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Trigger once on load
});
