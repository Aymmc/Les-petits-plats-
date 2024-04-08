class SorterForm {
    constructor(App, RecipesData) {
        this.App = App 
        this.RecipesData = RecipesData
        this.$wrapper = document.createElement('div')

        this.$moviesWrapper = document.querySelector('.carterecette')
        // this.ProxyRatingSorter = new ProxyRatingSorter()
    }

    async sorterMovies() {
        this.liste = document.querySelectorAll('.recherche')
        this.liste.forEach(liste => {
            liste.textContent 
            console.log(liste)
        })
 

    }

}
