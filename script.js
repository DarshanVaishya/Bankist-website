"use strict";

///////////////////////////////////////
// Elements

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const cookieCloseBtn = document.querySelector(".btn--close-cookie");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const navLinksEl = document.querySelector(".nav__links");

// const tabBtns = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");

///////////////////////////////////////
// Modal window
function openModal() {
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
}

function closeModal() {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
}

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
	if (e.key === "Escape" && !modal.classList.contains("hidden")) {
		closeModal();
	}
});

///////////////////////////////////////
// Cookies
cookieCloseBtn.addEventListener("click", () => {
	const box = cookieCloseBtn.parentElement;
	box.classList.add("hidden");
	box.addEventListener("transitionend", box.remove);
});

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener("click", (e) => {
	e.preventDefault();
	const s1Coords = section1.getBoundingClientRect();

	// Old method
	window.scrollTo({
		left: window.pageXOffset + s1Coords.x,
		top: window.pageYOffset + s1Coords.y,
		behavior: "smooth",
	});

	// Modern way (not supported by older browsers)
	// section1.scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////////////
// Page navigation
navLinksEl.addEventListener("click", (e) => {
	e.preventDefault();
	const targetID = e.target.getAttribute("href");
	if (targetID === "#" || !e.target.classList.contains("nav__link")) return;
	document.querySelector(targetID).scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////////////
// Tabbed components
tabsContainer.addEventListener("click", (e) => {
	if (e.target === tabsContainer) return;

	const activeClass = "operations__tab--active";
	const clickedBtn = e.target.closest(".operations__tab");

	// Activate clicked tab
	document.querySelector("." + activeClass).classList.remove(activeClass);
	clickedBtn.classList.add(activeClass);

	// Activate content area
	document
		.querySelector(`.operations__content--active`)
		.classList.remove("operations__content--active");
	document
		.querySelector(`.operations__content--${clickedBtn.dataset.tab}`)
		.classList.add("operations__content--active");
});
