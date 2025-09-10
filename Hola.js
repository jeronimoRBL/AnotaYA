const notesContainer = document.getElementById("notes");
const addBtn = document.getElementById("addNote");

// Guardar notas y favoritas
function saveNotes() {
  const notes = [];
  const favorites = [];

  document.querySelectorAll(".note").forEach(note => {
    const content = note.querySelector("textarea").value;
    const isFavorite = note.querySelector(".star").classList.contains("favorite");

    notes.push({ content, favorite: isFavorite });

    if (isFavorite) {
      favorites.push({ content });
    }
  });

  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("favorites", JSON.stringify(favorites)); // 👈 nuevas
}

function createNote(content = "", favorite = false) {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
    <span class="star ${favorite ? "favorite" : ""}">★</span>
    <span class="delete">✖</span>
    <textarea>${content}</textarea>
  `;

  const star = note.querySelector(".star");
  const textarea = note.querySelector("textarea");

  // Marcar favorito
  star.addEventListener("click", () => {
    star.classList.toggle("favorite");
    saveNotes();
  });

  // Borrar nota
  note.querySelector(".delete").addEventListener("click", () => {
    note.remove();
    saveNotes();
  });

  // Guardar al escribir
  textarea.addEventListener("input", saveNotes);

  notesContainer.appendChild(note);
}

// Botón para añadir
addBtn.addEventListener("click", () => {
  createNote();
  saveNotes();
});

// Cargar notas
function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  savedNotes.forEach(note => createNote(note.content, note.favorite));
}

loadNotes();
