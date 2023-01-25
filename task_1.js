const btn = document.querySelector(".btn");
const arrowIcon = document.querySelector(".arrow");
const arrowFilledIcon = document.querySelector(".arrow-filled");

btn.addEventListener("click", () => {
    btn.classList.toggle(".btn-clicked");
    if (btn.classList.contains(".btn-clicked")) {
        arrowIcon.style.display = "none";
        arrowFilledIcon.style.display = "block";
    } else {
        arrowFilledIcon.style.display = "none";
        arrowIcon.style.display = "block";
    }
})