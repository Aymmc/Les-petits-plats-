// Définition de la classe App
class App {
    constructor() {
        // Sélection des éléments DOM nécessaires
        this.RecipesApi = new RecipesApi('../data/recipes.json'); // Instanciation de l'API des photographes
        
    }
    async fetchRecipes(){
        this.RecipesData = await this.RecipesApi.get();
        console.log('Données des recettes:', this.RecipesData); // Afficher les données récupérées dans la console
        return this.RecipesData; 
    }

    async main() {
        await this.fetchRecipes();


        this.SorterForm = new SorterForm(app, this.RecipesData); // Instanciation du formulaire de tri
        this.SorterForm.render(); // Affichage du formulaire de tri 

    }
}
// Création d'une instance de la classe App et exécution de la fonction principale
const app = new App();
app.main();


