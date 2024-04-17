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
        this.recettesFiltrees = [];
        this.arrayFilter = [];
        // this.ProxyRatingSorter = new ProxyRatingSorter()
    }
    /**
     *Function qui affiche le selecte jaune quand on clicks sur un filtre
     *
     * @memberof FilterForm
     */
    selecteRecherche() {
        const selecteRecherches = document.querySelectorAll('.dropdown-item');
        const a = document.querySelectorAll('.btn-secondary');

        // Supprimer toutes les divs existantes

        selecteRecherches.forEach(selecteRecherche => {
            selecteRecherche.addEventListener('click', this.handleClick);
        });
        const handleClick2 = (event) => {
            this.classeClique = event.target.classList[event.target.classList.length - 2];
        };

        a.forEach(bouton => {
            bouton.removeEventListener('click', handleClick2);
        });

        a.forEach(bouton => {
            bouton.addEventListener('click', handleClick2);
        });
    }

    handleClick = (event) => {
        this.buttoncloseselecte = document.querySelectorAll('.closeselecte')
        const selecte = event.target.textContent;
        this.Fabrik.createSelectRecherche(selecte);
        this.itemActive = event.target;
        this.itemActiveParent = event.target.parentNode;

        this.arrayFilter.push(selecte)
        console.log(this.arrayFilter);
        // Vérifier si this.itemActiveParent existe avant d'accéder à previousElementSibling
        if (this.itemActiveParent) {
            this.ParentNode = this.itemActiveParent.parentNode.previousElementSibling;

            // Vérifier si this.ParentNode existe avant de modifier son innerHTML
            if (this.ParentNode) {
                this.ParentNode.innerHTML = `<li class="parentNode"><a class="dropdown-item selecteListe" href="#">${selecte}</a> <button> <img class="closeselecte" src="../assets/croix2.svg"> </button> </li>`;
                this.buttoncloseselecte.forEach(close => {
                    close.addEventListener('click', () => {
                        this.ParentNode.innerHTML = ''
                        console.log('test');
                    })
                })
            }

        }

        this.itemActiveParent.remove(this.parentElementSelectedItembrother);
        this.Filtrer()
        this.selecteBarreDeRecherche()
    };

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
        document.querySelector('#site-searchIngredient').addEventListener("input", e => {
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

            });
            this.selecteRecherche();
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
            // console.log(document.querySelector('accueilselecterecherche'));
            // Récupération du terme de recherche et conversion en minuscules
            const searchTerm = e.target.value.toLowerCase();
            // Filtrage des ingrédients en fonction du terme de recherche
            const filteredAppliance = new Set(Array.from(Appliance).filter(appar =>
                appar.toLowerCase().includes(searchTerm)
            ))

            // Effacement de la liste actuelle avant d'afficher les ingrédients filtrés
            this.listeappareil.innerHTML = '';
            // Afficher les ingrédients filtrés en appelant createListe pour chaque ingrédient
            filteredAppliance.forEach(appar => {
                this.Fabrik.createListe(appar, this.listeappareil);

            });
            this.selecteRecherche();
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

            });
            this.selecteRecherche();
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
        // Sélection de tous les boutons de fermeture
        const btnclose = document.querySelectorAll('.buttoncloseselect');
        // Ajout d'un gestionnaire d'événements à chaque bouton de fermeture
        btnclose.forEach(close => {
            close.addEventListener('click', () => {
                // Suppression de l'élément parent de l'élément bouton de fermeture
                close.parentElement.remove();
                // Nettoyage du contenu de cartwrapper
                this.cartwrapper.innerHTML = '';
                // Réinitialisation de la sélection des filtres
                this.arrayFilter.pop();
                console.log(this.arrayFilter);
                // Affichage de toutes les recettes
                app.afficherRecette();
                // Rendu du total avec toutes les recettes
                this.renderTotal(this.RecipesData);
            });
        }); 
    }
    /**
     *Function qui filtre les ingrédients les ustentsils et les appareilles 
     *
     * @memberof FilterForm
     */
    // Définition de la méthode Filtrer()
    Filtrer() {
        this.effacerselectrecherche();
        // Filtrage des recettes en fonction des critères sélectionnés
        const nouvellesRecettesFiltrees = this.RecipesData.filter((recipe) => {
            // Vérification si chaque filtre correspond à au moins un critère de la recette avec la méthode every
            const match = this.arrayFilter.every((filter) =>
                // Vérification si le filtre correspond à un ingrédient de la recette
                recipe.ingredients.some((ingredient) =>
                    ingredient.ingredient.toLowerCase().includes(filter.toLowerCase())
                ) ||
                // Vérification si le filtre correspond à un ustensile de la recette
                recipe.ustensils.some((ustensil) =>
                    ustensil.toLowerCase().includes(filter.toLowerCase())
                ) ||
                // Vérification si le filtre correspond à l'appareil de cuisson de la recette
                recipe.appliance.toLowerCase().includes(filter.toLowerCase())
            );
            // Retourne vrai si la recette correspond à tous les filtres
            return match;
        });

        // Si aucune recette ne correspond aux filtres sélectionnés
        if (nouvellesRecettesFiltrees.length === 0) {
            console.log('test');
            // Affichage d'un message indiquant qu'aucune recette ne correspond aux filtres
            this.cartwrapper.innerHTML = `<div class="container">
            <div class="row">
                <div class="col">
                    <div class="mx-auto text-center style="font-family: 'Roboto', sans-serif;"">
                        <h2 class=" m-4">Aucune recette ne contient les filtres sélectionnés. Vous pouvez rechercher d'autres recettes.</h2>
                        <h3 class="m-4">Exemples de recherches : « tarte aux pommes », « poisson », etc.</h3>
                        <p class="m-2">Merci.</p>
                    </div>
                </div>
            </div>
        </div>`;

            // Réinitialisation de la liste des recettes filtrées
            this.recipesFiltered = [];
        } else {
            // Si des recettes correspondent aux filtres, les enregistrer dans la liste des recettes filtrées
            this.recipesFiltered = nouvellesRecettesFiltrees;
                // Effacement du contenu précédent de la zone d'affichage des recettes
        this.cartwrapper.innerHTML = '';
        
        // Affichage des cartes des recettes filtrées
      app.afficherRecette(this.recipesFiltered)
        // Affichage du total des recettes filtrées
        this.renderTotal(this.recipesFiltered);
        // Effacement de la sélection de recherche

        }
    
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
                    app.afficherRecette(filteredRecipes)
                    this.renderTotal(filteredRecipes);
                }
            } else if (query.length === 0) {
                this.cartwrapper.innerHTML = '';
                app.afficherRecette(this.RecipesData)
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


