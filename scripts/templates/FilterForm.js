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
    /**
     * Fonction qui affiche le selecte jaune quand on clique sur un filtre
     */
    selecteRecherche() {
        // Sélectionne tous les éléments avec la classe 'dropdown-item'
        const selecteRecherches = document.querySelectorAll('.dropdown-item');
        // Sélectionne tous les éléments avec la classe 'btn-secondary'
        const a = document.querySelectorAll('.btn-secondary');
        // Ajoute un écouteur d'événement à chaque élément avec la classe 'dropdown-item'
        selecteRecherches.forEach(selecteRecherche => {
            selecteRecherche.addEventListener('click', this.handleClick);
        });
        // Fonction pour gérer les clics sur les boutons
        const handleClick2 = (event) => {
            // Sélectionne le deuxième dernier élément de la liste des classes de l'élément cliqué
            this.classeClique = event.target.classList[event.target.classList.length - 2];
        };
        // Supprime les écouteurs d'événements des boutons
        a.forEach(bouton => {
            bouton.removeEventListener('click', handleClick2);
        });
        // Ajoute un écouteur d'événement à chaque bouton
        a.forEach(bouton => {
            bouton.addEventListener('click', handleClick2);
        });
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
                    this.effacerFiltreSelect(button);
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
    /**
     * Fonction qui affiche dans le selecte les Ingrédients et qui les filtres avec la barre de recherche 
     */
    afficherIngredients() {
        // Sélectionne l'élément HTML où afficher la liste des ingrédients
        this.listeingredient = document.querySelector('.ulingre');
        // Utilisation d'un ensemble pour stocker les ingrédients uniques
        const ingredients = new Set();
        // Parcourt chaque recette pour récupérer les ingrédients uniques
        this.RecipesData.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                ingredients.add(ingredient.ingredient);
            });
        });
        // Affiche les ingrédients uniques dans la liste
        ingredients.forEach(ingredient => {
            this.Fabrik.createListe(ingredient, this.listeingredient);
        });
        // Ajoute un écouteur d'événement pour le champ de recherche d'ingrédients
        document.querySelector('#site-searchIngredient').addEventListener("input", e => {
            // Récupère le terme de recherche et le convertit en minuscules
            const searchTerm = e.target.value.toLowerCase();
            // Filtre les ingrédients en fonction du terme de recherche
            const filteredIngredients = new Set(Array.from(ingredients).filter(ingredient =>
                ingredient.toLowerCase().includes(searchTerm)
            ));
            // Efface la liste actuelle avant d'afficher les ingrédients filtrés
            this.listeingredient.innerHTML = '';
            // Affiche les ingrédients filtrés en appelant createListe pour chaque ingrédient
            filteredIngredients.forEach(ingredient => {
                this.Fabrik.createListe(ingredient, this.listeingredient);
            });
            // Affiche la barre de recherche des sélecteurs
            this.selecteRecherche();
        });
    }
    /**
   * Fonction qui affiche dans le selecte les Appareilles et qui les filtres avec la barre de recherche 
   */
    afficherAppareil() {
        // Sélectionne l'élément où afficher la liste des appareils
        this.listeappareil = document.querySelector('.ulapp');
        // Utilisation d'un ensemble pour stocker les appareils uniques
        const Appliance = new Set();
        // Parcourt chaque recette pour récupérer les appareils uniques
        this.RecipesData.forEach(recipe => {
            Appliance.add(recipe.appliance);
        });
        // Affiche les appareils uniques dans la liste
        Appliance.forEach(appar => {
            this.Fabrik.createListe(appar, this.listeappareil);
        });
        // Ajoute un écouteur d'événement pour le champ de recherche d'appareils
        const searchInput = document.querySelector('#site-searchApp');
        searchInput.addEventListener("input", e => {
            // Récupère le terme de recherche et le convertit en minuscules
            const searchTerm = e.target.value.toLowerCase();
            // Filtre les appareils en fonction du terme de recherche
            const filteredAppliance = new Set(Array.from(Appliance).filter(appar =>
                appar.toLowerCase().includes(searchTerm)
            ));
            // Efface la liste actuelle avant d'afficher les appareils filtrés
            this.listeappareil.innerHTML = '';
            // Affiche les appareils filtrés en appelant createListe pour chaque appareil
            filteredAppliance.forEach(appar => {
                this.Fabrik.createListe(appar, this.listeappareil);
            });
            // Affiche la barre de recherche des sélecteurs
            this.selecteRecherche();
        });
    }
    /**
     * Fonction qui affiche dans le selecte les ustensils et qui les filtre avec la barre de recherche 
     */
    afficherUstensil() {
        // Sélectionne l'élément où afficher la liste des ustensiles
        this.listeustensil = document.querySelector('.ulus');
        // Utilisation d'un ensemble pour stocker les ustensiles uniques
        const Ustensil = new Set();
        // Parcourt chaque recette pour récupérer les ustensiles uniques
        this.RecipesData.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => {
                const name = ustensil.toLowerCase();
                Ustensil.add(name);
            });
        });
        // Affiche les ustensiles uniques dans la liste
        Ustensil.forEach(ustensil => {
            this.Fabrik.createListe(ustensil, this.listeustensil);
        });
        // Ajoute un écouteur d'événement pour le champ de recherche d'ustensiles
        const searchInput = document.querySelector('#site-searchustensil');
        searchInput.addEventListener("input", e => {
            // Récupère le terme de recherche et le convertit en minuscules
            const searchTerm = e.target.value.toLowerCase();
            // Filtre les ustensiles en fonction du terme de recherche
            const filteredUstensil = new Set(Array.from(Ustensil).filter(ustensil =>
                ustensil.toLowerCase().includes(searchTerm)
            ));
            // Efface la liste actuelle avant d'afficher les ustensiles filtrés
            this.listeustensil.innerHTML = '';
            // Affiche les ustensiles filtrés en appelant createListe pour chaque ustensile
            filteredUstensil.forEach(ustensil => {
                this.Fabrik.createListe(ustensil, this.listeustensil);
            });
            // Affiche la barre de recherche des sélecteurs
            this.selecteRecherche();
        });
    }
    /**
     * Fonction qui permet de calculer le total de recette 
     * @param {*} array qui est tableau a calculer le nombres de recettes
     * @return {*} 
     */
    renderTotal(array) {
        // Sélectionne l'élément pour afficher le total de recettes
        this.totalRecipes = document.querySelector(".totalrecette");
        // Calcule le nombre total de recettes dans le tableau passé en argument
        let total = array.length;
        if(array.length <= 1 ){
            this.totalRecipes.textContent = total + ' recette';
        }else{
            this.totalRecipes.textContent = total + ' recettes';
        }
        // Affiche le total de recettes
        
        // Renvoie le total
        return total;
    }
    /**
     * Fonction qui permet d'effacer le selecteur de recherche 
     * @param {*} close qui est button 
     */
    effacerFiltreSelect(close) {
        // Ajoute un écouteur d'événement pour chaque bouton de fermeture
        close.addEventListener('click', (e) => {
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
            this.arrayFilter = this.arrayFilter.filter(
                (element) => element.toLowerCase() !== removedText.toLowerCase()
            );
            // Nettoie le contenu de cartwrapper
            this.cartwrapper.innerHTML = '';
            // Réaffiche les recettes filtrées
            this.Filtrer();
            // Rendu du total avec les recettes filtrées
            this.renderTotal(this.recipesFiltered);
        });
    }
    /**
     * Fonction qui efface les filtres et les sélecteurs de recherche
     */
    effacerFiltreDiv(btns, liste) {
        // Ajoute un gestionnaire d'événements à chaque bouton de fermeture des divs
        btns.forEach(btn => {
            // Appelle la méthode RecuperationParent
            this.effacerFiltreSelect(btn);
            btn.addEventListener('click', () => {
                this.parentText = btn.parentElement.textContent.trim(); // Texte du parent du bouton de fermeture
                // Compare le texte de chaque élément <a> avec le texte du parent du bouton de fermeture
                liste.forEach(a => {
                    if (a.textContent.trim() === this.parentText) {
                        a.parentElement.remove(); // Supprime l'élément <li> contenant l'élément <a> correspondant
                    }
                });
            });
        });
    }
    /**
     * Fonction qui filtre les recettes en fonction des critères sélectionnés
     */
    Filtrer() {
        // Efface les filtres actifs et les sélecteurs de recherche
        this.effacerFiltreDiv(this.btnCloseDiv, this.selecteListeA, null);
        // Filtrage des recettes en fonction des critères sélectionnés
        const nouvellesRecettesFiltrees = this.RecipesData.filter((recipe) => {
            // Vérifie si chaque filtre correspond à au moins un critère de la recette avec la méthode every
            const match = this.arrayFilter.every((filter) =>
                // Vérifie si le filtre correspond à un ingrédient de la recette
                recipe.ingredients.some((ingredient) =>
                    ingredient.ingredient.toLowerCase().includes(filter.toLowerCase())
                ) ||
                // Vérifie si le filtre correspond à un ustensile de la recette
                recipe.ustensils.some((ustensil) =>
                    ustensil.toLowerCase().includes(filter.toLowerCase())
                ) ||
                // Vérifie si le filtre correspond à l'appareil de cuisson de la recette
                recipe.appliance.toLowerCase().includes(filter.toLowerCase())
            );
            // Retourne vrai si la recette correspond à tous les filtres
            return match;
        });
        // Si aucune recette ne correspond aux filtres sélectionnés
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
            this.renderTotal(this.recipesFiltered)
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
    /**
    * Fonction qui efface les sélecteurs de recherche et réaffiche toutes les recettes
    */
    effacerselectrecherche() {
        // Sélectionne tous les boutons de fermeture
        const btnclose = document.querySelectorAll('.buttonCloseDiv');
        // Ajoute un gestionnaire d'événements à chaque bouton de fermeture
        btnclose.forEach(close => {
            close.addEventListener('click', (e) => {
                // Supprime l'élément parent de l'élément bouton de fermeture
                close.parentElement.remove();
                // Nettoie le contenu de cartwrapper
                this.cartwrapper.innerHTML = '';
                // Réaffiche toutes les recettes
                app.afficherRecette(this.RecipesData);
                // Rendu du total avec toutes les recettes
                this.renderTotal(this.RecipesData);
            });
        });
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
    /**
     * Fonction qui permet d'afficher au submit la recherche effectuée avec le selecteur
     */
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