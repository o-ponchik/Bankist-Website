"use strict";

//------------------Selections----------------------------
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const allSections = document.querySelectorAll(".section");
const header = document.querySelector(".header");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");
const imgTargets = document.querySelectorAll("img[data-src]");

///////////////////-----Page navigation------/////////////////////////
//Event delegation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  //Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

///////////////////////-----Scrolling to first section-----////////////////////////////////////
// Smooth scrolling to the section

btnScrollTo.addEventListener("click", function (e) {
  //Scrolling
  section1.scrollIntoView({ behavior: "smooth" });
});

/////////////////////////-----Cookies message-------/////////////////////////
// Creating and inserting cookies message
const message = document.createElement("div");

message.classList.add("cookie-message");
message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;
header.after(message);

// Delete cookies message
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });

// Style cookies message
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

////////////////////----------Modal window--------/////////////////////////
// Modal window - open and close function //////////////////////////////////////////////////////////
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// Close Modal window by key 'Escape'
document.addEventListener("keydown", function (e) {
  if (e.key === `Escape` && !modal.classList.contains(`hidden`)) {
    closeModal();
  }
});

////////////////////////-------Tabbed Component--------/////////////////////////////////
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  //Guard clause (if clicked is null => finish the function immediately)
  if (!clicked) return;

  //first: remove active classes for all btns and contents
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));
  //second: add active classes for clicked btn and related content(below)
  clicked.classList.add("operations__tab--active");

  // Activate content area
  // each btns has an attribute data-tab="from 1 to 3"
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

///////////////////////////-------Menu fade animation----//////////////////////////////////////
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing an "argument" into   handler
nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));

////////////////////////----Sticky navigation---//////////////////////
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

////////////////////////----Reveal sections---//////////////////////

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

////////////////////////----Lazy loading images---//////////////////////
const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  // remuve blure-effect after loading img
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "100px",
});
imgTargets.forEach((img) => imgObserver.observe(img));

////////////////////////----Slider---//////////////////////
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide='${i}'></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  //Prev slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    e.key === "ArrowRight" && nextSlide();
    e.key === "ArrowLeft" && prevSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();
