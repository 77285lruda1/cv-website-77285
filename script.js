// елементи
const themeBtn = document.getElementById("themeBtn");
const toggleBtn = document.getElementById("toggleBtn");
const projects = document.getElementById("projects");
const themeStyle = document.getElementById("theme-style");

// змінна для теми
let isGreen = true;

// зміна теми
themeBtn.addEventListener("click", () => {
    if (isGreen) {
        themeStyle.href = "red.css";
        isGreen = false;
    } else {
        themeStyle.href = "green.css";
        isGreen = true;
    }
});

// показати / сховати секцію
toggleBtn.addEventListener("click", () => {
    if (projects.style.display === "none") {
        projects.style.display = "block";
    } else {
        projects.style.display = "none";
    }
});
