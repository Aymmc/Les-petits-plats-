class Fabrik {
    constructor() {
        this.body = document.querySelector('body');
        this.Main = document.querySelector('main');
        this.$recipeswrapper = document.querySelector('.filtrerecipes');
        this.cartwrapper = document.querySelector('.carterecette')

    }
    createTotal(Resultat) {
        const divtotal = document.createElement('div')
        const total = document.createElement('p')
        divtotal.classList.add('divtotalrecette')
        total.classList.add('totalrecette')
        total.textContent = Resultat + " recettes"
        divtotal.appendChild(total)
        this.$recipeswrapper.appendChild(divtotal)
    }
    createCarte(Titre, Paragraphe, Ingredients = [], Src, Time) {
        const img = document.createElement('img')
        const divcarte = document.createElement('article');
        const divimg = document.createElement('div');
        const divtexte = document.createElement('div');
        const divtexterecette = document.createElement('div');
        const divtexteingrédient = document.createElement('div');
        const divingrédient = document.createElement('div');
        const h2 = document.createElement('h2');
        const h3recette = document.createElement('h3');
        const h3ingrédient = document.createElement('h3');
        const paragraphe = document.createElement('p');
        const divcol = document.createElement('div')
        const time = document.createElement('p')

        img.src = `../assets/photos_recettes/${Src}`;
        time.textContent = Time + "mins",
            divimg.appendChild(time)
        divimg.classList.add('divimg');
        divimg.appendChild(img)
        divcarte.appendChild(divimg)
        divtexte.classList.add('divtexte');
        divcarte.classList.add('card');
        divcol.classList.add('col');
        divcol.classList.add('cardrecipes');
        h2.textContent = Titre;
        divtexte.appendChild(h2);
        h3recette.textContent = 'Recette';
        divtexterecette.classList.add('divtexterecette')
        divtexterecette.appendChild(h3recette);
        paragraphe.textContent = Paragraphe;
        divtexterecette.appendChild(paragraphe);
        divtexte.appendChild(divtexterecette);
        h3ingrédient.textContent = 'Ingrédient'
        divtexteingrédient.classList.add('divtexteingrédient')
        divtexteingrédient.appendChild(h3ingrédient)
        divingrédient.classList.add('divingrédient')
        // Boucle pour afficher les ingrédients
        Ingredients.forEach(ingredient => {
            const divingrédientQuantité = document.createElement('div');
            divingrédientQuantité.classList.add('divingrédientQuantité')
            const pIngredient = document.createElement('p');
            pIngredient.classList.add('pIngredient')
            const pQuantité = document.createElement('p');
            pQuantité.classList.add('pQuantité')
            pIngredient.textContent = `${ingredient.ingredient} `;
            pQuantité.textContent = ` ${ingredient.quantity || ''} ${ingredient.unit || ''}`;
            divingrédientQuantité.appendChild(pIngredient);
            divingrédientQuantité.appendChild(pQuantité);
            divingrédient.appendChild(divingrédientQuantité);
        });
        divtexteingrédient.appendChild(divingrédient)
        divcarte.appendChild(divtexte);
        divcarte.appendChild(divtexteingrédient)
        divcol.appendChild(divcarte)
        this.cartwrapper.appendChild(divcol);
    }

}