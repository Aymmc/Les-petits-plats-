class FilterForm {
    constructor(App, RecipesData) {
        this.App = App;
        this.RecipesData = RecipesData;
        this.$wrapper = document.createElement('div');
        this.Fabrik = new Fabrik()
        this.$moviesWrapper = document.querySelector('.carterecette');
        // this.ProxyRatingSorter = new ProxyRatingSorter()
    }
    selecteRecherche() {
        // Sélection de tous les éléments avec la classe .dropdown-item
        const selecteRecherches = document.querySelectorAll('.dropdown-item');
        const a = document.querySelectorAll('.btn-secondary')
        // Fonction pour gérer le clic sur un élément de recherche
        const handleClick = (event) => {
            // Récupération du texte de l'élément sélectionné
            const selecte = event.target.textContent;
            // Suppression du contenu précédent dans le conteneur de sélection
            // divselectRecheches.innerHTML = '';
            // Création et affichage de la sélection de recherche
            this.Fabrik.createSelectRecherche(selecte);
            // Création et affichage de l'élément de liste correspondan 
            this.Filtrer()
        };
        // // Ajouter les nouveaux écouteurs d'événements sur les éléments .dropdown-item
        selecteRecherches.forEach(selecteRecherche => {
            selecteRecherche.addEventListener('click', handleClick);
        });
        // Fonction pour gérer le clic sur un bouton .btn-secondary
        const handleClick2 = (event) => {
            // Récupération de la classe du bouton cliqué
            this.classeClique = event.target.classList[event.target.classList.length - 2];

            // Utilisez la classe du bouton pour effectuer des actions supplémentaires si nécessaire
            console.log(this.classeClique);
        };
        // Supprimer les écouteurs d'événements précédents sur les boutons .btn-secondary
        a.forEach(bouton => {
            bouton.removeEventListener('click', handleClick2);
        });
        // Ajouter les nouveaux écouteurs d'événements sur les boutons .btn-secondary
        a.forEach(bouton => {
            bouton.addEventListener('click', handleClick2);
        });
    }
    afficherIngredients() {
        // Sélection de l'élément HTML où afficher la liste des ingrédients
        this.listeingredient = document.querySelector('.ulingre');
        // Utilisation d'un ensemble pour stocker les ingrédients uniques
        const ingredients = new Set();
        // Parcours de chaque recette pour récupérer les ingrédients uniques
        this.RecipesData.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                ingredients.add(ingredient.ingredient);
            });
        });
        // Affichage des ingrédients uniques dans la liste
        ingredients.forEach(ingredient => {
            this.Fabrik.createListe(ingredient, this.listeingredient);
        });
        // Ajout d'un écouteur d'événement pour le champ de recherche d'ingrédients
        const searchInput = document.querySelector('#site-searchIngredient');
        searchInput.addEventListener("input", e => {
            // Récupération du terme de recherche et conversion en minuscules
            const searchTerm = e.target.value.toLowerCase();
            // Filtrage des ingrédients en fonction du terme de recherche
            const filteredIngredients = new Set(Array.from(ingredients).filter(ingredient =>
                ingredient.toLowerCase().includes(searchTerm)
            ));
            // Effacement de la liste actuelle avant d'afficher les ingrédients filtrés
            this.listeingredient.innerHTML = '';
            // Afficher les ingrédients filtrés en appelant createListe pour chaque ingrédient
            filteredIngredients.forEach(ingredient => {
                this.Fabrik.createListe(ingredient, this.listeingredient);
                this.selecteRecherche();
            });
        });
    }
    afficherAppareil() {
        this.listeappareil = document.querySelector('.ulapp');
        const Appliance = new Set(); // Utiliser un ensemble pour stocker les appareils uniques
        this.RecipesData.forEach(recipe => {
            Appliance.add(recipe.appliance); // Ajouter l'appareil de chaque recette à l'ensemble
        });
        Appliance.forEach(appar => {
            this.Fabrik.createListe(appar, this.listeappareil);
        });
        const searchInput = document.querySelector('#site-searchApp');
        searchInput.addEventListener("input", e => {
            // Récupération du terme de recherche et conversion en minuscules
            const searchTerm = e.target.value.toLowerCase();
            // Filtrage des ingrédients en fonction du terme de recherche
            const filteredAppliance = new Set(Array.from(Appliance).filter(appar =>
                appar.toLowerCase().includes(searchTerm)
            ));
            // Effacement de la liste actuelle avant d'afficher les ingrédients filtrés
            this.listeappareil.innerHTML = '';
            // Afficher les ingrédients filtrés en appelant createListe pour chaque ingrédient
            filteredAppliance.forEach(appar => {
                this.Fabrik.createListe(appar, this.listeappareil);
                this.selecteRecherche();
            });
        });
    }
    afficherUstensil() {
        this.listeustensil = document.querySelector('.ulus');
        const Ustensil = new Set(); // Utiliser un ensemble pour stocker les ustensiles uniques
        this.RecipesData.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => { // Utiliser ustensil au lieu de recipe.ustensils
                const name = ustensil.toLowerCase(); // Nettoyer l'ustensile en le mettant en minuscules
                Ustensil.add(name);
            });
        });
        Ustensil.forEach(ustensil => {
            this.Fabrik.createListe(ustensil, this.listeustensil);
        });
        const searchInput = document.querySelector('#site-searchustensil');
        searchInput.addEventListener("input", e => {
            // Récupération du terme de recherche et conversion en minuscules
            const searchTerm = e.target.value.toLowerCase();
            // Filtrage des ingrédients en fonction du terme de recherche
            const filteredUstensil = new Set(Array.from(Ustensil).filter(ustensil =>
                ustensil.toLowerCase().includes(searchTerm)
            ));
            // Effacement de la liste actuelle avant d'afficher les ingrédients filtrés
            this.listeustensil.innerHTML = '';
            // Afficher les ingrédients filtrés en appelant createListe pour chaque ingrédient
            filteredUstensil.forEach(ustensil => {
                this.Fabrik.createListe(ustensil, this.listeustensil);
                this.selecteRecherche();
            });
        });
    }
    renderTotal(array) {
        this.totalRecipes = document.querySelector(".totalrecette");
        let total = array.length; // Mettre à jour le total en utilisant le tableau passé en argument
        this.totalRecipes.textContent = total + ' recettes'; // Ajouter le total en tant que texte
        return total; // Renvoyer le total mis à jour si nécessaire
    }
    Filtrer() {
        this.cartwrapper = document.querySelector('.carterecette');
        const filtres = document.querySelectorAll('.recherche');
        let recettesFiltrees = this.RecipesData; // Initialisez avec toutes les recettes
        // Efface le contenu de chaque élément .divtotalrecette
        console.log("Recettes initiales:", recettesFiltrees);
        filtres.forEach(filtre => {
            const resultatfiltre = filtre.textContent;
            const resultatclasse = this.classeClique;
            console.log("Filtre:", resultatfiltre);
            console.log("Classe:", resultatclasse);
            // Filtrer les recettes déjà filtrées avec le nouveau filtre
            recettesFiltrees = recettesFiltrees.filter(recipe => {
                if (resultatclasse === "ingredients") {
                    return recipe.ingredients.some(ingredient => ingredient.ingredient.includes(resultatfiltre));
                } else if (resultatclasse === "ustensils") {
                    return recipe.ustensils.some(ustensils => ustensils.includes(resultatfiltre));
                } else if (resultatclasse === "appliance") {
                    return recipe.appliance.includes(resultatfiltre);
                }
            });
            console.log("Recettes filtrées:", recettesFiltrees);
            // Afficher les recettes filtrées
            this.cartwrapper.innerHTML = '';
            recettesFiltrees.forEach(recipe => {
                this.Fabrik = new Fabrik();
                this.Fabrik.createCarte(recipe.name, recipe.description, recipe.ingredients, recipe.image, recipe.time);
            });
            this.renderTotal(recettesFiltrees);
            // Ajouter un écouteur d'événement pour le bouton de fermeture
            const btnclose = document.querySelector('.buttoncloseselect');
            btnclose.addEventListener('click', () => {
                this.cartwrapper.innerHTML = '';
                app.afficherRecette()
                this.renderTotal(this.RecipesData)
            });

        });
    }
}


