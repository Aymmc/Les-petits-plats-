// Définition de la classe App
class App {
    constructor() {
        // Sélection des éléments DOM nécessaires
        this.RecipesApi = new RecipesApi('../data/recipes.json'); // Instanciation de l'API des photographes
    }
    /**
     *Function async qui permet de recuperer les recettes
     *
     * @return {*} 
     * @memberof App
     */
    async fetchRecipes() {
        this.RecipesData = await this.RecipesApi.get();
        // console.log('Nombre de recettes:', this.RecipesData.length);
        // console.log('Données des recettes:', this.RecipesData); // Afficher les données récupérées dans la console
        
        return this.RecipesData;

    }
    /**
     *Function qui permet de changer les fleches d
     *
     * @memberof App
     */
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
    
    /**
     *Function qui affiche les recettes global
     *
     * @memberof App
     */
     afficherRecette(array) {
        // Boucle for classique
        for (let i = 0; i < array.length; i++) {
            const RecipesData = array[i];
            
            // Créer une instance de Fabrik et appeler la méthode createCarte
            this.Fabrik = new Fabrik();
            this.Fabrik.createCarte(RecipesData.name, RecipesData.description, RecipesData.ingredients, RecipesData.image, RecipesData.time);
        }
    }
    /**
     *Function qui affiche le total des recettes 
     *
     * @memberof App
     */
    afficherresultat() {
        this.Fabrik = new Fabrik()
        this.Fabrik.createTotal(this.RecipesData.length)
    }
    /**
     *Function async qui déclare toute les méthodes 
     *
     * @memberof App
     */
    async main() {
        await this.fetchRecipes();
        this.FilterForm = new FilterForm(app, this.RecipesData); // Instanciation du formulaire de tri
        this.FilterForm.afficherIngredients();
        this.FilterForm.afficherUstensil();
        this.FilterForm.afficherAppareil();
        this.FilterForm.selecteRecherche();
        this.FilterForm.compareInputResult();
        this.FilterForm.selecteBarreDeRecherche();
        this.afficherRecette(this.RecipesData);
        this.afficherresultat();
        this.flechechangement();
        this.FilterForm.renderTotal(this.RecipesData);
    }
}
// Création d'une instance de la classe App et exécution de la fonction principale
const app = new App();
app.main();


