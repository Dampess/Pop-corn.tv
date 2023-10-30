document.addEventListener("DOMContentLoaded", function() {
    // Fonction pour afficher les résultats de recherche
    function afficherResultats(resultats) {
        const resultatsDiv = document.getElementById("resultats");
        resultatsDiv.innerHTML = "";

        resultats.Search.forEach(function(film) {
            const div = document.createElement("div");
            div.className = "col-md-4 mb-4";

            div.innerHTML = `
                <div class="card">
                    <img src="${film.Poster !== "N/A" ? film.Poster : "https://placehold.co/200x400"}" class="card-img-top" alt="${film.Title}">
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
    function rechercherFilms(e) {
        e.preventDefault();

        const titre = document.getElementById("titre").value;
        const annee = document.getElementById("annee").value;
        const type = document.getElementById("type").value;

        const url = `https://www.omdbapi.com/?s=${titre}&y=${annee}&type=${type}&apikey=ddfd035b`;

        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data.Response === "True") {
                    afficherResultats(data);
                } else {
                    alert("Aucun résultat trouvé.");
                }
            })
            .catch(function(error) {
                alert("Erreur de recherche.");
            });
    }

    // Gérer la soumission du formulaire de recherche
    const rechercheForm = document.getElementById("rechercheForm");
    rechercheForm.addEventListener("submit", rechercherFilms);
});
