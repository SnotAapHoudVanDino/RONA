// Firebase configuratie
const firebaseConfig = {
    apiKey: "AIzaSyAmBFtPf11eu4tohfj17CMkG8FbsVl93O8",
    authDomain: "mijnroodborststje.firebaseapp.com",
    projectId: "mijnroodborststje",
    storageBucket: "mijnroodborststje.firebasestorage.app",
    messagingSenderId: "99812857188",
    appId: "1:99812857188:web:f7b3dd2662dd70bca59671",
    measurementId: "G-V1HHCF8Y93"
};

// Firebase initialisatie
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

// Code checken
function checkCode() {
    const code = document.getElementById("codeInput").value;
    if (code === "28/08/2024") {
        alert("Ik hou van jou, Robin ❤️");
        document.getElementById("login").classList.add("hidden");
        document.getElementById("mainContent").classList.remove("hidden");
        loadDiary();
        loadMedia();
    } else {
        alert("Foute code! Probeer opnieuw.");
    }
}

// Dagboek opslaan
function saveDiary() {
    const text = document.getElementById("diaryText").value;
    if (text) {
        db.collection("diary").add({
            text: text,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById("diaryText").value = ""; // Maak het tekstveld leeg
    }
}

// Media (foto/video) uploaden
function uploadFile() {
    const file = document.getElementById("fileUpload").files[0];
    if (file) {
        const storageRef = storage.ref("uploads/" + file.name);
        storageRef.put(file).then(snapshot => {
            snapshot.ref.getDownloadURL().then(url => {
                db.collection("media").add({
                    url: url,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
            });
        });
    }
}

// Dagboek laden
function loadDiary() {
    db.collection("diary").orderBy("timestamp", "desc").onSnapshot(snapshot => {
        document.getElementById("savedDiary").innerHTML = "";
        snapshot.forEach(doc => {
            document.getElementById("savedDiary").innerHTML += `<p>${doc.data().text}</p>`;
        });
    });
}

// Media laden
function loadMedia() {
    db.collection("media").orderBy("timestamp", "desc").onSnapshot(snapshot => {
        document.getElementById("mediaContent").innerHTML = "";
        snapshot.forEach(doc => {
            document.getElementById("mediaContent").innerHTML += `<img src="${doc.data().url}" width="200">`;
        });
    });
}

// Functies voor het weergeven van secties
function showDiary() {
    document.getElementById("diarySection").classList.toggle("hidden");
}

function showMedia() {
    document.getElementById("mediaSection").classList.toggle("hidden");
}

function showCategory(category) {
    // Hier kun je logica toevoegen om bepaalde categorieën van media te tonen
    console.log(`Categorie gekozen: ${category}`);
}
