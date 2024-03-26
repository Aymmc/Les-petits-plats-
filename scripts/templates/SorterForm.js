class SorterForm {
    constructor(App, RecipesData) {
        this.App = App 
        this.RecipesData = RecipesData
        this.$wrapper = document.createElement('div')

        this.$moviesWrapper = document.querySelector('.movies-wrapper')
        // this.ProxyRatingSorter = new ProxyRatingSorter()
    }

    async sorterMovies(sorter) {
        this.clearMoviesWrapper()

        if (!!sorter) {
            // Vous pourrez supprimer cette ligne
            // const sortedData = await RatingSorterApi.sorter(this.Movies, sorter)
            const sortedData = await this.ProxyRatingSorter.sorter(this.Movies, sorter)
            const SortedMovies = sortedData.data 
            SortedMovies.forEach(Movie => {
                const Template = new MovieCard(Movie)
                this.$moviesWrapper.appendChild(Template.createMovieCard())
            })
        } else {
            this.Movies.forEach(Movie => {
                const Template = new MovieCard(Movie)
                this.$moviesWrapper.appendChild(Template.createMovieCard())
            })
        }
    }

    // onChangeSorter() {
    //     this.$wrapper
    //         .querySelector('form')
    //         .addEventListener('change', e => {
    //             const sorter = e.target.value
    //             this.sorterMovies(sorter)
    //         })
    // }

    clearMoviesWrapper() {
        this.$moviesWrapper.innerHTML = ""
    }

    render() {
        console.log('Données des recettes:', this.RecipesData)
        
         this.Fabrik = new Fabrik();
        this.Fabrik.createfiltre('ingrédient' , 'ingrédient', 'ingrédient')
        this.Fabrik.createfiltre('Appareil' , 'Appareil', 'Appareil')
        this.Fabrik.createfiltre('Ustensiles' , 'Ustensiles', 'Ustensiles')


        // this.onChangeSorter()
        

        
    }
}