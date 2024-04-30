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
        this.afficherRecette();
        this.afficherresultat()
        this.flechechangement()

    }
}
// Création d'une instance de la classe App et exécution de la fonction principale
const app = new App();
app.main();


