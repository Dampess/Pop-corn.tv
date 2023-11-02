document.addEventListener("DOMContentLoaded", function () {
  const films = [
    {
      titre: "Deadpool",
      annee: 2016,
      auteur: "Tim Miller",
    },
    {
      titre: "Spiderman",
      annee: 2002,
      auteur: "Sam Raimi",
    },
    {
      titre: "Scream",
      annee: 1996,
      auteur: "Wes Craven",
    },
    {
      titre: "It: chapter 1",
      annee: 2019,
      auteur: "Andy Muschietti",
    },
  ]; // Tableau pour stocker les films

  // Fonction pour afficher les films dans le tableau

  function afficherFilms() {
    const filmsTable = document.getElementById("filmsTable");
    filmsTable.innerHTML = "";
    const filtre = document.getElementById("filtre").value;

    // Trier les films en fonction du filtre sélectionné

    if (filtre === "titre") {
      films.sort((a, b) => a.titre.localeCompare(b.titre));
    } else if (filtre === "annee") {
      films.sort((a, b) => b.annee - a.annee);
    }

    // Boucler à travers les films et les afficher

    films.forEach(function (film, index) {
      const row = document.createElement("tr");
      row.innerHTML = `
    <td>${film.titre}</td>
    <td>${film.annee}</td>
    <td>${film.auteur}</td>
    <td>
        <button class="btn btn-danger supprimer-film" data-index="${index}">Supprimer</button>
    </td>
`;
      filmsTable.appendChild(row);
    });
    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("supprimer-film")) {
        const index = parseInt(e.target.getAttribute("data-index"));
        supprimerFilm(index);
      }
    });
  }

  // Fonction pour valider les données du formulaire

  function validerFormulaire() {
    const titre = document.getElementById("titre").value;
    const annee = parseInt(document.getElementById("annee").value);
    const auteur = document.getElementById("auteur").value;

    let erreurs = "";

    if (titre.length < 2) {
      erreurs += "Le titre doit contenir au moins 2 caractères. ";
    }

    if (isNaN(annee) || annee < 1900 || annee > new Date().getFullYear()) {
      erreurs += "L'année doit être un nombre entre 1900 et l'année en cours. ";
    }

    if (auteur.length < 5) {
      erreurs += "L'auteur doit contenir au moins 5 caractères. ";
    }

    if (erreurs === "") {
      return { titre: titre, annee: annee, auteur: auteur };
    } else {
      const messageElement = document.getElementById("message");
      messageElement.style.display = "block";
      messageElement.innerText = "Information manquante.";
      ajouterFilmBtn.style.display = "Block";
      document.getElementById("titre").value = "";
      document.getElementById("annee").value = "";
      document.getElementById("auteur").value = "";

      setTimeout(function () {
        messageElement.style.display = "none";
        messageElement.innerText = "";
      }, 5000);
      return null;
    }
  }

  // Fonction pour ajouter un film

  function ajouterFilm() {
    const film = validerFormulaire();
    if (film) {
      film.titre = film.titre.charAt(0).toUpperCase() + film.titre.slice(1); // Mettre la première lettre en majuscule
      film.auteur = film.auteur.charAt(0).toUpperCase() + film.auteur.slice(1);
      films.push(film);
      afficherFilms();
      const messageElement = document.getElementById("message");
      messageElement.style.display = "block";
      messageElement.innerText = "Film ajouté avec succès.";
      ajouterFilmBtn.style.display = "Block";
      setTimeout(function () {
        messageElement.style.display = "none";
        messageElement.innerText = "";
      }, 5000);
    }
  }

  // Fonction pour supprimer un film

  function supprimerFilm(index) {
    if (confirm("Voulez-vous vraiment supprimer ce film ?")) {
      films.splice(index, 1);
      afficherFilms();
      const messageElement = document.getElementById("message");
      messageElement.style.display = "block";
      messageElement.innerText = "Film supprimé avec succès.";
      setTimeout(function () {
        messageElement.style.display = "none";
        messageElement.innerText = "";
      }, 5000);
    }
  }

  // Gérer le clic sur le bouton "Ajouter"

  const ajouterFilmBtn = document.getElementById("ajouterFilmBtn");
  ajouterFilmBtn.addEventListener("click", function () {
    ajouterFilmBtn.style.display = "none";
    const ajouterFilmForm = document.getElementById("ajouterFilmForm");
    ajouterFilmForm.style.display = "block";
  });

  // Gérer le clic sur le bouton "Ajouter" dans le formulaire

  const ajouterBtn = document.getElementById("ajouterBtn");
  ajouterBtn.addEventListener("click", function () {
    ajouterFilm();
    document.getElementById("ajouterFilmForm").style.display = "none";
  });

  // Gérer le changement du filtre

  const filtre = document.getElementById("filtre");
  filtre.addEventListener("change", afficherFilms);

  // Appel initial pour afficher les films

  afficherFilms();
});
