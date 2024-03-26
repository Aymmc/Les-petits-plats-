class Fabrik{
    constructor(){
        this.body = document.querySelector('body');
        this.Main = document.querySelector('main');
        this.$recipeswrapper = document.querySelector('.filtrerecipes');
        this.cartwrapper = document.querySelector('.carterecette')

    }
     createfiltre(ClassName, Name , Resultat){
        const divfiltre = document.createElement('div');
        divfiltre.classList.add('.filterWrapper');
        const nom = document.createElement('p');
        nom.textContent = Name;
        const input = document.createElement('input');
        const filtreul = document.createElement('ul');
        const filtreli = document.createElement('li');
        filtreli.textContent= Resultat;
        filtreul.classList.add(ClassName);
        filtreul.appendChild(filtreli);
        divfiltre.appendChild(filtreul);
        this.$recipeswrapper.appendChild(divfiltre)
     }
     createCarte(Titre, Paragraphe, Ingredient, Quantity ){
        const divcarte = document.createElement('div');
        const divimg = document.createElement('div');
        const divtexte = document.createElement('div');
        const divtexterecette = document.createElement('div');
        const divtexteingrédient = document.createElement('div');
        const h2 = document.createElement('h2');
        const h3recette = document.createElement('h3');
        const h3ingrédient = document.createElement('h3');
        const paragraphe = document.createElement('p');
        const pingrediant = document.createElement('p')
        const pquantity = document.createElement('p')

        divimg.classList.add('divimg');
        divtexte.classList.add('divtexte');
        divcarte.classList.add('card');
        h2.textContent = Titre;
        divtexte.appendChild(h2);
        h3recette.textContent = 'Recette';
        divtexterecette.classList.add('divtexterecette')
        divtexterecette.appendChild(h3recette);
        paragraphe.textContent = Paragraphe;
        divtexterecette.appendChild(paragraphe);
        divtexte.appendChild(divtexterecette);
        h3ingrédient.textContent= 'Ingrédient'
        divtexteingrédient.appendChild(h3ingrédient);
        pingrediant.textContent= Ingredient
        pquantity.textContent= Quantity
        divtexteingrédient.appendChild(pquantity)
        divtexteingrédient.appendChild(pingrediant)
        divtexte.appendChild(divtexteingrédient)

        divcarte.appendChild(divtexte)
        this.cartwrapper.appendChild(divcarte)
     }
}