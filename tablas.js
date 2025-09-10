function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const table = document.getElementById("favoritesTable");

  table.innerHTML = ""; // limpiar antes de recargar

  favorites.forEach(fav => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${fav.content.substring(0, 20)}...</td>
      <td><span class="status status-important">Favorito</span></td>
    `;
    table.appendChild(row);
  });
}

// Cargar favoritos al abrir
loadFavorites();
