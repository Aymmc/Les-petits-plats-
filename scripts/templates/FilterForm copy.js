class FilterForm {
    constructor(App, RecipesData) {
        this.App = App;
        this.RecipesData = RecipesData;
        this.$wrapper = document.createElement('div');
        this.Fabrik = new Fabrik()
        this.$moviesWrapper = document.querySelector('.carterecette');
        this.searchInput = document.querySelector('#site-search')
        this.cartwrapper = document.querySelector('.carterecette')
        this.submit = document.querySelector('.divrecherche button')
        this.recherche = document.querySelector('.divrecherche input')
        // this.ProxyRatingSorter = new ProxyRatingSorter()
    }
    /**
     *Function qui affiche le selecte jaune quand on clicks sur un filtre
     *
     * @memberof FilterForm
     */
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
            
            this.itemActive = event.target;
            this.itemActiveParent = event.target.parentNode;
            this.ParentNode = this.itemActiveParent.parentNode.previousElementSibling

            this.ParentNode.innerHTML = `<li><a class="dropdown-item selecteListe" href="#">${selecte}</a></li>`;

            //creation dans le filtre des séléctions en dessous

            this.itemActiveParent.remove(this.parentElementSelectedItembrother);
            this.Filtrer()
            this.selecteBarreDeRecherche()
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
    /**
     *Function qui affiche dans le selecte les Ingrédients et qui les filtres avec la barre de recherche 
     *
     * @memberof FilterForm
     */
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
    /**
     *Function qui affiche dans le selecte les Appareilles et qui les filtres avec la barre de recherche 
     *
     * @memberof FilterForm
     */
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
    /**
     *Function qui affiche dans le selecte les ustensils et qui les filtres avec la barre de recherche 
     *
     * @memberof FilterForm
     */
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
    /**
     *
     *Function qui permet de calculer le total de recette 
     * @param {*} array
     * @return {*} 
     * @memberof FilterForm
     */
    renderTotal(array) {
        this.totalRecipes = document.querySelector(".totalrecette");
        let total = array.length; // Mettre à jour le total en utilisant le tableau passé en argument
        this.totalRecipes.textContent = total + ' recettes'; // Ajouter le total en tant que texte
        return total; // Renvoyer le total mis à jour si nécessaire
    }
    /**
     *Function qui permet d'effacer le selecteur de recherche 
     *
     * @memberof FilterForm
     */
    effacerselectrecherche() {
        const btnclose = document.querySelector('.buttoncloseselect');
        btnclose.addEventListener('click', () => {
            this.cartwrapper.innerHTML = '';
            app.afficherRecette()
            this.renderTotal(this.RecipesData)
        });
    }
    /**
     *Function qui filtre les ingrédients les ustentsils et les appareilles 
     *
     * @memberof FilterForm
     */
    Filtrer() {
        const filtres = document.querySelectorAll('.recherche');
        let recettesFiltrees = this.RecipesData; // Initialisez avec toutes les recettes
        // Efface le contenu de chaque élément .divtotalrecette
        filtres.forEach(filtre => {
            const resultatfiltre = filtre.textContent.toLowerCase(); // Convertit en minuscules
            const resultatclasse = this.classeClique.toLowerCase(); // Convertit en minuscules
            // Filtrer les recettes déjà filtrées avec le nouveau filtre
            recettesFiltrees = recettesFiltrees.filter(recipe => {
                if (resultatclasse === "ingredients") {
                    return recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(resultatfiltre)); // Convertit en minuscules
                } else if (resultatclasse === "ustensils") {
                    return recipe.ustensils.some(ustensils => ustensils.toLowerCase().includes(resultatfiltre)); // Convertit en minuscules
                } else if (resultatclasse === "appliance") {
                    return recipe.appliance.toLowerCase().includes(resultatfiltre); // Convertit en minuscules
                }
            });

            // Afficher les recettes filtrées
            this.cartwrapper.innerHTML = '';
            recettesFiltrees.forEach(recipe => {
                this.Fabrik = new Fabrik();
                this.Fabrik.createCarte(recipe.name, recipe.description, recipe.ingredients, recipe.image, recipe.time);
            });
            this.renderTotal(recettesFiltrees);
            // Ajouter un écouteur d'événement pour le bouton de fermeture
            this.effacerselectrecherche()
        });
    }
    /**
    * Compare l'input utilisateur au dela de 3 characteres entrées et affiche un message d 'erreur si aucune terme n 'est trouvé.
    *
    * @memberof FilterForm
    */
    compareInputResult() {
        this.searchInput.addEventListener("keyup", (e) => {
            const query = this.searchInput.value.trim().toLowerCase();
            if (query.length >= 3) {
                // Filtrer les recettes en fonction de la recherche
                const filteredRecipes = this.RecipesData.filter((recipe) => {
                    // Vérifier si le terme de recherche est présent dans le nom, la description ou les ingrédients de la recette
                    return this.compareJSON(recipe, query);
                });
                // Afficher les nouvelles recettes filtrées
                if (filteredRecipes.length === 0) {
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
                    // Afficher les nouvelles recettes filtrées
                    this.cartwrapper.innerHTML = '';
                    filteredRecipes.forEach(filteredRecipes => {
                        this.Fabrik.createCarte(filteredRecipes.name, filteredRecipes.description, filteredRecipes.ingredients, filteredRecipes.image, filteredRecipes.time);
                    });
                    this.renderTotal(filteredRecipes);
                }
            } else if (query.length === 0) {
                this.cartwrapper.innerHTML = '';
                app.afficherRecette()
                this.renderTotal(this.RecipesData);
            }
        });
    }

    /**
     * Compare la recherche utilisateur au titre , description, et ingredients
     *
     * @param {Array<Object} recipe-l'objet de recherche
     * @param {*} query-recherche de l 'utilisateur 
     * @memberof FilterForm
     */
    compareJSON(recipe, query) {
        // Vérifier si le terme de recherche est présent dans le nom, la description ou les ingrédients de la recette
        const matchName = recipe.name.toLowerCase().includes(query);
        const matchDescription = recipe.description.toLowerCase().includes(query);
        const matchIngredients = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query));
        return matchName || matchDescription || matchIngredients;
    }
    /**
     *Function qui permet de d'afficher au submit la recherche effectuer avec le select 
     *
     * @memberof FilterForm
     */
    selecteBarreDeRecherche() {
        this.submit.addEventListener('click', () => {
            this.Fabrik.createSelectRecherche(this.recherche.value)
            this.effacerselectrecherche()
        })

    }
}


