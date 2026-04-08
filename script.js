
const themeBtn = document.getElementById("themeBtn");
const toggleBtn = document.getElementById("toggleBtn");
const projects = document.getElementById("projects");
const themeStyle = document.getElementById("theme-style");

let isGreen = true;

themeBtn.addEventListener("click", () => {
    if (isGreen) {
        themeStyle.href = "red.css";
        isGreen = false;
    } else {
        themeStyle.href = "green.css";
        isGreen = true;
    }
});

toggleBtn.addEventListener("click", () => {
    if (projects.style.display === "none" || projects.style.display === "") {
        projects.style.display = "block";
        toggleBtn.textContent = "Ukryj projekty";
    } else {
        projects.style.display = "none";
        toggleBtn.textContent = "Pokaż projekty";
    }
});


const form = document.getElementById("contactForm");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const message = document.getElementById("message");

const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let isValid = true;

    firstNameError.textContent = "";
    lastNameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    if (firstName.value.trim() === "" || /\d/.test(firstName.value)) {
        firstNameError.textContent = "Niepoprawne imię";
        isValid = false;
    }

    if (lastName.value.trim() === "" || /\d/.test(lastName.value)) {
        lastNameError.textContent = "Niepoprawne nazwisko";
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        emailError.textContent = "Niepoprawny email";
        isValid = false;
    }

    if (message.value.trim() === "") {
        messageError.textContent = "Wiadomość jest wymagana";
        isValid = false;
    }

    if (isValid) {
        alert("Formularz wysłany poprawnie!");
        form.reset();
    }
});
