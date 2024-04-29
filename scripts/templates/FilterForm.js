class FilterForm {
    constructor(App, RecipesData) {
        // Initialisation des propriétés de l'instance
        this.App = App; // Stocke une référence à l'application
        this.RecipesData = RecipesData; // Stocke les données des recettes
        this.$wrapper = document.createElement('div'); // Crée un élément div
        this.Fabrik = new Fabrik(); // Initialise une instance de la classe Fabrik
        this.$moviesWrapper = document.querySelector('.carterecette'); // Sélectionne l'élément avec la classe 'carterecette'
        this.searchInput = document.querySelector('#site-search'); // Sélectionne l'élément avec l'ID 'site-search'
        this.cartwrapper = document.querySelector('.carterecette'); // Sélectionne l'élément avec la classe 'carterecette'
        this.submit = document.querySelector('.divrecherche button'); // Sélectionne le bouton dans l'élément avec la classe 'divrecherche'
        this.recherche = document.querySelector('.divrecherche input'); // Sélectionne l'input dans l'élément avec la classe 'divrecherche'
        this.recettesFiltrees = []; // Initialise un tableau pour stocker les recettes filtrées
        this.arrayFilter = []; // Initialise un tableau pour stocker les filtres
    }

    selecteRecherche() {
        // Sélectionne tous les éléments avec la classe 'dropdown-item'
        const selecteRecherches = document.querySelectorAll('.dropdown-item');
        // Sélectionne tous les éléments avec la classe 'btn-secondary'
        const a = document.querySelectorAll('.btn-secondary');

        // Ajoute un écouteur d'événement à chaque élément avec la classe 'dropdown-item'
        for (let i = 0; i < selecteRecherches.length; i++) {
            const selecteRecherche = selecteRecherches[i];
            selecteRecherche.addEventListener('click', this.handleClick);
        }

        // Fonction pour gérer les clics sur les boutons
        const handleClick2 = (event) => {
            // Sélectionne le deuxième dernier élément de la liste des classes de l'élément cliqué
            this.classeClique = event.target.classList[event.target.classList.length - 2];
        };

        // Supprime les écouteurs d'événements des boutons
        for (let i = 0; i < a.length; i++) {
            const bouton = a[i];
            bouton.removeEventListener('click', handleClick2);
        }

        // Ajoute un écouteur d'événement à chaque bouton
        for (let i = 0; i < a.length; i++) {
            const bouton = a[i];
            bouton.addEventListener('click', handleClick2);
        }
    }
    handleClick = (event) => {
        // Récupère le texte de l'élément cliqué
        const selecte = event.target.textContent;
        // Crée un élément selecte dans l'interface
        this.Fabrik.createSelectRecherche(selecte, selecte);
        // Stocke l'élément actif
        this.itemActive = event.target;
        // Stocke le parent de l'élément actif
        this.itemActiveParent = event.target.parentNode;
        // Ajoute le filtre sélectionné au tableau des filtres
        this.arrayFilter.push(selecte);
        // Vérifie si le parent de l'élément actif existe avant d'accéder à previousElementSibling
        if (this.itemActiveParent) {
            // Stocke l'élément précédent du parent
            this.ParentNode = this.itemActiveParent.parentNode.previousElementSibling;

            // Vérifie si this.ParentNode existe avant de modifier son innerHTML
            if (this.ParentNode) {
                // Modifie le HTML de this.ParentNode avec le nouveau filtre sélectionné
                this.ParentNode.innerHTML = `<li class="parentNode"><a class="dropdown-item selecteListe" href="#">${selecte}</a> <button class="closeselecteButton"> <img class="closeselecte" src="../assets/croix2.svg"> </button> </li>`;
                // Sélectionne tous les boutons de fermeture des sélecteurs
                const buttoncloseselecteList = this.ParentNode.querySelectorAll('.closeselecteButton');
                // Sélectionne tous les divs filtres
                this.divfiltre = document.querySelectorAll('.accueilselecterecherche');
                // Sélectionne tous les boutons de fermeture des divs
                this.btnCloseDiv = document.querySelectorAll('.buttonCloseDiv');
                // Sélectionne tous les éléments <a> des filtres
                this.selecteListeA = document.querySelectorAll('.selecteListe');
                // Ajoute un écouteur d'événement à chaque bouton de fermeture des sélecteurs
                buttoncloseselecteList.forEach(button => {
                    button.addEventListener('click', () => {
                        button.parentNode.remove();
                    });
                    // Appelle la méthode RecuperationParent
                    this.RecuperationParent(button);
                });
            }
        }
        // Efface l'élément actif parent et son frère
        this.itemActiveParent.remove(this.parentElementSelectedItembrother);
        // Filtre les recettes
        this.Filtrer();
        // Affiche la barre de recherche des sélecteurs
        this.selecteBarreDeRecherche();
    };
    afficherIngredients() {
        // Sélectionne l'élément HTML où afficher la liste des ingrédients
        this.listeingredient = document.querySelector('.ulingre');
        // Utilisation d'un ensemble pour stocker les ingrédients uniques
        const ingredients = new Set();

        // Boucle for pour parcourir chaque recette et récupérer les ingrédients uniques
        for (let i = 0; i < this.RecipesData.length; i++) {
            const recipe = this.RecipesData[i];
            const recipeIngredients = recipe.ingredients;

            for (let j = 0; j < recipeIngredients.length; j++) {
                const ingredient = recipeIngredients[j].ingredient;
                ingredients.add(ingredient);
            }
        }

        // Affiche les ingrédients uniques dans la liste
        const ingredientArray = Array.from(ingredients);
        for (let i = 0; i < ingredientArray.length; i++) {
            const ingredient = ingredientArray[i];
            this.Fabrik.createListe(ingredient, this.listeingredient);
        }

        // Ajoute un écouteur d'événement pour le champ de recherche d'ingrédients
        document.querySelector('#site-searchIngredient').addEventListener("input", (e) => {
            // Récupère le terme de recherche et le convertit en minuscules
            const searchTerm = e.target.value.toLowerCase();
            // Crée un ensemble pour stocker les ingrédients filtrés
            const filteredIngredients = new Set();

            // Parcourt tous les ingrédients
            for (let ingredient of ingredients) {
                // Vérifie si l'ingrédient correspond au terme de recherche
                if (ingredient.toLowerCase().includes(searchTerm)) {
                    filteredIngredients.add(ingredient);
                }
            }

            // Efface la liste actuelle avant d'afficher les ingrédients filtrés
            this.listeingredient.innerHTML = '';

            // Affiche les ingrédients filtrés en appelant createListe pour chaque ingrédient
            for (let filteredIngredient of filteredIngredients) {
                this.Fabrik.createListe(filteredIngredient, this.listeingredient);
            }

            // Affiche la barre de recherche des sélecteurs
            this.selecteRecherche();
        });
    }
    afficherUstensil() {
        // Sélectionne l'élément où afficher la liste des ustensiles
        this.listeustensil = document.querySelector('.ulus');
        // Utilisation d'un ensemble pour stocker les ustensiles uniques
        const Ustensil = new Set();

        // Boucle for pour parcourir chaque recette et récupérer les ustensiles uniques
        for (let i = 0; i < this.RecipesData.length; i++) {
            const recipe = this.RecipesData[i];
            const recipeUstensils = recipe.ustensils;

            for (let j = 0; j < recipeUstensils.length; j++) {
                const ustensil = recipeUstensils[j].toLowerCase();
                Ustensil.add(ustensil);
            }
        }

        // Affiche les ustensiles uniques dans la liste
        const ustensilArray = Array.from(Ustensil);
        for (let i = 0; i < ustensilArray.length; i++) {
            const ustensil = ustensilArray[i];
            this.Fabrik.createListe(ustensil, this.listeustensil);
        }

        // Ajoute un écouteur d'événement pour le champ de recherche d'ustensiles
        const searchInput = document.querySelector('#site-searchustensil');
        searchInput.addEventListener("input", (e) => {
            // Récupère le terme de recherche et le convertit en minuscules
            const searchTerm = e.target.value.toLowerCase();
            // Crée un ensemble pour stocker les ustensiles filtrés
            const filteredUstensil = new Set();

            // Parcourt tous les ustensiles
            for (let ustensil of Ustensil) {
                // Vérifie si l'ustensile correspond au terme de recherche
                if (ustensil.toLowerCase().includes(searchTerm)) {
                    filteredUstensil.add(ustensil);
                }
            }

            // Efface la liste actuelle avant d'afficher les ustensiles filtrés
            this.listeustensil.innerHTML = '';

            // Affiche les ustensiles filtrés en appelant createListe pour chaque ustensile
            for (let filtered of filteredUstensil) {
                this.Fabrik.createListe(filtered, this.listeustensil);
            }

            // Affiche la barre de recherche des sélecteurs
            this.selecteRecherche();
        });
    }
    afficherAppareil() {
        // Sélectionne l'élément où afficher la liste des appareils
        this.listeappareil = document.querySelector('.ulapp');
        // Utilisation d'un ensemble pour stocker les appareils uniques
        const Appliance = new Set();

        // Boucle for pour parcourir chaque recette et récupérer les appareils uniques
        for (let i = 0; i < this.RecipesData.length; i++) {
            const recipe = this.RecipesData[i];
            Appliance.add(recipe.appliance);
        }

        // Affiche les appareils uniques dans la liste
        const applianceArray = Array.from(Appliance);
        for (let i = 0; i < applianceArray.length; i++) {
            const appar = applianceArray[i];
            this.Fabrik.createListe(appar, this.listeappareil);
        }

        // Ajoute un écouteur d'événement pour le champ de recherche d'appareils
        const searchInput = document.querySelector('#site-searchApp');
        searchInput.addEventListener("input", (e) => {
            // Récupère le terme de recherche et le convertit en minuscules
            const searchTerm = e.target.value.toLowerCase();
            // Crée un ensemble pour stocker les appareils filtrés
            const filteredAppliance = new Set();

            // Parcourt tous les appareils
            for (let appar of Appliance) {
                // Vérifie si l'appareil correspond au terme de recherche
                if (appar.toLowerCase().includes(searchTerm)) {
                    filteredAppliance.add(appar);
                }
            }

            // Efface la liste actuelle avant d'afficher les appareils filtrés
            this.listeappareil.innerHTML = '';

            // Affiche les appareils filtrés en appelant createListe pour chaque appareil
            for (let appar of filteredAppliance) {
                this.Fabrik.createListe(appar, this.listeappareil);
            }

            // Affiche la barre de recherche des sélecteurs
            this.selecteRecherche();
        });
    }
        renderTotal(array) {
            // Sélectionne l'élément pour afficher le total de recettes
            this.totalRecipes = document.querySelector(".totalrecette");
            // Calcule le nombre total de recettes dans le tableau passé en argument
            let total = array.length;
            // Affiche le total de recettes
            this.totalRecipes.textContent = total + ' recettes';
            // Renvoie le total
            return total;
        }
    RecuperationParent(close) {
        // Ajoute un écouteur d'événement pour chaque bouton de fermeture
        close.addEventListener('click', function (e) {
            // Récupère le texte de l'élément précédent à supprimer
            const paragraphText = close.previousElementSibling.textContent;
            // Trouve le paragraphe à supprimer en utilisant son ID
            const paragraphToRemove = document.getElementById(paragraphText);
            // Vérifie si le paragraphe a été trouvé et le supprime si nécessaire
            if (paragraphToRemove) {
                // Supprime le paragraphe
                paragraphToRemove.remove();
            }
            // Supprime l'élément de la liste des filtres actifs
            const removedText = close.previousElementSibling.textContent.trim();
            const newArrayFilter = [];
            // Parcours tous les éléments du tableau this.arrayFilter
            for (let i = 0; i < this.arrayFilter.length; i++) {
                // Vérifie si l'élément actuel n'est pas égal à l'élément à supprimer
                if (this.arrayFilter[i].toLowerCase() !== removedText.toLowerCase()) {
                    // Ajoute l'élément actuel au nouveau tableau newArrayFilter
                    newArrayFilter.push(this.arrayFilter[i]);
                }
            }
            // Réassigne le tableau this.arrayFilter avec le nouveau tableau filtré
            this.arrayFilter = newArrayFilter;

            // Nettoie le contenu de cartwrapper
            this.cartwrapper.innerHTML = '';
            // Réaffiche les recettes filtrées
            this.Filtrer();
            // Rendu du total avec les recettes filtrées
            this.renderTotal(this.recipesFiltered);
        }.bind(this));
    }
    effacerFIltre(btns, liste) {
        for (let i = 0; i < btns.length; i++) {
            const btn = btns[i];
            // Appelle la méthode RecuperationParent
            this.RecuperationParent(btn);
            btn.addEventListener('click', () => {
                this.parentText = btn.parentElement.textContent.trim(); // Texte du parent du bouton de fermeture
                // Compare le texte de chaque élément <a> avec le texte du parent du bouton de fermeture
                for (let j = 0; j < liste.length; j++) {
                    const a = liste[j];
                    if (a.textContent.trim() === this.parentText) {
                        a.parentElement.remove(); // Supprime l'élément <li> contenant l'élément <a> correspondant
                    }
                }
            });
        }
    }

    Filtrer() {
        // Efface les filtres actifs et les sélecteurs de recherche
        this.effacerFIltre(this.btnCloseDiv, this.selecteListeA, null);

        const nouvellesRecettesFiltrees = [];

        // Parcours des recettes
        for (let i = 0; i < this.RecipesData.length; i++) {
            const recipe = this.RecipesData[i];
            let match = true;

            // Vérification de chaque filtre
            for (let j = 0; j < this.arrayFilter.length; j++) {
                const filter = this.arrayFilter[j].toLowerCase();

                // Vérification de chaque critère de la recette
                let ingredientMatch = false;
                for (let k = 0; k < recipe.ingredients.length; k++) {
                    if (recipe.ingredients[k].ingredient.toLowerCase().includes(filter)) {
                        ingredientMatch = true;
                        break;
                    }
                }

                let ustensilMatch = false;
                for (let k = 0; k < recipe.ustensils.length; k++) {
                    if (recipe.ustensils[k].toLowerCase().includes(filter)) {
                        ustensilMatch = true;
                        break;
                    }
                }

                const applianceMatch = recipe.appliance.toLowerCase().includes(filter);

                // Si aucun critère de la recette ne correspond au filtre
                if (!ingredientMatch && !ustensilMatch && !applianceMatch) {
                    match = false;
                    break;
                }
            }

            // Si la recette correspond à tous les filtres, l'ajouter aux recettes filtrées
            if (match) {
                nouvellesRecettesFiltrees.push(recipe);
            }
        }

        if (nouvellesRecettesFiltrees.length === 0) {
            // Affiche un message indiquant qu'aucune recette ne correspond aux filtres
            this.cartwrapper.innerHTML = `<div class="container">
            <div class="row">
                <div class="col">
                    <div class="mx-auto text-center style="font-family: 'Roboto', sans-serif;"">
                        <h2 class=" m-4">Aucune recette ne contient les filtres sélectionnés</h2>
                        <h3 class="m-4">Vous pouvez essayer d'autres filtres</h3>
                        <p class="m-2">Merci.</p>
                    </div>
                </div>
            </div>
        </div>`;
            // Réinitialise la liste des recettes filtrées
            this.recipesFiltered = [];
        } else {
            // Si des recettes correspondent aux filtres, les enregistre dans la liste des recettes filtrées
            this.recipesFiltered = nouvellesRecettesFiltrees;
            // Efface le contenu précédent de la zone d'affichage des recettes
            this.cartwrapper.innerHTML = '';
            // Affiche les cartes des recettes filtrées
            app.afficherRecette(this.recipesFiltered);
            // Affiche le total des recettes filtrées
            this.renderTotal(this.recipesFiltered);
        }
    }
    effacerselectrecherche() {
        // Sélectionne tous les boutons de fermeture
        const btnclose = document.querySelectorAll('.buttonCloseDiv');
    
        for (let i = 0; i < btnclose.length; i++) {
            const close = btnclose[i];
            close.addEventListener('click', function (e) {
                // Supprime l'élément parent de l'élément bouton de fermeture
                close.parentElement.remove();
                // Nettoie le contenu de cartwrapper
                this.cartwrapper.innerHTML = '';
                // Réaffiche toutes les recettes
                app.afficherRecette(this.RecipesData);
                // Rendu du total avec toutes les recettes
                this.renderTotal(this.RecipesData);
            }.bind(this));
        }
    }
    

    /**
     * Compare l'input utilisateur au dela de 3 caractères entrées et affiche un message d'erreur si aucun terme n'est trouvé.
     */
    compareInputResult() {
        // Ajoute un écouteur d'événement pour le champ de recherche
        this.searchInput.addEventListener("keyup", (e) => {
            // Récupère le terme de recherche et le nettoie
            const query = this.searchInput.value.trim().toLowerCase();
            if (query.length >= 3) {
                // Filtrer les recettes en fonction de la recherche
                const filteredRecipes = this.RecipesData.filter((recipe) => {
                    // Vérifie si le terme de recherche est présent dans le nom, la description ou les ingrédients de la recette
                    return this.compareJSON(recipe, query);
                });
                // Affiche les nouvelles recettes filtrées ou un message d'erreur si aucune recette n'est trouvée
                if (filteredRecipes.length === 0) {
                    this.renderTotal(filteredRecipes);
                    this.cartwrapper.innerHTML = `<div class="container">
                        <div class="row">
                            <div class="col">
                                <div class="mx-auto text-center style="font-family: 'Roboto', sans-serif;"">
                                    <h2 class=" m-4">Aucune recette ne contient '${query}' vous pouvez chercher</h2>
                                    <h3 class="m-4">«tarte aux pommes », « poisson », etc.<br>
                                    <p class="m-2">Merci.</p>
                                </div>
                            </div>
                        </div>
                    </div>`;
                } else {
                    // Affiche les nouvelles recettes filtrées
                    this.cartwrapper.innerHTML = '';
                    app.afficherRecette(filteredRecipes);
                    this.renderTotal(filteredRecipes);
                }
            } else if (query.length === 0) {
                // Si la recherche est vide, affiche toutes les recettes
                this.cartwrapper.innerHTML = '';
                app.afficherRecette(this.RecipesData);
                this.renderTotal(this.RecipesData);
            }
        });
    }
    /**
       * Compare la recherche utilisateur au titre, à la description et aux ingrédients de la recette
       */
    compareJSON(recipe, query) {
        // Vérifie si le terme de recherche est présent dans le nom, la description ou les ingrédients de la recette
        const matchName = recipe.name.toLowerCase().includes(query);
        const matchDescription = recipe.description.toLowerCase().includes(query);
        const matchIngredients = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query));
        return matchName || matchDescription || matchIngredients;
    }
    selecteBarreDeRecherche() {
        // Ajoute un écouteur d'événement au bouton de soumission
        this.submit.addEventListener('click', () => {
            // Crée un selecteur pour la recherche
            this.Fabrik.createSelectRecherche(this.recherche.value);
            // Efface les sélecteurs de recherche
            this.effacerselectrecherche();
        });
    }
}