// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtvlYlyA59204NCQvlrjduHHZKT1bCYV0",
  authDomain: "project8-d164e.firebaseapp.com",
  projectId: "project8-d164e",
  storageBucket: "project8-d164e.firebasestorage.app",
  messagingSenderId: "787165819287",
  appId: "1:787165819287:web:7cc5b871e0961826b514d2",
  measurementId: "G-C77TSNL40Q"
};

// Firebase init
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


// Przyciski i elementy DOM
const themeBtn = document.getElementById("themeBtn");
const toggleBtn = document.getElementById("toggleBtn");
const projects = document.getElementById("projects");
const themeStyle = document.getElementById("theme-style");

let isGreen = true;

projects.style.display = "none";

// Zmiana motywu
themeBtn.addEventListener("click", () => {
    if (isGreen) {
        themeStyle.href = "red.css";
        isGreen = false;
    } else {
        themeStyle.href = "green.css";
        isGreen = true;
    }
});

// Pokazywanie / ukrywanie projektów
toggleBtn.addEventListener("click", () => {
    if (projects.style.display === "none" || projects.style.display === "") {
        projects.style.display = "block";
        toggleBtn.textContent = "Ukryj projekty";
    } else {
        projects.style.display = "none";
        toggleBtn.textContent = "Pokaż projekty";
    }
});

// Formularz kontaktowy
const form = document.getElementById("contactForm");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const message = document.getElementById("message");

// Elementy błędów
const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

// Walidacja formularza
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

        db.collection("contacts").add({
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            message: message.value,
            time: new Date()
        })
        .then(() => {
            alert("Dane zapisane w Firebase ✔");
            form.reset();
        })
        .catch((error) => {
            alert("Błąd zapisu ❌");
            console.error(error);
        });
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

        // umiejętności
        const skillsList = document.getElementById("skills-list");
        data.skills.forEach(skill => {
            const li = document.createElement("li");
            li.textContent = skill;
            skillsList.appendChild(li);
        });

        // projekty
        const projectsList = document.getElementById("projects-list");
        data.projects.forEach(project => {
            const li = document.createElement("li");
            li.textContent = project;
            projectsList.appendChild(li);
        });

        // języki
        const languagesList = document.getElementById("languages-list");
        data.languages.forEach(language => {
            const li = document.createElement ("li");
            li.textContent = language;
            languagesList.appendChild(li);
        });

        // zainteresowania
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


// Local Storage
const projectInput = document.getElementById("projectInput");
const addProjectBtn = document.getElementById("addProjectBtn");
const savedProjects = document.getElementById("savedProjects");


let savedProjectsArray = [];

// wczytanie danych z localStorage
try {
    const data = JSON.parse(localStorage.getItem("projects"));
    if (Array.isArray(data)) {
        savedProjectsArray = data;
    }
} catch (e) {
    savedProjectsArray = [];
}
// zapis
function saveToStorage() {
    localStorage.setItem("projects", JSON.stringify(savedProjectsArray));
}

// render listy
function renderProjects() {
    savedProjects.innerHTML = "";

    savedProjectsArray.forEach((project, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${project}
            <button onclick="deleteProject(${index})">X</button>
        `;

        savedProjects.appendChild(li);
    });
}

// dodanie projektu
addProjectBtn.addEventListener("click", () => {
    const value = projectInput.value.trim();

    if (value === "") {
        showMessage("❌ Pole jest puste", "error");
        return;
    }

    savedProjectsArray.push(value);
    saveToStorage();
    renderProjects();

    projectInput.value = "";

    showMessage("✅ Projekt dodany!", "success");
});


// usuwanie projektu
function deleteProject(index) {
    savedProjectsArray.splice(index, 1);
    saveToStorage();
    renderProjects();

    showMessage("Projekt usunięty ❌", "error");
}


// start aplikacji
renderProjects();

const messageBox = document.getElementById("messageBox");


function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = type;

    setTimeout(() => {
        messageBox.textContent = "";
    }, 2000);
}
