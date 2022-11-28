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

/////////////////////////////////////////////////////////////////
