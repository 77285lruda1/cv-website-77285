const themeBtn = document.getElementById("themeBtn");
const toggleBtn = document.getElementById("toggleBtn");
const projects = document.getElementById("projects");
const themeStyle = document.getElementById("theme-style");

let isGreen = true;

projects.style.display = "none";

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


// JSON + FETCH
fetch("data.json")
.then(response => {
    if (!response.ok) {
        throw new Error("Błąd HTTP: " + response.status);
    }
    return response.json();
})

    .then(data => {

        const skillsList = document.getElementById("skills-list");
        data.skills.forEach(skill => {
            const li = document.createElement("li");
            li.textContent = skill;
            skillsList.appendChild(li);
        });

        const projectsList = document.getElementById("projects-list");
        data.projects.forEach(project => {
            const li = document.createElement("li");
            li.textContent = project;
            projectsList.appendChild(li);
        });

        const languagesList = document.getElementById("languages-list");
        data.languages.forEach(language => {
            const li = document.createElement ("li");
            li.textContent = language;
            languagesList.appendChild(li);
        });

        const interestsList = document.getElementById("interests-list");
        data.interests.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            interestsList.appendChild(li);
        });

    })
    .catch(error => {
        console.error("Błąd ładowania JSON:", error);
    });

    
