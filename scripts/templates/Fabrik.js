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
     createCarte(Titre, Paragraphe, Ingredients=[] , Src) {
      const img = document.createElement('img')
      const divcarte = document.createElement('div');
      const divimg = document.createElement('div');
      const divtexte = document.createElement('div');
      const divtexterecette = document.createElement('div');
      const divtexteingrédient = document.createElement('div');
      const divingrédient = document.createElement('div');
      const h2 = document.createElement('h2');
      const h3recette = document.createElement('h3');
      const h3ingrédient = document.createElement('h3');
      const paragraphe = document.createElement('p');
      
      img.src = `../assets/photos_recettes/${Src}`;
      divimg.classList.add('divimg');
      divimg.appendChild(img)
      divcarte.appendChild(divimg)
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
      h3ingrédient.textContent = 'Ingrédient'
      divtexteingrédient.classList.add('divtexteingrédient')
      divtexteingrédient.appendChild(h3ingrédient)
      divingrédient.classList.add('divingrédient')
      // Boucle pour afficher les ingrédients
      Ingredients.forEach(ingredient => {
          const pIngredient = document.createElement('p');
          pIngredient.textContent = `${ingredient.ingredient}: ${ingredient.quantity || ''} ${ingredient.unit || ''}`;
          divingrédient.appendChild(pIngredient);
      });
      divtexteingrédient.appendChild(divingrédient)
      divcarte.appendChild(divtexte);
      divcarte.appendChild(divtexteingrédient)
      this.cartwrapper.appendChild(divcarte);
  }
  
}