// Définition de la classe App
class App {
    constructor() {
        // Sélection des éléments DOM nécessaires
        this.RecipesApi = new RecipesApi('../data/recipes.json'); // Instanciation de l'API des photographes


    }
    async fetchRecipes() {
        this.RecipesData = await this.RecipesApi.get();
        const nombreDeRecettes = this.RecipesData.length;
        console.log('Nombre de recettes:', nombreDeRecettes);
        console.log('Données des recettes:', this.RecipesData); // Afficher les données récupérées dans la console

        return this.RecipesData;

    }
    flechechangement() {
        document.addEventListener('DOMContentLoaded', function () {
            var filterbars = document.querySelectorAll(".dropdown-toggle");

            filterbars.forEach((filterbar) => {
                filterbar.addEventListener('shown.bs.dropdown', (event) => {
                    var filterImg = event.currentTarget.querySelector("img.fleche");
                    filterImg.style.transform = "rotate(180deg)";
                });

                filterbar.addEventListener('hidden.bs.dropdown', (event) => {
                    var filterImg = event.currentTarget.querySelector("img.fleche");
                    filterImg.style.transform = "rotate(0deg)";
                });
            });
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
            });
        });
    }
    
  
    afficherAppareil() {
        this.listeappareil = document.querySelector('.menuappareil')
        const Appliance = new Set(); // Utiliser un ensemble pour stocker les appareils uniques
        this.RecipesData.forEach(recipe => {
            Appliance.add(recipe.appliance); // Ajouter l'appareil de chaque recette à l'ensemble
        });
    
        console.log('Appareils différents:');
        
        Appliance.forEach(appar => {
            console.log(appar);
            this.Fabrik.createListe(appar, this.listeappareil)
        });
    }
    

    afficherUstensil() {
        this.listeustensil = document.querySelector('.menuustensil')
        const Ustensil = new Set(); // Utiliser un ensemble pour stocker les ustensiles uniques
        this.RecipesData.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => { // Utiliser ustensil au lieu de recipe.ustensils
                const name = ustensil.toLowerCase(); // Nettoyer l'ustensile en le mettant en minuscules
                Ustensil.add(name);
            });
        });
    

        Ustensil.forEach(ustensil => {
            this.Fabrik.createListe(ustensil, this.listeustensil)
        })
    }
    
    afficherRecette() {

         this.RecipesData.forEach((RecipesData) => {

            this.Fabrik = new Fabrik()


            this.Fabrik.createCarte(RecipesData.name, RecipesData.description, RecipesData.ingredients, RecipesData.image, RecipesData.time)
        });
    }
    afficherresultat() {
        this.Fabrik = new Fabrik()
        this.Fabrik.createTotal(this.RecipesData.length)
    }
    async main() {
        await this.fetchRecipes();
        this.SorterForm = new SorterForm(app, this.RecipesData); // Instanciation du formulaire de tri
        this.SorterForm.render(); // Affichage du formulaire de tri 
        this.afficherRecette();
        this.afficherresultat()
        this.flechechangement()
        this.afficherIngredients();
        this.afficherUstensil()
        this.afficherAppareil()
    }
}
// Création d'une instance de la classe App et exécution de la fonction principale
const app = new App();
app.main();


