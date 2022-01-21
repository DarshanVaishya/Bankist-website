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
const tabsContainer = document.querySelector(".operations__tab-container");
const navEl = document.querySelector(".nav");
const navHeight = navEl.getBoundingClientRect().height;
const headerEl = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
const lazyImages = document.querySelectorAll(".lazy-img");

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

///////////////////////////////////////
// Menu fade animation
function handleHover(e) {
	if (!e.target.classList.contains("nav__link")) return;

	const link = e.target;
	const siblings = link.closest(".nav").querySelectorAll(".nav__link");
	const logo = link.closest(".nav").querySelector("img");

	siblings.forEach((sibling) => {
		if (link !== sibling) sibling.style.opacity = this;
	});
	logo.style.opacity = this;
}

navEl.addEventListener("mouseover", handleHover.bind(0.5));
navEl.addEventListener("mouseout", handleHover.bind(1));

///////////////////////////////////////
// Sticky nav bar
function stickyNav(entries, observer) {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) navEl.classList.add("sticky");
		else navEl.classList.remove("sticky");
	});
}

const observer = new IntersectionObserver(stickyNav, {
	root: null,
	threshold: 0,
	rootMargin: `-${navHeight}px`,
});
observer.observe(headerEl);

///////////////////////////////////////
// Sticky nav bar
function revealSection(entries, observer) {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) return;

		entry.target.classList.remove("section--hidden");
		observer.unobserve(entry.target);
	});
}

const sectionObserver = new IntersectionObserver(revealSection, {
	root: null,
	threshold: 0.15,
});

allSections.forEach((section) => {
	section.classList.add("section--hidden");
	sectionObserver.observe(section);
});

///////////////////////////////////////
// lazy loading images

function revealImage(entries, observer) {
	console.log(entries);
	entries.forEach((entry) => {
		if (!entry.isIntersecting) return;

		const img = entry.target;
		img.src = img.dataset.src;
		img.addEventListener("load", () => img.classList.remove("lazy-img"));
		observer.unobserve(img);
	});
}

const imgObserver = new IntersectionObserver(revealImage, {
	root: null,
	threshold: 0,
	rootMargin: "200px",
});
lazyImages.forEach((img) => imgObserver.observe(img));
