// Parallaxe with Rellax.js

document.addEventListener("DOMContentLoaded", function () {
  const rellax = new Rellax(".parallax-shapes .shape", {
    center: true,
  });
});

document.addEventListener("DOMContentLoaded", function () {
    let page = 1; 
    const resultatsParPage = 12; 
  
    // Fonction pour afficher les résultats de recherche
    function afficherResultats(resultats) {
      const resultatsDiv = document.getElementById("resultats");
      resultatsDiv.innerHTML = "";
  
      resultats.Search.forEach(function (film) {
        const div = document.createElement("div");
        div.className = "col-md-4 mb-4";
  
        div.innerHTML = `
          <div class="card">
            <img src="${film.Poster !== "N/A" ? film.Poster : "https://placehold.co/200x300"}" class="card-img-top" alt="${film.Title}" style="max-width:200px; min-height:300px;">
            <div class="card-body">
              <h5 class="card-title">${film.Title}</h5>
              <p class="card-text">Année : ${film.Year}</p>
            </div>
          </div>
        `;
  
        resultatsDiv.appendChild(div);
      });
    }
  
    // Fonction pour gérer la soumission du formulaire de recherche
    prevPage.style.display="none"
    nextPage.style.display="none"
    function rechercherFilms(e) {
      e.preventDefault();
  
      const titre = document.getElementById("titre").value;
      const annee = document.getElementById("annee").value;
      const type = document.getElementById("type").value;
  
      const url = `https://www.omdbapi.com/?s=${titre}&y=${annee}&type=${type}&page=${page}&apikey=ddfd035b`;
      
      fetch(url)
        .then(function (response) {
          return response.json();
          
        })
        .then(function (data) {
          if (data.Response === "True") {
            afficherResultats(data);
            afficherPagination(data.totalResults);
            prevPage.style.display="block"
            nextPage.style.display="block"
          } else {
            const messageElement = document.getElementById("message");
            messageElement.style.display = "block";
            messageElement.innerText = "Aucun résultat trouvé.";
            setTimeout(function () {
              messageElement.style.display = "none";
              messageElement.innerText = "";
            }, 5000);
          }
        })
        .catch(function (error) {
          const messageElement = document.getElementById("message");
          messageElement.style.display = "block";
          messageElement.innerText = "Erreur de recherche.";
          setTimeout(function () {
            messageElement.style.display = "none";
            messageElement.innerText = "";
          }, 5000);
        });
    }
  
    // Gérer la soumission du formulaire de recherche
    const rechercheForm = document.getElementById("rechercheForm");
    rechercheForm.addEventListener("submit", rechercherFilms);
    
    // Fonction pour afficher la pagination
    function afficherPagination(totalResults) {
      const totalPages = Math.ceil(totalResults / resultatsParPage);
  
      const paginationDiv = document.getElementById("pagination");
      paginationDiv.innerHTML = "";
  
      const prevPageButton = document.createElement("button");
      prevPageButton.textContent = "Précédent";
      prevPageButton.id = "prevPage";
      prevPageButton.addEventListener("click", function () {
        if (page > 1) {
          page--;
          rechercherFilms(new Event("submit")); 
        }
      });
  
      const nextPageButton = document.createElement("button");
      nextPageButton.textContent = "Suivant";
      nextPageButton.id = "nextPage";
      nextPageButton.addEventListener("click", function () {
        page++;
        rechercherFilms(new Event("submit")); 
      });
  
      paginationDiv.appendChild(prevPageButton);
      paginationDiv.appendChild(nextPageButton);
    }
    // Afficher les numéros de page
  for (let i = 1; i <= totalPages; i++) {
    const pageNumberButton = document.createElement("button");
    pageNumberButton.textContent = i;
    pageNumberButton.addEventListener("click", function () {
      page = i;
      rechercherFilms(new Event("submit")); 
    });
    paginationDiv.appendChild(pageNumberButton);
  }
  });