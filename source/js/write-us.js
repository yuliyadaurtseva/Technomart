var writeOpen = document.querySelector(".btn-contacts");
var writePopup = document.querySelector(".modal-write-us");
var writeClose = writePopup.querySelector(".modal-close-write");
var myName = document.querySelector("[name=login]");
var overlay = document.querySelector(".overlay");

writeOpen.addEventListener("click", function(evt) {
    evt.preventDefault(); 
    writePopup.classList.add("modal-show");
    myName.focus();
    overlay.classList.add("overlay-show");
})

writeClose.addEventListener("click", function(evt) {
    evt.preventDefault();
    writePopup.classList.remove("modal-show");
    overlay.classList.remove("overlay-show");
})

overlay.addEventListener("click", function(evt) {
    evt.preventDefault();
    writePopup.classList.remove("modal-show");
    overlay.classList.remove("overlay-show");
})