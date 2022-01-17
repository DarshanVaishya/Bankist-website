"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const cookieCloseBtn = document.querySelector(".btn--close-cookie");

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

cookieCloseBtn.addEventListener("click", () => {
	const box = cookieCloseBtn.parentElement;
	box.classList.add("hidden");
	box.addEventListener("transitionend", box.remove);
});
